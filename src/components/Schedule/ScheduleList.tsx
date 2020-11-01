import React from 'react';
import { ScheduleType } from '../../api/schedule';
import Empty from '../Common/Empty';
import ScheduleItem from './ScheduleItem';

type Props = {
  type: string;
  schedules: ScheduleType[] | null | undefined;
};

const ScheduleList: React.FC<Props> = ({ type, schedules }: Props) => {
  return (
    <>
      {schedules && schedules?.length > 0 ? (
        schedules?.map(schedule => {
          return (
            <ScheduleItem type={type} key={schedule.id} schedule={schedule} />
          );
        })
      ) : (
        <Empty />
      )}
      {}
    </>
  );
};

export default ScheduleList;
