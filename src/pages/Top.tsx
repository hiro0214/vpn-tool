import { memo, useEffect } from 'react';
import { useData } from '../providers/DataProvider';

export const Top = memo(() => {
  const { data } = useData();

  useEffect(() => {
    console.log('d', data);
  }, []);

  return <p>top</p>;
});
