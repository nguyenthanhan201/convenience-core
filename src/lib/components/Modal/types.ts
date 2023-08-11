import { ComponentPropsWithRef, ReactElement } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export type ConfirmVariant = 'information' | 'success' | 'warning' | 'error' | 'delete';

export interface ModalProps extends ComponentPropsWithRef<'div'> {
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
}

export interface ModalHeaderProps extends Omit<ComponentPropsWithRef<'div'>, 'title'> {
  title: ReactElement | string;
  description?: string;
  icon?: ReactElement;
  status?: ReactElement;
  onClose?: () => void;
}

export interface ModalConfirmHeaderProps extends ModalHeaderProps {
  variant: ConfirmVariant;
}

export type ModalFooterProps = ComponentPropsWithRef<'div'>;

export type ModalBodyProps = ComponentPropsWithRef<'div'>;
