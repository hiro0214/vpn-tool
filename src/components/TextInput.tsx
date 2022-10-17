import { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DataTypeKey, useData, UserListType } from '../providers/DataProvider';
import userList from '../userList.json';

type Props = {
  value: string;
  name: DataTypeKey;
  updateValue: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput: FC<Props> = memo((props) => {
  const { value, name, updateValue } = props;
  const [val, setVal] = useState(value);
  const [isActive, setActive] = useState(false);
  const [searchList, setSearchList] = useState<UserListType[]>([]);
  const { data, setData } = useData();

  useEffect(() => {
    setVal(value);
  }, [value]);

  const searchUser = (value: string) => {
    const list = userList.filter((user) => user.name.includes(value) || user.mail.includes(value));
    setSearchList(list);
  };

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVal(value);
    setActive(true);
    searchUser(value);
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    updateValue(e);
    setTimeout(() => {
      setActive(false);
    }, 200);
  };

  const setUser = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const target = e.target as HTMLElement;
    const element = target.closest('tr[data-index]') as HTMLElement;
    const elementIndex = element.getAttribute('data-index') as string;
    const targetElement = data[Number(elementIndex)];
    const parent = target.closest('td[data-name]') as HTMLElement;
    const parentName = parent.getAttribute('data-name') as
      | 'applicant'
      | 'user'
      | 'firstAuthorizer'
      | 'secondAuthorizer';
    const user = searchList[index];

    if (parentName === 'applicant') {
      targetElement.applicantName = user.name;
      targetElement.applicantFirstName = user.firstName;
      targetElement.applicantLastName = user.lastName;
      targetElement.applicantMail = user.mail;
    } else if (parentName === 'user') {
      targetElement.userName = user.name;
      targetElement.userMail = user.mail;
    } else if (parentName === 'firstAuthorizer') {
      targetElement.firstAuthorizerName = user.name;
      targetElement.firstAuthorizerMail = user.mail;
    } else if (parentName === 'secondAuthorizer') {
      targetElement.secondAuthorizerName = user.name;
      targetElement.secondAuthorizerMail = user.mail;
    }

    setData([...data]);
    setActive(false);
  };

  return (
    <_Wrapper>
      <_Input type={'text'} name={name} value={val} onChange={changeValue} onBlur={onBlur} />
      <_SearchList data-active={isActive}>
        {searchList.map((user, i) => (
          <_SearchItem key={i}>
            <button type={'button'} onClick={(e) => setUser(e, i)}>
              <span>{user.name}</span>
              <span>{user.mail}</span>
            </button>
          </_SearchItem>
        ))}
      </_SearchList>
    </_Wrapper>
  );
});

const _Wrapper = styled.div`
  position: relative;
`;

const _Input = styled.input`
  width: 100%;
  padding: 10px;
  outline: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: 2px solid #3e62ad;
  }
`;

const _SearchList = styled.ul`
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 3;
  width: 100%;
  min-width: 150px;
  max-height: 400px;
  padding-top: 4px;
  padding-bottom: 4px;
  background: #fff;
  outline: 1px solid #ccc;
  border-radius: 4px;
  overflow-x: hidden;
  overflow-y: auto;
  &[data-active='false'] {
    display: none;
  }
`;

const _SearchItem = styled.li`
  &:not(:first-of-type) {
    margin-top: 5px;
  }
  button {
    width: 100%;
    padding: 4px 8px;
    text-align: left;
    cursor: pointer;
    span {
      display: block;
      font-size: 12px;
      white-space: nowrap;
    }
    &:hover {
      background: #3b82f6;
      span {
        color: #fff;
      }
    }
  }
`;
