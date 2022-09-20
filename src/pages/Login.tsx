import { memo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useData } from '../providers/DataProvider';

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
      setData(JSON.parse(data));
      navigate('/');
    };
  }, [acceptedFiles]);

  return (
    <Container>
      <Dropzone {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <span>ここにファイルを入れてください。</span>
      </Dropzone>
    </Container>
  );
});

const Container = styled.div``;

const Dropzone = styled.div`
  width: 100%;
  height: 300px;
  padding: 12px;
  background: #fff;
  border: 1px dotted #000;
  border-radius: 5px;
  cursor: pointer;
`;
