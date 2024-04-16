import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface Props {
  imagePreview: string;
  setCropper: (cropper: Cropper) => void;
}

export default function PhotoCropperWidget({
  imagePreview,
  setCropper,
}: Props) {
  return (
    <Cropper
      src={imagePreview}
      initialAspectRatio={1}
      aspectRatio={1}
      preview=".img-preview"
      className="h-[200px] w-[100%]"
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={(cropper) => setCropper(cropper)}
    />
  );
}
