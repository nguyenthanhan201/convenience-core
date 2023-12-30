import { Placement } from '@floating-ui/react';
import { useCallback, useMemo, useState } from 'react';

export default function usePopover(placement?: Placement) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const onOpen = useCallback(
    <T extends HTMLElement>(e: React.MouseEvent<T, MouseEvent> | T | null) => {
      if (e === null || anchorEl) return;
      setAnchorEl((e as any).currentTarget ?? e);
    },
    [anchorEl],
  );

  const onClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return useMemo(
    () => ({ onOpen, onClose, open: !!anchorEl, anchorEl, placement }),
    [anchorEl, onClose, onOpen, placement],
  );
}
