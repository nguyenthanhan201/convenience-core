import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { useEffect, useMemo } from 'react';

import { PopoverProps } from './types';

export default function Popover(props: PopoverProps) {
  const {
    open,
    onClose,
    placement = 'bottom-end',
    children,
    sizeMiddleware,
    anchorEl,
    dismissDivs,
  } = props;

  const middleware = useMemo(() => {
    const _middleware = [offset(5), flip(), shift()];
    if (sizeMiddleware) {
      _middleware.push(
        size({
          padding: 8,
        }),
      );
    }
    return _middleware;
  }, [sizeMiddleware]);

  const { refs, context, strategy, x, y } = useFloating({
    open,
    onOpenChange: onClose,
    middleware,
    placement,
    whileElementsMounted: autoUpdate,
  });

  const { getFloatingProps } = useInteractions([
    useDismiss(context, {
      outsidePress: (e) => {
        if (!dismissDivs || dismissDivs.length <= 0) return false;
        return !dismissDivs.some((div) => div.contains(e.target as Node));
      },
    }),
  ]);

  useEffect(() => {
    if (anchorEl && open) {
      refs.setReference(anchorEl);
    }
  }, [anchorEl, open, refs]);

  return (
    <FloatingPortal id='portal-root'>
      {open && (
        <FloatingOverlay className='z-popover' lockScroll>
          <FloatingFocusManager
            context={context}
            modal={false}
            returnFocus={false}
            order={['reference', 'content']}
            initialFocus={0}
          >
            <div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              }}
              {...getFloatingProps()}
            >
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
}
