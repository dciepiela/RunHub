import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import EditProfileForm from "./EditProfileForm";

export default observer(function EditProfile() {
  const { userName } = useParams<{ userName: string }>();
  const { profileStore } = useStore();
  const { loadProfile, profile } = profileStore;

  useEffect(() => {
    if (userName) loadProfile(userName);
  }, [loadProfile, userName]);

  return (
    <div className="mt-16 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 gap-8">
        {profile && (
          <>
            <EditProfileForm />
          </>
        )}
      </div>
    </div>
  );
});
