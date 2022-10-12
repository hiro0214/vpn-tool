import { accountSubject, carbonCopyList, connectSubject } from './config';
import { accountText } from './templates/account';
import { connectText } from './templates/connect';

type MailNameType = 'connect' | 'account';

const getcarbonCopyList = (): string => carbonCopyList.join(',');

const setMailConfig = (target: HTMLAnchorElement, name: MailNameType) => {
  const address = 'hoge@sample.com';
  const carbonCopy = 'fuga@sample.com';
  // const carbonCopy = getcarbonCopyList();
  const subject = name === 'connect' ? connectSubject : accountSubject;
  const body = name === 'connect' ? connectText : accountText;

  target.href = `mailto:${address}?cc=${carbonCopy}?subject=${subject}?body=${body}`;
};

export const startMailer = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const target = e.target as HTMLAnchorElement;
  const name = target.getAttribute('data-name') as MailNameType;

  setMailConfig(target, name);
};
