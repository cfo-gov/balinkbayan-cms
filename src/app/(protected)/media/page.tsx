import { MediaGallery } from '@/features/media/components/media-gallery';
import { PageHeader } from '@/shared/components/partials';
import { Suspense } from 'react';

const MediaPage = () => {
  return (
    <div className="flex flex-col h-full mb-20 mt-12 space-y-12">
      <PageHeader title="Media" search />
      <Suspense fallback={<div className="flex h-full w-full items-center justify-center">Loading...</div>}>
        <MediaGallery />
      </Suspense>

    </div>
  );
};

export default MediaPage;
