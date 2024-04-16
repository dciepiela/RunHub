import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";
import LoadingButton from "../../components/button/LoadingButton";
import { CgProfile } from "react-icons/cg";

export default observer(function ProfileAbout() {
  const { profileStore } = useStore();
  const { isCurrentUser, profile } = profileStore;
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 flex justify-center md:justify-normal items-center">
          <CgProfile className="mr-4" />
          <h1 className="font-bold text-md md:text-2xl">
            Informacje o {profile?.displayName}
          </h1>
        </div>
        {isCurrentUser && (
          <div className="col-span-1 flex justify-center md:justify-end">
            <LoadingButton
              className="mt-2 md:mt-0 px-2 py-2 rounded-lg text-md md:text-lg"
              title={editMode ? "Wróć" : "Edytuj profil"}
              onClick={() => setEditMode(!editMode)}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 mt-2">
        <span className="text-sm md:text-lg">
          <b>Imię i nazwisko - </b> {profile?.firstName} {profile?.lastName}
        </span>
        <span className="text-sm md:text-lg">
          {profile?.club && (
            <span>
              <b>Klub</b> - {profile.club}
            </span>
          )}
        </span>
      </div>
      <div className="mt-2 mb-2 border-b border-gray-300"></div>

      <div className="mt-2 grid grid-cols-1 gap-10">
        {editMode ? (
          <div className="">
            <ProfileEditForm setEditMode={setEditMode} />
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-sm md:text-lg">{profile?.bio}</span>
          </div>
        )}
      </div>
    </div>
  );
});
