import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import clsx from 'clsx';

import { ModalProps } from './types';

const Modal = (props: ModalProps) => {
  const { open, onClose, className, children, ...restProps } = props;

  const { refs, context } = useFloating({
    open,
    onOpenChange: onClose,
  });

  const { getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ]);

  return (
    <FloatingPortal id='portal-root'>
      {open && (
        <FloatingOverlay lockScroll className={''} style={{ overflow: 'hidden' }}>
          <FloatingFocusManager context={context}>
            <div ref={refs.setFloating} {...getFloatingProps()}>
              <div className={clsx('', className)} {...restProps}>
                {children}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
};

export default Modal;
