import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { removeUserSchedule } from '../../api/schedule';
import { getUserScheduleAsync } from '../../modules/schedule';
type Props = {
  type: string;
  show: boolean;
  closeModal(): void;
  scheduleId: string | null;
};
const DarkOpacity = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
  align-items: center;
`;
const ModalBackground = styled.View`
  width: 100%;
  background: #f2f3f7;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  align-items: center;
`;
const Line = styled.View`
  background: #dbdbdb;
  height: 2px;
  border-radius: 3px;
  width: 80%;
`;

const Button = styled.TouchableOpacity`
  padding: 20px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;
const StyledText = styled.Text`
  color: #465f7b;
  font-size: 17px;
  padding-left: 7%;
`;
const TopDeco = styled.View`
  margin-top: 17px;
  width: 10%;
  height: 6px;
  border-radius: 6px;
  background: ${props => props.theme.palette.subSub};
`;
const BottomModal: React.FC<Props> = ({
  type,
  show,
  closeModal,
  scheduleId,
}: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRemoveSchedule = async (scheduleId: string) => {
    await removeUserSchedule(scheduleId);
    dispatch(getUserScheduleAsync.request());
    navigation.navigate('Schedule');
    closeModal();
  };

  return (
    <Modal animationType={'fade'} visible={show} transparent={true}>
      <DarkOpacity>
        <ModalBackground>
          <TopDeco />
          {type === 'friends' && (
            <>
              <Button>
                <StyledText>친구 삭제</StyledText>
              </Button>
              <Line />
              <Button onPress={closeModal}>
                <StyledText>닫기</StyledText>
              </Button>
            </>
          )}
          {type === 'schedule' && (
            <>
              <Button>
                <StyledText>공유 하기</StyledText>
              </Button>
              <Line />
              <Button onPress={closeModal}>
                <StyledText>수정 하기</StyledText>
              </Button>
              <Line />
              <Button
                onPress={() => scheduleId && handleRemoveSchedule(scheduleId)}
              >
                <StyledText>삭제 하기</StyledText>
              </Button>
              <Line />
              <Button onPress={closeModal}>
                <StyledText>닫기</StyledText>
              </Button>
            </>
          )}
        </ModalBackground>
      </DarkOpacity>
    </Modal>
  );
};

export default BottomModal;
