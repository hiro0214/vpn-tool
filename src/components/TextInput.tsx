import { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DataTypeKey } from '../providers/DataProvider';

type Props = {
  value: string;
  name: DataTypeKey;
  updateValue: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput: FC<Props> = memo((props) => {
  const { value, name, updateValue } = props;
  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => setVal(e.target.value);

  return <_Input type={'text'} name={name} value={val} onChange={changeValue} onBlur={updateValue} />;
});

const _Input = styled.input`
  width: 100%;
  padding: 10px;
  outline: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: 2px solid #3e62ad;
  }
`;
