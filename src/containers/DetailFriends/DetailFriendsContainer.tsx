import React from 'react';
import { ScheduleType } from '../../api/schedule';
import ScheduleList from '../../components/Schedule/ScheduleList';

type Props = {
  schedules: ScheduleType[] | null | undefined;
};

const DetailFriendsContainer: React.FC<Props> = ({ schedules }: Props) => {
  return <ScheduleList type="friend" schedules={schedules} />;
};

export default DetailFriendsContainer;
