import { useEffect, useMemo, useState } from 'react';

export function useQuery(field: string) {
  const router = useMemo(() => new URLSearchParams(window.location.search), []);

  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    if (router.get(field)) {
      setId(router.get(field) as string);
    } else {
      setId(null);
    }
  }, [field, router]);

  return id;
}
