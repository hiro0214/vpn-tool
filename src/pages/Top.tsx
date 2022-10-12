import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { startMailer } from '../mailer/mailer';
import { useData } from '../providers/DataProvider';

export const Top = memo(() => {
  const { data } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (data.length === 0) navigate('/login');
  }, []);

  const getDay = (day: string) => {
    const dayIndex = new Date(day).getDay();
    const dayWeekArray = ['日', '月', '火', '水', '木', '金', '土'];

    if (typeof dayIndex === 'number') {
      return `${day}（${dayWeekArray[dayIndex]}）`;
    } else {
      return '-';
    }
  };

  return (
    <_Wrapper>
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
            <tr key={_data.id} data-index={i}>
              <td>{_data.id}</td>
              <td>
                <_Row>
                  <_RowItem>
                    <TextInput value={_data.applicantLastName} name={'applicantLastName'} />
                  </_RowItem>
                  <_RowItem>
                    <TextInput value={_data.applicantFirstName} name={'applicantFirstName'} />
                  </_RowItem>
                </_Row>
                <_Separate />
                <TextInput value={_data.applicantMail} name={'applicantMail'} />
              </td>
              <td>
                <TextInput value={_data.userName} name={'userName'} />
                <_Separate />
                <TextInput value={_data.userMail} name={'userMail'} />
              </td>
              <td>
                <TextInput value={_data.firstAuthorizerName} name={'firstAuthorizerName'} />
                <_Separate />
                <TextInput value={_data.firstAuthorizerMail} name={'firstAuthorizerMail'} />
              </td>
              <td>
                <TextInput value={_data.secondAuthorizerName} name={'secondAuthorizerName'} />
                <_Separate />
                <TextInput value={_data.secondAuthorizerMail} name={'secondAuthorizerMail'} />
              </td>
              <td>
                <span data-name={'startDate'}>{getDay(_data.startDate)}</span>
                <br />~
                <br />
                <span data-name={'endDate'}>{getDay(_data.endDate)}</span>
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
      width: 210px;
    }
    &:nth-of-type(6) {
      width: 155px;
    }
    &:nth-of-type(7) {
      width: 125px;
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
