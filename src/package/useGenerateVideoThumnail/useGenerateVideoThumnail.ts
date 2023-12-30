// import { uploadFileProfileEnterprice } from 'apis/profile.api';
import { ElementRef, useEffect, useState } from 'react';

import { convertBase64ToFile } from '@/package/utils';

const useGenerateThumnail = ({
  videoElement,
  // Set the time to capture the thumbnail (e.g., 5 seconds into the video)
  captureTime = 5,
  enable = true,
}: {
  videoElement: ElementRef<'video'>;
  captureTime?: number;
  enable?: boolean;
}) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    if (!enable) return;

    const generateThumbnail = new Promise<string>((resolve) => {
      const canvas = document.createElement('canvas');
      const tempVideo = document.createElement('video');

      if (videoElement && canvas && tempVideo) {
        tempVideo.src = videoElement.src;
        tempVideo.crossOrigin = 'anonymous';
        tempVideo.currentTime = captureTime;
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        // Listen for the 'seeked' event to capture the frame
        tempVideo.addEventListener('seeked', () => {
          const ctx = canvas.getContext('2d');

          if (!ctx) return;

          // Draw the current frame on the canvas
          ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);

          // Convert the canvas content to a data URL
          resolve(canvas.toDataURL());

          tempVideo.remove();
          canvas.remove();
        });
      }
    });

    generateThumbnail.then(async (thumbnail) => {
      const convertToFile = await convertBase64ToFile(thumbnail, 'thumbnail');
      // const urlImg = await uploadFileProfileEnterprice(convertToFile);
      const urlImg = URL.createObjectURL(convertToFile);

      setThumbnail(urlImg);
    });
  }, [videoElement, captureTime, enable]);

  return { thumbnail };
};

export { useGenerateThumnail };
