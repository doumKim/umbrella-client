import React, { useState } from 'react';
import styled from 'styled-components/native';
import {
  Image,
  Modal,
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MapViewerContainer from '../../containers/WriteSchedule/MapViewerContainer';
import { addTodo } from '../../modules/todos';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 3px;
  margin-bottom: 10px;
  height: 50px;
`;
const InputOutline = styled.View`
  flex-direction: row;
  align-items: flex-start;
  border-style: solid;
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.2);
  width: 35%;
  margin-right: 8%;
  height: 30px;
`;
const ScheduleInput = styled(TextInput)`
  font-size: 16px;
  margin-left: 0px;
`;
const NoteInput = styled(TextInput)`
  width: 75%;
  font-size: 16px;
  margin-left: 0px;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.2);
`;

const WarningText = styled.Text`
  font-size: 15px;
  color: red;
  opacity: ${(props: WarningTextType) => (props.warning ? 1 : 0)};
`;

type WarningTextType = {
  warning: boolean;
};

const InputItem: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [minutes, setMinutes] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [displayDate, setDisplayDate] = useState('');
  const [displayLocation, setDisplayLocation] = useState({
    placeName: '',
    latitude: '',
    longitude: '',
  });
  const [warning, setWarning] = useState(false);
  const handleSetInfo = () => {
    if (
      todos.length < 4 &&
      hour !== null &&
      minutes !== null &&
      note &&
      displayLocation.placeName
    ) {
      setWarning(false);
      dispatch(
        addTodo({
          hour,
          minutes,
          note,
          latitude: displayLocation.latitude,
          longitude: displayLocation.longitude,
          placeName: displayLocation.placeName,
        })
      );
    } else {
      setWarning(true);
    }
  };
  const [mapShow, setMapShow] = useState(false);
  const onConfirm = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setHour(currentDate.getHours());
    setMinutes(currentDate.getMinutes());
    setDisplayDate(`${currentDate.getHours()}시 ${currentDate.getMinutes()}분`);
    setDate(currentDate);
    setShow(false);
  };

  const handleChangeNote = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    setNote(e.nativeEvent.text);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  const showMapView = () => {
    setMapShow(true);
  };

  const closeMapView = () => {
    setMapShow(false);
  };

  const changeDisplayLocation = (
    placeName: string,
    latitude: string,
    longitude: string
  ) => {
    setDisplayLocation({
      ...displayLocation,
      placeName,
      latitude,
      longitude,
    });
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 10,
          paddingRight: 10,
        }}
      >
        <WarningText warning={warning}>
          입력이 비었거나 할 일 최대 개수를 넘었습니다.
        </WarningText>
        <TouchableOpacity onPress={handleSetInfo}>
          <Image
            source={require('../../../assets/icon/plainplus.png')}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>
      <NoteInput
        value={note}
        onChange={handleChangeNote}
        placeholder="할 일을 입력하세요"
        maxLength={15}
      />
      <Container>
        <InputOutline>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={showTimepicker}
          >
            <Image
              source={require('../../../assets/icon/clock.png')}
              style={{ width: 20, height: 20, marginRight: 5 }}
            />
            <ScheduleInput
              value={displayDate}
              placeholder={'시간 선택'}
              editable={false}
            />
          </TouchableOpacity>
        </InputOutline>
        <InputOutline>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={showMapView}
          >
            <Image
              source={require('../../../assets/icon/flag.png')}
              style={{ width: 20, height: 24, marginRight: 5 }}
            />
            <ScheduleInput
              value={
                displayLocation.placeName &&
                `${displayLocation.placeName.substring(0, 7)}...`
              }
              placeholder={'위치 선택'}
              editable={false}
            />
          </TouchableOpacity>
        </InputOutline>
      </Container>
      <Modal visible={mapShow} transparent={true}>
        <MapViewerContainer
          closeMapView={closeMapView}
          changeDisplayLocation={changeDisplayLocation}
        />
      </Modal>
      <DateTimePickerModal
        isVisible={show}
        mode="time"
        onConfirm={onConfirm}
        isDarkModeEnabled={false}
        onCancel={() => setShow(false)}
        headerTextIOS="시간을 선택해주세요"
      />
    </>
  );
};

export default React.memo(InputItem);
