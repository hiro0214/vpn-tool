import { memo } from 'react';
import styled from 'styled-components';

export const Loading = memo(() => {
  return (
    <_LoadingWrapper>
      <_LoadingIcon />
    </_LoadingWrapper>
  );
});

const _LoadingWrapper = styled.div`
  text-align: center;
`;

const _LoadingIcon = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid #3b82f6;
  border-bottom-color: transparent;
  border-radius: 100%;
  animation: rotate 0.75s 0s linear infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(0.6);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
`;
