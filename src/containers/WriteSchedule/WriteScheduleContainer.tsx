import React, { useCallback, useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useSelector } from 'react-redux';
import TodoList from '../../components/Schedule/TodoList';
import WriteForm from '../../components/WriteSchedule/WriteForm';
import { DateToTimestamp } from '../../lib/util/DateConverter';
import { RootState } from '../../modules';
import WriteActionBtnsContainer from './WriteActionBtnsContainer';

const WriteScheduleContainer: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [displayDate, setDisplayDate] = useState('');

  const onChangeTitle = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      const { text } = e.nativeEvent;
      setTitle(text);
    },
    [title]
  );

  const onConfirm = (selectedDate: Date | undefined): void => {
    const currentDate = selectedDate || date;
    const year = currentDate?.getFullYear();
    const month = currentDate?.getMonth() + 1;
    const day =
      currentDate?.getDate() < 10
        ? `0${currentDate?.getDate()}`
        : `${currentDate?.getDate()}`;
    if (
      currentDate &&
      DateToTimestamp(currentDate) < DateToTimestamp(new Date())
    ) {
      setDisplayDate('이전 날짜는 선택할 수 없습니다.');
    } else {
      setDisplayDate(`${year}년 ${month}월 ${day}일`);
    }
    setDate(currentDate);
    setShow(false);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  return (
    <>
      <WriteForm
        title={title}
        displayDate={displayDate}
        onChangeTitle={onChangeTitle}
        show={show}
        showDatepicker={showDatepicker}
        hideDatePicker={hideDatePicker}
        onConfirm={onConfirm}
      />
      <TodoList todos={todos} />
      <WriteActionBtnsContainer title={title} date={date} />
    </>
  );
};

export default WriteScheduleContainer;
