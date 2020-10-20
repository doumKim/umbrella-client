import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
  margin-bottom: 13px;
  height: 35px;
`;

const InputOutline = styled.View`
  flex-direction: row;
  align-items: center;
  border-style: solid;
  padding-right: 10px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0,0,0,0.2);
  width: 35%;
  margin-right: 8%;
`;

const ScheduleInput = styled(TextInput)`
  font-size: 16px;
  margin-left: 3px;
  padding-bottom: 3px;
`;

const InputItem: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [displayDate, setDisplayDate] = useState('');

  const onConfirm = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDisplayDate(`${currentDate.getHours()}시 ${currentDate.getMinutes()}분`);
    setDate(currentDate);
    setShow(false);
  };

  const showTimepicker = () => {
    setShow(true);
  };
  return(
    <>
      <Container>
        <InputOutline>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={showTimepicker}>
            <Image source={require('../../../assets/icon/clock.png') } style={{ width: 20, height: 20 }}/>
            <ScheduleInput placeholder={displayDate ? displayDate : '시간 선택'} editable={false}/>
          </TouchableOpacity>
        </InputOutline>
        <InputOutline>
          <Image source={require('../../../assets/icon/flag.png') } style={{ width: 24, height: 24 }}/>
          <ScheduleInput placeholder="위치 선택" editable={false}/>
        </InputOutline>
        <Image source={require('../../../assets/icon/delete.png') } style={{ width: 24, height: 24 }}/>
      </Container>
      <DateTimePickerModal
        isVisible={show}
        mode="time"
        onConfirm={onConfirm}
        onCancel={() => setShow(false)}
        headerTextIOS='시간을 선택해주세요'
      />
    </>
  );
};

export default InputItem;