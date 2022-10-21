import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Calendar } from '../components/Calendar';
import { Loading } from '../components/Loading';
import { TextInput } from '../components/TextInput';
import { startMailer } from '../mailer/mailer';
import { DataType, DataTypeKey, useData } from '../providers/DataProvider';
import userList from '../userList.json';
import { dataCsvIndexArray } from '../variable';

export const Top = memo(() => {
  const [isLoading, setLoading] = useState(true);
  const { data, csvData, setData } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (csvData.length === 0) navigate('/login');

    const keys = Object.keys(dataCsvIndexArray);
    const values = Object.values(dataCsvIndexArray);

    const shapingData = csvData.map((_data) => {
      const data: DataType = {} as DataType;
      keys.forEach((key, i) => {
        if (key === 'applicantName') {
          const applicantName = getValue(_data[values[i]]);
          const targetUser = getUser(applicantName);

          data.applicantName = applicantName;
          data.applicantFirstName = targetUser?.firstName ?? '';
          data.applicantLastName = targetUser?.lastName ?? '';
          data.applicantMail = targetUser?.mail ?? '';
        } else if (key === 'userName') {
          const userName = getValue(_data[values[i]]);
          const targetUser = getUser(userName);

          data.userName = targetUser ? targetUser.name : userName;
          data.userMail = targetUser?.mail ?? '';
        } else if (key === 'firstAuthorizerName') {
          const firstAuthorizerName = getValue(_data[values[i]]);
          const targetUser = getUser(firstAuthorizerName);

          data.firstAuthorizerName = targetUser ? targetUser.name : firstAuthorizerName;
          data.firstAuthorizerMail = targetUser?.mail ?? '';
        } else if (key === 'secondAuthorizerName') {
          const secondAuthorizerName = getValue(_data[values[i]]);
          const targetUser = getUser(secondAuthorizerName);

          data.secondAuthorizerName = targetUser ? targetUser.name : secondAuthorizerName;
          data.secondAuthorizerMail = targetUser?.mail ?? '';
        } else if (key === 'startDate' || key === 'endDate') {
          const value = getValue(_data[values[i]]);
          const date = formatDate(new Date(value));

          data[key] = date;
        } else {
          const _key = key as 'id';
          data[_key] = getValue(_data[values[i]]);
        }
      });

      return data;
    });

    setData(shapingData);
    setLoading(false);
  }, [csvData]);

  const getUser = (name: string) => userList.find((v) => v.name === name);

  const getValue = (value: string) => (value ? value.replace(/["]/g, '').replace(/\s+/g, '') : '');

  const getDay = (date: Date) => {
    const dayIndex = date.getDay();
    const dayWeekArray = ['日', '月', '火', '水', '木', '金', '土'];

    return dayWeekArray[dayIndex];
  };

  const formatDate = (value: Date | string) => {
    if (String(value).indexOf('Invalid Date') !== -1) return '';
    else {
      const _date = value as Date;
      const year = _date.getFullYear();
      const month = _date.getMonth() + 1;
      const date = _date.getDate();
      const day = getDay(_date);

      return `${year}/${month}/${date}(${day})`;
    }
  };

  const exchangeValue = (dataIndex: number) => {
    const target: DataType = data[dataIndex];
    const _firstAuthorizerName = target.firstAuthorizerName;
    const _firstAuthorizerMail = target.firstAuthorizerMail;
    const _secondAuthorizerName = target.secondAuthorizerName;
    const _secondAuthorizerMail = target.secondAuthorizerMail;

    target.firstAuthorizerName = _secondAuthorizerName;
    target.firstAuthorizerMail = _secondAuthorizerMail;
    target.secondAuthorizerName = _firstAuthorizerName;
    target.secondAuthorizerMail = _firstAuthorizerMail;

    setData([...data]);
  };

  const updateValue = (e: ChangeEvent<HTMLInputElement>, dataIndex: number) => {
    const target: DataType = data[dataIndex];
    const element = e.target;
    const val = element.value;
    const name = element.name as DataTypeKey;

    target[name] = val;
    setData([...data]);
  };

  const updateDate = (e: ChangeEvent<HTMLInputElement>, date: Date, dataIndex: number) => {
    const target: DataType = data[dataIndex];
    const element = e.target;
    const container = element.closest('.container') as HTMLElement;
    const input = container.querySelector('input') as HTMLInputElement;
    const name = input.name as DataTypeKey;

    target[name] = formatDate(date);
    setData([...data]);
  };

  return (
    <_Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <_Table>
          <thead>
            <tr>
              <th>申請ID</th>
              <th>申請者</th>
              <th>利用者</th>
              <th>一次承認者</th>
              <th>二次承認者</th>
              <th>利用期間</th>
              <th>メール</th>
            </tr>
          </thead>
          <tbody>
            {data.map((_data, i) => (
              <tr key={i} data-index={i}>
                <td>{_data.id}</td>
                <td data-name={'applicant'}>
                  <_Row>
                    <_RowItem>
                      <TextInput
                        value={_data.applicantLastName}
                        name={'applicantLastName'}
                        updateValue={(e) => updateValue(e, i)}
                      />
                    </_RowItem>
                    <_RowItem>
                      <TextInput
                        value={_data.applicantFirstName}
                        name={'applicantFirstName'}
                        updateValue={(e) => updateValue(e, i)}
                      />
                    </_RowItem>
                  </_Row>
                  <_Separate />
                  <TextInput
                    value={_data.applicantMail}
                    name={'applicantMail'}
                    updateValue={(e) => updateValue(e, i)}
                  />
                </td>
                <td data-name={'user'}>
                  <TextInput value={_data.userName} name={'userName'} updateValue={(e) => updateValue(e, i)} />
                  <_Separate />
                  <TextInput value={_data.userMail} name={'userMail'} updateValue={(e) => updateValue(e, i)} />
                </td>
                <td data-name={'firstAuthorizer'}>
                  <TextInput
                    value={_data.firstAuthorizerName}
                    name={'firstAuthorizerName'}
                    updateValue={(e) => updateValue(e, i)}
                  />
                  <_Separate />
                  <TextInput
                    value={_data.firstAuthorizerMail}
                    name={'firstAuthorizerMail'}
                    updateValue={(e) => updateValue(e, i)}
                  />
                  <_ChangeIcon onClick={() => exchangeValue(i)} />
                </td>
                <td data-name={'secondAuthorizer'}>
                  <TextInput
                    value={_data.secondAuthorizerName}
                    name={'secondAuthorizerName'}
                    updateValue={(e) => updateValue(e, i)}
                  />
                  <_Separate />
                  <TextInput
                    value={_data.secondAuthorizerMail}
                    name={'secondAuthorizerMail'}
                    updateValue={(e) => updateValue(e, i)}
                  />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <Calendar
                    value={_data.startDate}
                    name={'startDate'}
                    updateDate={(e, date) => updateDate(e, date, i)}
                  />
                  ~
                  <Calendar value={_data.endDate} name={'endDate'} updateDate={(e, date) => updateDate(e, date, i)} />
                </td>
                <td>
                  <Button name={'connect'} onclick={(e) => startMailer(e, data[i])}>
                    接続環境
                  </Button>
                  <_Separate />
                  <Button name={'account'} onclick={(e) => startMailer(e, data[i])}>
                    アカウント
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </_Table>
      )}
    </_Wrapper>
  );
});

const _Wrapper = styled.div``;

const _Table = styled.table`
  width: 100%;
  font-size: 14px;
  tbody {
    tr {
      &:nth-of-type(odd) {
        background: #fff;
      }
    }
  }
  th,
  td {
    position: relative;
    padding: 12px 16px;
  }
  th {
    color: #fff;
    background: #444;
    &:not(:first-of-type) {
      border-left: 1px solid #fff;
    }
    &:nth-of-type(1) {
      width: 80px;
    }
    &:nth-of-type(2),
    &:nth-of-type(3),
    &:nth-of-type(4),
    &:nth-of-type(5) {
      width: 220px;
    }
    &:nth-of-type(6),
    &:nth-of-type(7) {
      width: 120px;
    }
  }
  td {
    border: 1px solid #ccc;
  }
`;

const _Row = styled.ul`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const _RowItem = styled.li``;

const _Separate = styled.span`
  display: block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border-top: 1px dotted #333;
  pointer-events: none;
`;

const _ChangeIcon = styled.button`
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translateY(-50%);
  z-index: 3;
  width: 30px;
  height: 30px;
  border: solid 1px #333;
  border-radius: 50%;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=utf8,%3Csvg%20role%3D%22img%22%20focusable%3D%22false%22%20aria-hidden%3D%22true%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2014%2014%22%3E%3Cpath%20d%3D%22m%201%2C4.9375637%200%2C-0.375%20c%200%2C-0.31066%200.2518359%2C-0.5625%200.5625%2C-0.5625%20l%208.4375%2C0%200%2C-1.125%20c%200%2C-0.50079%200.607008%2C-0.75098%200.960258%2C-0.39776%20l%201.875%2C1.875%20c%200.219656%2C0.21968%200.219656%2C0.57584%200%2C0.79549%20l%20-1.875%2C1.875%20C%2010.608344%2C7.3746437%2010%2C7.1279437%2010%2C6.6250637%20l%200%2C-1.125%20-8.4375%2C0%20C%201.2518359%2C5.5000637%201%2C5.2482237%201%2C4.9375637%20Z%20m%2011.4375%2C3.5625%20-8.4375%2C0%200%2C-1.125%20c%200%2C-0.49955%20-0.6061406%2C-0.75187%20-0.9602578%2C-0.39776%20l%20-1.875%2C1.875%20c%20-0.21965626%2C0.21968%20-0.21965626%2C0.57584%200%2C0.79549%20l%201.875%2C1.8750003%20C%203.3919609%2C11.874994%204%2C11.627494%204%2C11.125064%20l%200%2C-1.125%208.4375%2C0%20C%2012.748164%2C10.000064%2013%2C9.7482237%2013%2C9.4375637%20l%200%2C-0.375%20c%200%2C-0.31066%20-0.251836%2C-0.5625%20-0.5625%2C-0.5625%20z%22%2F%3E%3C%2Fsvg%3E');
  background-size: 80% auto;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;
