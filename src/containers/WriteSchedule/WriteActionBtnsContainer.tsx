import React from 'react';
import WriteActionBtns from '../../components/WriteSchedule/WriteActionBtns';

type Props = {
  title: string;
  date: Date;
};

const WriteActionBtnsContainer: React.FC<Props> = ({ title, date }: Props) => {
  return <WriteActionBtns title={title} date={date} />;
};

export default WriteActionBtnsContainer;
