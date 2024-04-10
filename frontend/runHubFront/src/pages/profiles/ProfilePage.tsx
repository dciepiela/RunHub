import { observer } from "mobx-react-lite";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../components/LoadingComponent";

export default observer(function ProfilePage() {
  const { userName } = useParams<{ userName: string }>();
  const { profileStore } = useStore();
  const { loadingProfile, loadProfile, profile } = profileStore;

  useEffect(() => {
    if (userName) loadProfile(userName);
  }, [loadProfile, userName]);

  if (loadingProfile)
    return <LoadingComponent content="Ładowanie profilu użytkownika" />;

  return (
    <div className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 gap-8">
        {profile && (
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent />
          </>
        )}
      </div>
    </div>
  );
});
