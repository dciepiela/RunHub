import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../../app/stores/store";
import { observer } from "mobx-react-lite";
import DistanceEditForm from "./DistanceEditForm";
import LoadingComponent from "../../../../components/LoadingComponent";

export default observer(function DistanceEdit() {
  const { raceId, distanceId } = useParams();
  const { distanceStore } = useStore();
  const { loadDistance, loadingInitial } = distanceStore;

  useEffect(() => {
    if (raceId && distanceId) {
      loadDistance(Number(raceId), Number(distanceId));
    }
  }, [loadDistance, raceId, distanceId]);

  if (loadingInitial) {
    return <LoadingComponent content="Ładowanie dystansów..." />;
  }

  return (
    <div className="flex justify-center mx-auto mt-10">
      <DistanceEditForm
        raceId={Number(raceId)}
        distanceId={distanceId ? Number(distanceId) : undefined}
      />
    </div>
  );
});
