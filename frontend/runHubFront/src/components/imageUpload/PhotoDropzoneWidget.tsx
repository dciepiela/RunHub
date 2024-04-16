import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";

interface Props {
  setFiles: (files: any) => void;
}

export default function PhotoDropzoneWidget({ setFiles }: Props) {
  const dzStyles = {
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    textAlign: "center" as const,
    height: 200,
  };

  const dzActive = {
    borderColor: "green",
  };

  const onDrop = useCallback(
    (acceptedFiles: object[]) => {
      // console.log(acceptedFiles);
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center"
      style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
    >
      <input {...getInputProps()} />
      <FaFileUpload />
      <h1>Upuść zdjęcie</h1>
    </div>
  );
}
