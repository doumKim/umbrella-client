import React from 'react';
import {
  Dimensions,
  Image,
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import InputItem from './InputItem';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
  title: string;
  onChangeTitle(e: NativeSyntheticEvent<TextInputChangeEventData>): void;
  show: boolean;
  displayDate: string;
  showDatepicker(): void;
  hideDatePicker(): void;
  onConfirm(selectedDate: Date | undefined): void;
};

const { height } = Dimensions.get('screen');

const Container = styled.View`
  width: 100%;
  align-items: center;
  margin-top: -20px;
`;
const TopSection = styled.View`
  width: 100%;
  padding: 30px;
  border-radius: 12px;
  align-items: center;
`;
const ScrollSection = styled.View`
  margin: 0;
  padding: 0;
`;
const TitleInput = styled(TextInput)`
  font-size: 22px;
  padding: 4px 2px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: black;
  margin-bottom: 15px;
`;
const Calendar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const CalendarText = styled.Text`
  font-size: 15px;
`;
const TopWrapper = styled.View`
  width: 80%;
`;
const Wrapper = styled.View`
  background: ${props => props.theme.palette.scheduleCard};
  width: 95%;
  border-radius: 6px;
  max-height: ${height / 4.5}px;
  padding: 20px 5px 20px 20px;
`;

const WriteForm: React.FC<Props> = ({
  title,
  showDatepicker,
  hideDatePicker,
  onChangeTitle,
  show,
  displayDate,
  onConfirm,
}: Props) => {
  return (
    <Container>
      <TopSection>
        <TopWrapper>
          <TitleInput
            onChange={onChangeTitle}
            value={title}
            placeholder="일정 이름"
            maxLength={20}
          />
          <Calendar>
            <CalendarText>
              {displayDate ? displayDate : '날짜를 정해주세요.'}
            </CalendarText>
            <TouchableOpacity onPress={showDatepicker}>
              <Image
                source={require('../../../assets/icon/calendar.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </Calendar>
        </TopWrapper>
      </TopSection>
      <Wrapper>
        <ScrollSection>
          <InputItem />
        </ScrollSection>
      </Wrapper>
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={onConfirm}
        isDarkModeEnabled={false}
        onCancel={hideDatePicker}
        headerTextIOS="날짜를 선택해주세요"
      />
    </Container>
  );
};

export default WriteForm;
