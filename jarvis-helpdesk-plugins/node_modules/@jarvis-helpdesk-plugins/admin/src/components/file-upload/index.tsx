import React, { useCallback, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import FileUploadLogo from '@/shared/assets/svgs/file-upload.svg';

import { SUPPORTED_UPLOAD_FILE_TYPES } from './constants/supported-upload-file-types';

interface FileUploadProps {
  onDrop: (files: File[]) => void;
}

const FileUpload = (props: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file) {
          setFileName(file.name);
          props.onDrop([file]);
        }
      }
    },
    [props]
  );

  const accept = SUPPORTED_UPLOAD_FILE_TYPES.reduce(
    (acc, fileType) => {
      if (!acc[fileType.mimetype]) {
        acc[fileType.mimetype] = [];
      }

      if (acc[fileType.mimetype]) {
        acc[fileType.mimetype]?.push(fileType.fileFormat);
      }
      return acc;
    },
    {} as { [key: string]: string[] }
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: accept,
    maxSize: 512 * 1024 * 1024,
    maxFiles: 1,
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions) as {
    getRootProps: () => React.HTMLProps<HTMLDivElement>;
    getInputProps: () => React.HTMLProps<HTMLInputElement>;
    isDragActive: boolean;
  };

  return (
    <div
      {...getRootProps()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
        isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'
      }`}
    >
      <input {...getInputProps()} />
      <div className="mb-3">
        <img src={FileUploadLogo} alt="file-upload" />
      </div>
      {fileName ? (
        <p className="text-jarvis-black text-xs font-medium">Selected: {fileName}</p>
      ) : (
        <p className="text-jarvis-black text-xs font-medium">Click or Drag & Drop</p>
      )}
      <p className="text-jarvis-text text-[11px]">PDF, TXT (max. 512 MB)</p>
    </div>
  );
};

export default FileUpload;
