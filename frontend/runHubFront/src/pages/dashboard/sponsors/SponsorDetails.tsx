import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import SponsorStore from "./stores/SponsorStore";
import { useStore } from "../../../app/stores/store";

const SponsorDetails = observer(({ raceId, sponsorId }) => {
  const { sponsorStore } = useStore();
  const { loadSponsor, selectedSponsor } = sponsorStore;
  useEffect(() => {
    loadSponsor(raceId, sponsorId);
  }, [raceId, sponsorId]);

  return (
    <div>
      {selectedSponsor ? (
        <div>
          <h1>{selectedSponsor.name}</h1>
          <p>{selectedSponsor.description}</p>
          {/* More details */}
        </div>
      ) : (
        <p>Ładowanie sponsorów...</p>
      )}
    </div>
  );
});

export default SponsorDetails;
