import { useParams } from "react-router-dom";
import RaceEditForm from "./RaceEditForm";
import { observer } from "mobx-react-lite";

export default observer(function RaceEdit() {
  const { raceId } = useParams();

  return (
    <div className="md:ml-[300px] flex justify-center mx-auto ">
      <RaceEditForm raceId={Number(raceId)} />
    </div>
  );
});
