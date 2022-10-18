import { ChangeEvent, FC, memo, useState } from 'react';
import ja from 'date-fns/locale/ja';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { DataTypeKey } from '../providers/DataProvider';

type Props = {
  value: string;
  name: DataTypeKey;
  updateDate: (e: ChangeEvent<HTMLInputElement>, date: Date) => void;
};

export const Calendar: FC<Props> = memo((props) => {
  const { value, name, updateDate } = props;
  const [date, setDate] = useState<Date | null>(new Date(value));
  registerLocale('ja', ja);

  const onChange = (date: Date, e: ChangeEvent<HTMLInputElement>) => {
    setDate(date);
    updateDate(e, date);
  };

  return (
    <_Container className={'container'}>
      <DatePicker name={name} dateFormat={'yyyy/MM/dd'} locale={'ja'} selected={date} onChange={onChange} />
    </_Container>
  );
});

const _Container = styled.div`
  input {
    width: 100%;
    padding: 10px;
    outline: 1px solid #ccc;
    border-radius: 4px;
    &:focus {
      outline: 2px solid #3e62ad;
    }
  }
`;
