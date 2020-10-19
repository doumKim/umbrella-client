import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
  margin-bottom: 13px;
`;

const InputOutline = styled.View`
  flex-direction: row;
  align-items: center;
  border-style: solid;
  padding-right: 10px;
  border-bottom-width: 1px;
  border-bottom-color: black;
  width: 35%;
  margin-right: 20px;
`;

const ScheduleInput = styled(TextInput)`
  font-size: 16px;
  margin-left: 3px;
`;

const InputItem: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [displayDate, setDisplayDate] = useState('');

  const onChange = (event: any, selectedDate: Date | undefined) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDisplayDate(`${currentDate.getHours()}시 ${currentDate.getMinutes()}분`);
    setDate(currentDate);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return(
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
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='time'
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </Container>
  );
};

export default InputItem;