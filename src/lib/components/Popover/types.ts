import { Placement } from '@floating-ui/react';
import { PropsWithChildren } from 'react';

export interface PopoverProps extends PropsWithChildren {
  open: boolean;
  anchorEl: HTMLElement | null;
  className?: string;
  onClose: () => void;
  placement?: Placement;
  sizeMiddleware?: boolean;
}
