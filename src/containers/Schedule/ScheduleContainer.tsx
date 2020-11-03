import React from 'react';
import { useSelector } from 'react-redux';
import Empty from '../../components/Common/Empty';
import ErrorComponent from '../../components/Common/ErrorComponent';
import Loading from '../../components/Common/Loading';
import ScheduleList from '../../components/Schedule/ScheduleList';
import { RootState } from '../../modules';

const ScheduleContainer: React.FC = () => {
  const { error, loading, schedules } = useSelector(
    (state: RootState) => state.schedule.mySchedules
  );

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorComponent />}
      {schedules?.length === 0 && <Empty />}
      {loading || error || <ScheduleList type="my" schedules={schedules} />}
    </>
  );
};

export default ScheduleContainer;
