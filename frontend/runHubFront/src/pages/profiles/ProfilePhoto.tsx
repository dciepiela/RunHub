import { observer } from "mobx-react-lite";
import { Photo, Profile } from "../../app/models/profile";
import { IoMdPhotos } from "react-icons/io";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../components/imageUpload/PhotoUploadWidget";
import LoadingButton from "../../components/button/LoadingButton";
import { MdDelete } from "react-icons/md";

interface Props {
  profile: Profile;
}

export default observer(function ProfilePhoto({ profile }: Props) {
  const { profileStore } = useStore();
  const { isCurrentUser, uploadPhoto, uploading, deletePhoto, loading } =
    profileStore;

  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }

  function handleDeletePhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex justify-center md:justify-normal items-center">
          <IoMdPhotos className="mr-4" />
          <h1 className="font-bold text-md md:text-3xl">Zdjęcie profilowe</h1>
        </div>
        {isCurrentUser && (
          <div className="flex justify-center md:justify-end">
            <button
              className="mt-2 md:mt-0 px-2 py-2 rounded-lg text-md md:text-lg"
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            >
              {addPhotoMode
                ? "Wróć"
                : profile?.image
                ? "Zmień zdjęcie"
                : "Dodaj zdjęcie"}
            </button>
          </div>
        )}
      </div>
      <div className="mt-2 mb-2 border-b border-gray-300"></div>
      {addPhotoMode ? (
        <PhotoUploadWidget
          uploadPhoto={handlePhotoUpload}
          loading={uploading}
        />
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-10">
          {profile!.image ? (
            <div className="flex flex-col justify-center items-center">
              <img src={profile.image} alt="Photos" className="h-52 w-52" />
              <LoadingButton
                className="mt-2 px-10 py-4 w-52 text-red-700"
                size={12}
                title={<MdDelete />}
                loading={target === profile.photo?.id && loading}
                onClick={(e) => handleDeletePhoto(profile.photo!, e)}
                name={profile.photo?.id}
              />
            </div>
          ) : (
            <div>Brak zdjęcia profilowego, możesz dodać nowe.</div>
          )}
        </div>
      )}
    </div>
  );
});
