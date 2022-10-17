import { memo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DataType, useData } from '../providers/DataProvider';
import userList from '../userList.json';
import { dataCsvIndexArray } from '../variable';

export const Login = memo(() => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const navigate = useNavigate();
  const { setData, setUserList } = useData();
  const reader = new FileReader();

  const getUser = (name: string) => userList.find((v) => v.name === name);

  const getValue = (value: string) => (value ? value.replace(/["]/g, '').replace(/\s+/g, '') : '');

  useEffect(() => {
    if (!acceptedFiles.length) return;

    reader.readAsText(acceptedFiles[0]);
    reader.onload = (e) => {
      setUserList(userList);

      const target = e.target as FileReader;
      const dataCsv = target.result as string;
      const splitDataArray = dataCsv.split('\r\n').map((v) => v.split(','));
      const keys = Object.keys(dataCsvIndexArray);
      const values = Object.values(dataCsvIndexArray);

      const shapingData = splitDataArray.map((_data) => {
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
          } else {
            const _key = key as 'id' | 'startDate' | 'endDate';
            data[_key] = getValue(_data[values[i]]);
          }
        });

        return data;
      });

      setData(shapingData);
      navigate('/');
    };
  }, [acceptedFiles]);

  return (
    <_Wrapper>
      <_Dropzone {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <span>ここにファイルを入れてください。</span>
      </_Dropzone>
    </_Wrapper>
  );
});

const _Wrapper = styled.div``;

const _Dropzone = styled.div`
  width: 100%;
  height: 300px;
  padding: 12px;
  background: #fff;
  border: 1px dotted #000;
  border-radius: 5px;
  cursor: pointer;
`;
