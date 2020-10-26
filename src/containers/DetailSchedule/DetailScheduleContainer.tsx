import React from 'react';
import CardList from '../../components/DetailSchedule/CardList';

type Props = {
  type: string;
};
const DetailScheduleContainer: React.FC<Props> = ({ type }: Props) => {
  return <CardList type={type} />;
};

export default DetailScheduleContainer;
