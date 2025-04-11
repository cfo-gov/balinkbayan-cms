import { UserCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useId, useState } from 'react';
import { Controller, get, useFormContext, useWatch } from 'react-hook-form';

import { IMAGE_NOT_AVAILABLE } from '@/shared/constants/commons';
import { cn } from '@/shared/lib/utils';
import { fileToBase64 } from '@/shared/utils/commons';
import { imageUpload } from '@/shared/utils/upload';
import type { RegisterOptions } from 'react-hook-form';
import { Button } from '../ui/button';
import ErrorMessage from './error-message';

type Props = {
  name: string;
  validation?: RegisterOptions;
};

const UploadPhoto = ({ name, validation }: Props) => {
  const [preview, setPreview] = useState<string>('');

  const randomId = useId();
  const currentPhoto = useWatch({ name });
  const { control, setValue, formState } = useFormContext();

  const hasError = get(formState.errors, name);

  const handleUpload = async (file: File) => {
    const data = await imageUpload(file);
    if (!data) return;
    setValue(name, data[0]);
  };

  useEffect(() => {
    if (currentPhoto instanceof File) {
      fileToBase64(currentPhoto).then(blob => setPreview(blob));
      return;
    }

    setPreview(currentPhoto);
  }, [currentPhoto]);

  return (
    <div className={cn('flex h-full flex-col items-center justify-center', preview && 'space-y-5')}>
      <div
        className={cn(
          'relative h-full max-h-[230px] w-full',
          !preview && 'grid place-content-center'
        )}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Uploaded photo"
            fill
            className={cn('object-contain')}
            onError={() => {
              setPreview(IMAGE_NOT_AVAILABLE);
            }}
          />
        ) : (
          <UserCircleIcon className={cn('h-40 w-40 text-gray-300')} />
        )}
      </div>
      <Button size="sm" type="button">
        <label htmlFor={randomId} className={cn('rounded-primary btn-secondary block px-6 py-2')}>
          <Controller
            control={control}
            name={name}
            rules={validation}
            render={({ field }) => (
              <input
                id={randomId}
                type="file"
                accept="image/*"
                className="hidden"
                ref={field.ref}
                onChange={async e => {
                  if (e.currentTarget.files !== null) {
                    const file = e.currentTarget.files[0];
                    await handleUpload(file);
                  }
                }}
              />
            )}
          />

          <div className="flex items-center gap-x-2">
            <span>Change photo</span>
          </div>
        </label>
      </Button>

      {hasError && <ErrorMessage message={hasError?.message as string} />}
    </div>
  );
};

export default UploadPhoto;
