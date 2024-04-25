import { useParams } from "react-router-dom";
import SponsorEditForm from "./SponsorEditForm";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import LoadingComponent from "../../../../components/LoadingComponent";
import { useEffect } from "react";

export default observer(function SponsorEdit() {
  const { raceId, sponsorId } = useParams();
  const { sponsorStore } = useStore();
  const { loadSponsor, loadingInitial } = sponsorStore;

  useEffect(() => {
    if (raceId && sponsorId) {
      loadSponsor(Number(raceId), Number(sponsorId));
    }
  }, [loadSponsor, raceId, sponsorId]);

  if (loadingInitial) {
    return <LoadingComponent content="Ładowanie sponsorów..." />;
  }

  return (
    <div className="flex justify-center mx-auto mt-10">
      <SponsorEditForm
        raceId={Number(raceId)}
        sponsorId={sponsorId ? Number(sponsorId) : undefined}
      />
    </div>
  );
});
