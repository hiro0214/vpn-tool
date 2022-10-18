import { DataType } from '../providers/DataProvider';
import { accountSubject, carbonCopyList, connectSubject, signatureText } from './config';
import { accountText } from './templates/account';
import { connectText } from './templates/connect';

interface DataTypeAble {
  [key: string]: string;
}

type MailNameType = 'connect' | 'account';

const dataArray: DataType = {
  id: '申請ID',
  applicantName: '申請者名',
  applicantFirstName: '申請者名前',
  applicantLastName: '申請者苗字',
  applicantMail: '申請者アドレス',
  userName: '利用者名',
  userMail: '利用者アドレス',
  startDate: '開始日',
  endDate: '終了日',
  firstAuthorizerName: '一次承認者名',
  firstAuthorizerMail: '一次承認者アドレス',
  secondAuthorizerName: '二次承認者名',
  secondAuthorizerMail: '二次承認者アドレス',
};

const getCarbonCopyList = (): string => carbonCopyList.join(',');

const replaceText = (data: DataTypeAble, text: string): string => {
  const keys = Object.keys(dataArray);
  keys.forEach((key) => {
    text = text.replace(`$${key}`, data[key]);
    if (key === 'startDate' || key === 'endDate') {
      text = text.replace(/\(|\)/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0xfee0));
    }
  });

  return text;
};

const replaceBreak = (text: string): string => text.replace(/\n\r?/g, '%0D%0A');

const getBody = (data: DataType, name: MailNameType) => {
  const baseText = name === 'connect' ? connectText : accountText;
  let text = replaceText(data, baseText);
  text += signatureText;
  text = replaceBreak(text);

  return text;
};

const setMailConfig = (data: DataType, target: HTMLAnchorElement, name: MailNameType): void => {
  const address = data.applicantMail;
  const carbonCopy = getCarbonCopyList();
  const subject = name === 'connect' ? connectSubject : accountSubject;
  const body = getBody(data, name);

  target.href = `mailto:${address}?cc=${carbonCopy}&subject=${subject}&body=${body}`;
};

export const startMailer = (e: React.MouseEvent<HTMLAnchorElement>, data: DataType): void => {
  const target = e.target as HTMLAnchorElement;
  const name = target.getAttribute('data-name') as MailNameType;

  setMailConfig(data, target, name);
};
