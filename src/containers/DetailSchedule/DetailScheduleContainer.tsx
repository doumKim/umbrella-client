import React from 'react';
import { ScheduleType } from '../../api/schedule';
import CardList from '../../components/DetailSchedule/CardList';

type Props = {
  type: string;
  schedule: ScheduleType;
};
const DetailScheduleContainer: React.FC<Props> = ({
  type,
  schedule,
}: Props) => {
  return <CardList type={type} schedule={schedule} />;
};

export default DetailScheduleContainer;
