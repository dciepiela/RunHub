import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Result } from "../models/result";

export default class ResultStore {
    resultRegistry = new Map<number, Result>();
    loading = false;
    loadError = null;

    constructor() {
        makeAutoObservable(this);
    }

    get results() {
        return Array.from(this.resultRegistry.values());
    }

    get resultsByPlace(){
        return Array.from(this.resultRegistry.values()).sort((a,b) => a.place - b.place);
    }

    loadResults = async (distanceId:number) => {
        try {
            const results = await agent.Results.resultsForDistance(distanceId!);
            runInAction(() => {
                this.clearResults()
                results.forEach(result => {
                    this.resultRegistry.set(result.resultId, result);
                });
            });
        } catch (error) {
            runInAction(() => {
                console.log(error)
            });
        }
    }

    // Update a specific result
    updateResult = async (resultId: number, field: keyof Result, value: any, distanceId: number) => {
        try {
            await agent.Results.update(resultId, field, value);
            if (field === 'time') {
                const updatedResults = await agent.Results.resultsForDistance(distanceId);
                runInAction(() => {
                    updatedResults.forEach(result => {
                        this.resultRegistry.set(result.resultId, result);
                    });
                });
            } else {
                const result = this.resultRegistry.get(resultId);
                if (result) {
                    runInAction(() => {
                        (result as any)[field] = value;
                        this.resultRegistry.set(resultId, result);
                    });
                    console.log(result);
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    deleteResult = async(distanceId:number, resultId:number) => {
        this.loading = true;
        try {
            await agent.Results.delete(resultId);
            runInAction(() => {
                this.resultRegistry.delete(resultId);
                this.loading = false;
            })
            this.loadResults(distanceId);
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }  

    clearResults = () => {
        this.resultRegistry.clear();
    }

}