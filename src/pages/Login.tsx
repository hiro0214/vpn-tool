import { memo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
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
    <div className='container'>
      <div {...getRootProps({ className: 'dropzone' })} style={{ border: 'solid 1px' }}>
        <input {...getInputProps()} />
        <p>ここにファイルを入れてください。</p>
      </div>
    </div>
  );
});
