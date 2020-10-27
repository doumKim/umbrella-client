import React from 'react';
import { ScheduleType } from '../../api/schedule';
import ScheduleItem from './ScheduleItem';

type Props = {
  type: string;
  scheduels: ScheduleType[] | null;
};

const ScheduleList: React.FC<Props> = ({ type, scheduels }: Props) => {
  return (
    <>
      {scheduels?.map(schedule => {
        return (
          <ScheduleItem type={type} key={schedule.id} schedule={schedule} />
        );
      })}
    </>
  );
};

export default ScheduleList;
