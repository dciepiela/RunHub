import { useEffect } from "react";
import DistanceResult from "./DistanceResult";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../components/LoadingComponent";

export default observer(function DashboardResult() {
  const { distanceStore, userStore } = useStore();
  const { loadAllExitsDistances, distances, loadingInitial } = distanceStore;
  const { user } = userStore;

  useEffect(() => {
    loadAllExitsDistances(); // Load distances when component mounts
  }, [loadAllExitsDistances]);

  if (loadingInitial) return <LoadingComponent content="Ładowanie dystansów" />;

  const userHostedDistances = distances.filter(
    (distance) => distance.hostUsername === user?.userName
  );

  return (
    <>
      <DistanceResult distances={userHostedDistances} />
    </>
  );
});
