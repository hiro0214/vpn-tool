import { memo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useData } from '../providers/DataProvider';

export const Login = memo(() => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const navigate = useNavigate();
  const { setCsvData } = useData();
  const reader = new FileReader();

  useEffect(() => {
    if (!acceptedFiles.length) return;

    reader.readAsText(acceptedFiles[0]);
    reader.onload = (e) => {
      const target = e.target as FileReader;
      const dataCsv = target.result as string;
      const splitDataArray = dataCsv.split('\r\n').map((v) => v.split(','));

      setCsvData(splitDataArray);
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
