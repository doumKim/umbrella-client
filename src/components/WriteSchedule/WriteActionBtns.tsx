import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { RootState } from '../../modules';
import { addScheduleInfo } from '../../modules/todos';

type Props = {
  title: string;
  date: Date;
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
  background: #769fcd;
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
  const dispatch = useDispatch();
  const schedule = useSelector((state: RootState) => state.todos);
  const todos = useSelector((state: RootState) => state.todos.todos);

  const handelIsDone = (): void => {
    setIsDone(prevState => !prevState);
    dispatch(addScheduleInfo(title, date));
  };

  useEffect(() => {
    setIsDone(false);
  }, [title, date, todos]);
  const navigation = useNavigation();
  return (
    <Container>
      <CancelBtn
        onPress={() => {
          navigation.goBack();
        }}
      >
        <StyledText>취소</StyledText>
      </CancelBtn>
      <SaveBtn>
        {isDone ? (
          <StyledText onPress={() => console.log(schedule)}>저장</StyledText>
        ) : (
          <StyledText onPress={handelIsDone}>입력 완료</StyledText>
        )}
      </SaveBtn>
    </Container>
  );
};

export default WriteActionBtns;
