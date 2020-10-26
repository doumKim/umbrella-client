import React from 'react';
import ScheduleItem from './ScheduleItem';

type Props = {
  type: string;
};

const ScheduleList: React.FC<Props> = ({ type }: Props) => {
  return (
    <>
      <ScheduleItem type={type} />
      <ScheduleItem type={type} />
      <ScheduleItem type={type} />
      <ScheduleItem type={type} />
      <ScheduleItem type={type} />
      <ScheduleItem type={type} />
    </>
  );
};

export default ScheduleList;
