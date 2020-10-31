import React from 'react';
import { ScheduleType } from '../../api/schedule';
import ScheduleItem from './ScheduleItem';

type Props = {
  type: string;
  schedules: ScheduleType[] | null | undefined;
};

const ScheduleList: React.FC<Props> = ({ type, schedules }: Props) => {
  return (
    <>
      {schedules?.map(schedule => {
        return (
          <ScheduleItem type={type} key={schedule.id} schedule={schedule} />
        );
      })}
    </>
  );
};

export default ScheduleList;
