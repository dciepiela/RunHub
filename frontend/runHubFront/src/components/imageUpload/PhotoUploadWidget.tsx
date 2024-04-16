import { useEffect, useState } from "react";
import PhotoDropzoneWidget from "./PhotoDropzoneWidget";
import PhotoCropperWidget from "./PhotoCropperWidget";
import LoadingButton from "../button/LoadingButton";
import { IoMdClose } from "react-icons/io";
import { MdAddAPhoto } from "react-icons/md";

interface Props {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: object & { preview?: string }) => {
        URL.revokeObjectURL(file.preview!);
      });
    };
  }, [files]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 ">
        <h1 className="text-lightYellow text-sm font-bold mb-4 text-center">
          Krok 1 - Dodaj zdjęcie
        </h1>
        <PhotoDropzoneWidget setFiles={setFiles} />
        {/* <PhotoWidgetDropzone setFiles={setFiles} /> */}
      </div>
      <div className="col-span-1">
        <h1 className="text-lightYellow text-sm font-bold mb-4 text-center">
          Krok 2 - Zmień rozmiar zdjęcia
        </h1>
        {files && files.length > 0 && (
          //   <img src={files[0].preview} className="mt-4 h-[200px]" />
          <PhotoCropperWidget
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </div>
      <div className="col-span-1 mx-auto">
        <h1 className="text-lightYellow text-sm font-bold mb-4 text-center">
          Krok 3 - Dodaj nowe zdjęcie
        </h1>
        {files && files.length > 0 && (
          <>
            <div className="img-preview min-h-[200px] overflow-hidden" />
            <div className="mt-2 flex justify-between">
              {/* disabled */}
              <button
                disabled={loading}
                className="px-6 py-1"
                onClick={() => setFiles([])}
              >
                <IoMdClose />
              </button>
              <LoadingButton
                className="px-6 py-1"
                onClick={onCrop}
                size={12}
                title={<MdAddAPhoto />}
                loading={loading}
              />
              {/* <button className="px-6 py-1 rounded-lg" onClick={onCrop}>
                
              </button> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
