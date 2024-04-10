import { observer } from "mobx-react-lite";
import RaceDetailsBanner from "./RaceDetailsBanner";
import RaceDetailsInfo from "./RaceDetailsInfo";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "semantic-ui-css/components/container.min.css";
import DistanceDetails from "./DistanceDetails";

export default observer(function RaceDetails() {
  const { raceStore } = useStore();
  const { selectedRace: race, loadRace } = raceStore;
  const { raceId } = useParams();

  useEffect(() => {
    if (raceId) loadRace(raceId);
  }, [raceId, loadRace]);

  // if (loadingInitial || !race) return <LoadingComponent />;
  if (!race) return;

  return (
    <>
      <RaceDetailsBanner race={race} />
      <RaceDetailsInfo race={race} />
      <DistanceDetails race={race} />
    </>
  );
});
