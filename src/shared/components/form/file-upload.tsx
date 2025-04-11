'use client';

import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useId, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { get, useFormContext, useWatch } from 'react-hook-form';

import { IMAGE_FILE_TYPES } from '@/shared/constants/commons';
import { cn } from '@/shared/lib/utils';
import { type TFileUpload } from '@/shared/types/form';
import { fileToBase64 } from '@/shared/utils/commons';
import { imageUpload } from '@/shared/utils/upload';
import { ErrorMessage, FormLabel } from '.';
import { Spinner } from '../ui/spinner';

const FileUpload = (props: TFileUpload) => {
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const randomId = useId();
  const { setValue, formState } = useFormContext();

  const {
    name,
    label,
    fileTypes = IMAGE_FILE_TYPES,
    placeholder,
    maxSize,
    // handleChange,
    children,
    className,
    uploaderClassName,
    autoUpload = true,
    ...rest
  } = props;

  const currentValue = useWatch({ name });

  useEffect(() => {
    if (typeof currentValue === 'string' && currentValue.startsWith('https://')) {
      setPreview(currentValue);
    }

    if (currentValue === '') return setPreview('');
  }, [currentValue]);

  const hasError = get(formState.errors, name);

  const onDrop = useCallback(
    async (droppedFile: File) => {
      if (autoUpload) {
        setIsLoading(true);
        const file = await imageUpload(droppedFile);
        const uploadedFile = file[0];

        setPreview(uploadedFile);
        setValue(name, uploadedFile, { shouldValidate: true });
        setIsLoading(false);
        return;
      }

      const preview = await fileToBase64(droppedFile);
      setPreview(preview);
      setValue(name, droppedFile, { shouldValidate: true });
      return;
    },
    [autoUpload, name, setValue]
  );

  const renderComp = () => {
    if (isLoading) {
      return (
        <div className="grid h-full place-content-center">
          <Spinner className="icon-default text-primary" />
        </div>
      );
    }

    if (preview) {
      return (
        <div className="relative aspect-3/4 h-full max-h-[361px]">
          <Image
            src={preview}
            alt="Authorized Person ID"
            fill
            className="rounded-lg object-contain"
            placeholder="blur"
            blurDataURL={preview}
            quality={70}
          />
        </div>
      );
    }

    return children;
  };

  return (
    <>
      {label && <FormLabel htmlFor={randomId}>{label}</FormLabel>}
      <FileUploader
        id={randomId}
        maxSize={maxSize}
        handleChange={onDrop}
        name={name}
        types={fileTypes}
        {...rest}
      >
        <div className={className}>
          {!preview && !isLoading && (
            <div
              className={cn(
                'grid h-full place-content-center rounded-lg border border-dashed border-gray-400 bg-white',
                uploaderClassName
              )}
            >
              <div className="text-center">
                <UploadCloud className="mx-auto h-8 w-8 text-gray-600" />
                {placeholder && (
                  <p className="mt-2 block text-sm font-semibold text-gray-500">{placeholder}</p>
                )}
                <small
                  className={cn(placeholder ? 'mt-1' : 'mt-2', 'block font-medium text-gray-500')}
                >
                  {fileTypes.map(file => file).join(', ')} {maxSize && `up to ${maxSize} MB`}
                </small>
              </div>
            </div>
          )}

          {renderComp()}
        </div>
      </FileUploader>

      {hasError && <ErrorMessage message={hasError?.message as string} />}
    </>
  );
};

export default FileUpload;
