import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { DateToTimestamp } from '../../lib/util/DateConverter';
import { RootState } from '../../modules';
import { createUserScheduleAsync } from '../../modules/schedule';
import { addScheduleInfo, clearTodos } from '../../modules/todos';

type Props = {
  title: string;
  date: Date;
};

type ButtonType = {
  isInactive: boolean;
};

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const CancelBtn = styled.TouchableOpacity`
  background: #ff8c94;
  width: 48%;
  align-items: center;
  border-radius: 8px;
  padding: 20px 0;
  margin-right: 2%;
  max-height: 60px;
`;
const SaveBtn = styled.TouchableOpacity`
  background: ${(props: ButtonType) =>
    props.isInactive ? '#c9d6df' : '#769fcd'};
  width: 48%;
  align-items: center;
  border-radius: 8px;
  padding: 20px 0;
  margin-left: 2%;
  max-height: 60px;
`;

const StyledText = styled.Text`
  font-size: 20px;
  color: white;
`;

const WriteActionBtns: React.FC<Props> = ({ title, date }: Props) => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isRequire, setIsRequire] = useState(false);
  const dispatch = useDispatch();
  const schedule = useSelector((state: RootState) => state.todos);
  const todos = useSelector((state: RootState) => state.todos.todos);
  const navigation = useNavigation();
  const handleCreateSchedule = () => {
    dispatch(createUserScheduleAsync.request(schedule));
    navigation.navigate('Schedule');
    dispatch(clearTodos());
  };

  const handelIsDone = (): void => {
    setIsDone(true);
    const isPast = DateToTimestamp(date) < DateToTimestamp(new Date());
    if (!isPast && title && todos.length > 0) {
      dispatch(addScheduleInfo(title, date));
      setIsRequire(false);
    } else {
      setIsRequire(true);
    }
  };

  const handleCancel = (): void => {
    dispatch(clearTodos());
    navigation.navigate('Schedule');
  };

  useEffect(() => {
    setIsDone(false);
  }, [title, date, todos]);

  return (
    <Container>
      <CancelBtn
        onPress={() => {
          navigation.goBack();
        }}
      >
        <StyledText onPress={handleCancel}>취소</StyledText>
      </CancelBtn>
      <SaveBtn isInactive={isDone && isRequire}>
        {isDone ? (
          isRequire ? (
            <StyledText onPress={handelIsDone}>입력된 값이 없어요</StyledText>
          ) : (
            <StyledText onPress={handleCreateSchedule}>저장</StyledText>
          )
        ) : (
          <StyledText onPress={handelIsDone}>입력 완료</StyledText>
        )}
      </SaveBtn>
    </Container>
  );
};

export default WriteActionBtns;
