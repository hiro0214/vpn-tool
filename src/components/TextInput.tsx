import { ChangeEvent, FC, memo, useState } from 'react';
import styled from 'styled-components';

type Props = {
  value: string;
  name: string;
};

export const TextInput: FC<Props> = memo((props) => {
  const { value, name } = props;
  const [val, setVal] = useState(value);

  const changeVal = (e: ChangeEvent<HTMLInputElement>) => setVal(e.target.value);

  return <_Input type={'text'} name={name} value={val} onChange={changeVal} />;
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
