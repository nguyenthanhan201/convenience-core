import { useEffect, useState } from 'react';

function useGeolocation() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  const onChange = ({ coords }: GeolocationPosition) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      coords,
      timestamp: Date.now(),
    } as GeolocationPosition);
  };

  const onError = (_error: GeolocationPositionError) => {};

  useEffect(() => {
    const _watchId = navigator.geolocation.watchPosition(onChange, onError, {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 3600000,
    });

    setWatchId(_watchId);
  }, []);

  return { position, watchId };
}

export { useGeolocation };
