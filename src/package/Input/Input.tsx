import { ComponentPropsWithoutRef } from 'react';

type AllOrNothing<T> = T | Partial<Record<keyof T, undefined>>;
type Props = ComponentPropsWithoutRef<'input'> &
  AllOrNothing<{
    value: string;
    onChange: (value: string) => void;
  }>;

const Input = (props: Props) => {
  return <input {...props} />;
};

<Input />;

export default Input;
