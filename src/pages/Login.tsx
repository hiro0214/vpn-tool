import { memo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useData } from '../providers/DataProvider';
import { csvIndexArray } from '../variable';

export const Login = memo(() => {
  const reader = new FileReader();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const navigate = useNavigate();
  const { setData } = useData();

  useEffect(() => {
    if (!acceptedFiles.length) return;

    reader.readAsText(acceptedFiles[0]);
    reader.onload = (e) => {
      const target = e.target as FileReader;
      const data = target.result as string;
      const splitData = data.split('\r\n');
      const filterData = splitData.filter((d) => d.length !== 0);
      const keys = Object.keys(csvIndexArray);
      const values = Object.values(csvIndexArray);

      const shapingData = filterData.map((_data) => {
        const obj: any = {};
        keys.forEach((k, i) => {
          if (k === 'applicantName') {
            const v = _data
              .split(',')
              [values[i]].replace(/["]/g, '')
              .split(/[\x20\u3000]/);
            obj['applicantLastName'] = v[0];
            obj['applicantFirstName'] = v[1];
          } else {
            obj[k] = _data.split(',')[values[i]].replace(/["]/g, '').replace(/\s+/g, '');
          }
        });

        return obj;
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
