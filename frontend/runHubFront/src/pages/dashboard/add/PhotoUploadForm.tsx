import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Photo } from "../../../app/models/profile";

export default observer(function PhotoUploadForm() {
  const { raceId } = useParams();
  const { raceStore } = useStore();
  const { uploadPhoto, getPhoto, deletePhoto } = raceStore;
  const navigate = useNavigate();
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      const photoDetails = await getPhoto(Number(raceId));
      if (photoDetails) {
        setCurrentPhoto(photoDetails);
      }
    };
    fetchPhoto();
  }, [raceId, getPhoto]);

  const handlePhotoUpload = async (file: Blob) => {
    if (!file) {
      toast.error("Proszę wybierz zdjęcie.");
      return;
    }
    await uploadPhoto(Number(raceId), file);
    toast.success("Zdjęcie zostało zaktualizowane!");
    navigate(`/races/${raceId}`); // Redirect to the race details page
  };

  const handleDeletePhoto = async () => {
    if (currentPhoto && currentPhoto.id) {
      try {
        await deletePhoto(currentPhoto.id);
        setCurrentPhoto(null); // Clear the current photo state after deletion
        toast.success("Zdjęcie zostało usunięte!");
      } catch (error) {
        toast.error("Problem z usunięciem zdjęcia");
      }
    } else {
      toast.error("Brak identyfikatora zdjęcia do usunięcia.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-center text-2xl font-bold mb-4">
          {currentPhoto ? "Edytuj" : "Dodaj"} zdjęcie do biegu
        </h1>
        {currentPhoto ? (
          <div>
            <img
              src={currentPhoto.url}
              alt="Race"
              className="mb-4 w-full h-auto rounded"
            />
            <Button onClick={() => navigate(-1)} color="success">
              Cofnij
            </Button>
            <input
              type="file"
              accept="image/*"
              id="photo-upload"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handlePhotoUpload(e.target.files[0]);
                }
              }}
              className="file-input-class mt-2"
            />
            <Button onClick={handleDeletePhoto} className="mt-2">
              Usuń zdjęcie
            </Button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handlePhotoUpload(e.target.files[0]);
                }
              }}
              className="block w-full text-lg text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0 file:text-sm file:font-semibold
              mb-2 bg-red file:bg-red-500 file:text-white"
            />
            <Button onClick={() => navigate(-1)} color="success">
              Cofnij
            </Button>
            {/* <Button
              color="warning"
              className="mt-4"
              onClick={() => {
                const fileInput = document.querySelector(
                  'input[type="file"]'
                ) as HTMLInputElement;
                if (fileInput && fileInput.files && fileInput.files[0]) {
                  handlePhotoUpload(fileInput.files[0]);
                }
              }}
            >
              Dodaj zdjęcie
            </Button> */}
          </div>
        )}
      </div>
    </div>
  );
});
