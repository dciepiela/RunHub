import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../components/LoadingComponent";
import { useEffect } from "react";
import DistanceTable from "./distances/DistanceTable";

export default observer(function Results() {
  const { distanceStore } = useStore();
  const {
    loadAllExitsDistances,
    distancesWithReadyResults,
    setDistance,
    loadingInitial,
  } = distanceStore;

  useEffect(() => {
    loadAllExitsDistances().then((distance) => setDistance(distance!)); // Load distances when component mounts
  }, [loadAllExitsDistances, setDistance]);

  if (loadingInitial) return <LoadingComponent content="Loading profile..." />;

  return (
    <>
      <DistanceTable distances={distancesWithReadyResults} />
    </>
  );
});
