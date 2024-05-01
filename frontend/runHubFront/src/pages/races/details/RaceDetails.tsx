import { observer } from "mobx-react-lite";
import RaceDetailsBanner from "./RaceDetailsBanner";
import RaceDetailsInfo from "./RaceDetailsInfo";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "semantic-ui-css/components/container.min.css";
import DistanceDetails from "./DistanceDetails";
import RaceDetailsChat from "./RaceDetailsChat";

export default observer(function RaceDetails() {
  const { raceStore, distanceStore } = useStore();
  const { selectedRace: race, loadRace, clearSelectedRace } = raceStore;
  const { loadDistances, distances } = distanceStore;
  const { raceId } = useParams();

  useEffect(() => {
    if (raceId) {
      loadRace(Number(raceId));
      loadDistances(Number(raceId));
      return () => clearSelectedRace();
    }
  }, [raceId, loadRace, loadDistances, clearSelectedRace]);

  if (!race) return;

  return (
    <>
      <RaceDetailsBanner race={race} />
      <RaceDetailsInfo race={race} />
      <DistanceDetails race={race} distances={distances} />
      <RaceDetailsChat race={race} />
    </>
  );
});
