import React, { useState } from 'react';
import { Dimensions, Image, TextInput, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import InputItem from './InputItem';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const { height } = Dimensions.get('screen');

const Container = styled.View`
  width: 100%;
  align-items: center;
`;
const TopSection = styled.View`
  width: 100%;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 15px;
  align-items: center;
`;
const ScrollSection = styled.ScrollView`
`;
const TitleInput = styled(TextInput)`
  font-size: 22px;
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
  width: 90%;
  border-radius: 12px;
  min-height: 100px;
  max-height: ${height / 4.5}px;
  padding: 15px 5px;
`;

const WriteForm: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [displayDate, setDisplayDate] = useState('');
  const onConfirm = (selectedDate: Date | undefined): void => {
    const currentDate = selectedDate || date;
    setDisplayDate(`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`);
    setDate(currentDate);
    setShow(false);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return(
    <Container>
      <TopSection>
        <TopWrapper>
          <TitleInput placeholder="일정 이름"/>
          <Calendar>
            <CalendarText>{displayDate ? displayDate : '날짜를 정해주세요.'}</CalendarText>
            <TouchableOpacity onPress={showDatepicker}>
              <Image source={require('../../../assets/icon/calendar.png') } style={{ width: 30, height: 30 }}/>
            </TouchableOpacity>
          </Calendar>
        </TopWrapper>
      </TopSection>
      <Wrapper>
        <View style={{ alignItems: 'flex-end'}}>
          <Image source={require('../../../assets/icon/plainplus.png') } style={{ width: 20, height: 20 }}/>
        </View>
        <ScrollSection>

          <InputItem />
          <InputItem />
          <InputItem />
          <InputItem />
          <InputItem />
        </ScrollSection>
      </Wrapper>
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={onConfirm}
        onCancel={() => setShow(false)}
        headerTextIOS='날짜를 선택해주세요'
      />
    </Container>
  );
};

export default WriteForm;