import { memo, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useData, UserListType } from '../providers/DataProvider';
import { dataCsvIndexArray, userListCsvIndexArray } from '../variable';

export const Login = memo(() => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const navigate = useNavigate();
  const { setData, setUserList } = useData();
  const reader = new FileReader();

  let userList: UserListType[] = [] as UserListType[];

  const getUser = (name: string) => userList.find((v) => v.name === name);

  const getValue = (value: string) => value.replace(/["]/g, '').replace(/\s+/g, '');

  useEffect(() => {
    if (!acceptedFiles.length) return;

    reader.readAsText(acceptedFiles[0]);
    reader.onload = (e) => {
      axios
        .get('./userlist.csv')
        .then((res) => {
          const userDataCsv = res.data as string;
          const userDataArray = userDataCsv.split('\r\n').map((v) => v.split(','));

          const keys = Object.keys(userListCsvIndexArray);
          const values = Object.values(userListCsvIndexArray);

          userDataArray.shift();
          userList = userDataArray.map((_data) => {
            const obj: any = {};
            keys.forEach((key, i) => (obj[key] = _data[values[i]].replace(/\s+/g, '')));
            return obj;
          });

          setUserList(userList);
        })
        .then(() => {
          const target = e.target as FileReader;
          const dataCsv = target.result as string;
          const splitDataArray = dataCsv
            .split('\r\n')
            .map((v) => {
              if (v.length !== 0) return v.split(',');
            })
            .filter((e) => e);

          const keys = Object.keys(dataCsvIndexArray);
          const values = Object.values(dataCsvIndexArray);

          const shapingData = splitDataArray.map((_data) => {
            if (!_data) return;

            const obj: any = {};
            keys.forEach((key, i) => {
              if (key === 'applicantName') {
                const applicantName = getValue(_data[values[i]]);
                const targetUser = getUser(applicantName);

                obj['applicantName'] = applicantName;
                obj['applicantFirstName'] = targetUser?.firstName;
                obj['applicantLastName'] = targetUser?.lastName;
                obj['applicantMail'] = targetUser?.mail;
              } else if (key === 'userName') {
                const userName = getValue(_data[values[i]]);
                const targetUser = getUser(userName);

                obj['userName'] = targetUser ? targetUser.name : userName;
                obj['userMail'] = targetUser?.mail;
              } else if (key === 'firstAuthorizerName') {
                const firstAuthorizerName = getValue(_data[values[i]]);
                const targetUser = getUser(firstAuthorizerName);

                obj['firstAuthorizerName'] = targetUser ? targetUser.name : firstAuthorizerName;
                obj['firstAuthorizerMail'] = targetUser?.mail;
              } else if (key === 'secondAuthorizerName') {
                const secondAuthorizerName = getValue(_data[values[i]]);
                const targetUser = getUser(secondAuthorizerName);

                obj['secondAuthorizerName'] = targetUser ? targetUser.name : secondAuthorizerName;
                obj['secondAuthorizerMail'] = targetUser?.mail;
              } else {
                obj[key] = getValue(_data[values[i]]);
              }
            });

            return obj;
          });

          setData(shapingData);
        })
        .finally(() => navigate('/'));
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
