import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from '../../components/Common/ErrorComponent';
import Loading from '../../components/Common/Loading';
import ScheduleList from '../../components/Schedule/ScheduleList';
import { RootState } from '../../modules';
import { getUserScheduleAsync } from '../../modules/schedule';

const ScheduleContainer: React.FC = () => {
  const { error, loading, schedules } = useSelector(
    (state: RootState) => state.schedule.mySchedules
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserScheduleAsync.request());
  }, []);

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorComponent />}
      {loading || error || <ScheduleList type="my" scheduels={schedules} />}
    </>
  );
};

export default ScheduleContainer;
