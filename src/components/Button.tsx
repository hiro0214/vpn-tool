import { FC, memo, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  name: string;
  onclick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export const Button: FC<Props> = memo((props) => {
  const { children, name, onclick } = props;

  return (
    <_Button onClick={onclick} data-name={name}>
      {children}
    </_Button>
  );
});

const _Button = styled.a`
  display: block;
  padding: 8px 12px;
  color: #fff;
  background: #38a169;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid #38a169;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;
  &:hover {
    background: #fff;
    color: #38a169;
  }
`;
