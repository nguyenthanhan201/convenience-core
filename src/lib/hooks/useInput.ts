import { ChangeEvent, useState } from 'react';

interface InputHookOptions {
  initialValue?: string;
}

interface InputHookResult {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

const useInput = (options: InputHookOptions = {}): InputHookResult => {
  const { initialValue = '' } = options;
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    value,
    onChange,
    reset,
  };
};

export default useInput;
