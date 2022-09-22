import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TextInput } from '../components/TextInput';
import { useData } from '../providers/DataProvider';

export const Top = memo(() => {
  const { data } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (data.length === 0) navigate('/login');
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {data.map((_data) => (
            <tr key={_data.id}>
              <td>{_data.id}</td>
              <td>
                <TextInput value={_data.applicantName} />
              </td>
              <td>
                <TextInput value={_data.userName} />
                <_Separate />
                <TextInput value={_data.userMail} />
              </td>
              <td>
                <TextInput value={''} />
                <_Separate />
                <TextInput value={''} />
              </td>
              <td>
                <TextInput value={''} />
                <_Separate />
                <TextInput value={''} />
              </td>
              <td>
                {_data.startDate} ~ {_data.endDate}
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
    &:nth-of-type(2) {
      width: 150px;
    }
    &:nth-of-type(3),
    &:nth-of-type(4),
    &:nth-of-type(5) {
      width: 270px;
    }
    &:nth-of-type(6) {
      width: 150px;
    }
  }
  td {
    border: 1px solid #ccc;
  }
`;

const _Separate = styled.span`
  display: block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border-top: 1px dotted #333;
`;
