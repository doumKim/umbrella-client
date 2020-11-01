import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { ScheduleType, TodoType } from '../api/schedule';
import { getWeatherIcon } from '../api/weather';
import Header from '../components/Common/Header';
import Loading from '../components/Common/Loading';
import PaddingContainer from '../components/Common/PaddingContainer';
import ScrollContainer from '../components/Common/ScrollContainer';
import DetailFriendsContainer from '../containers/DetailFriends/DetailFriendsContainer';
import { sortSchedules } from '../modules/helper';

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.palette.sub};
`;
const Span = styled.Text`
  font-weight: 700;
  color: ${props => props.theme.palette.main};
`;
type Props = {
  name: string;
  route: { params: { name: string; id: number } };
};
type ScheduleDate = {
  date: Date;
  todos: TodoType[];
};
const DetailFriends: React.FC<Props> = ({
  route: {
    params: { name, id },
  },
}: Props) => {
  const [schedules, setSchedules] = useState<ScheduleType[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchFriendSchedule = async (id: number): Promise<void> => {
    setIsLoading(true);
    const { data } = await axios.get(
      `http://bringumb.tk/schedule/friendSchedules/${id}`
    );
    if (data.friendSchedules) {
      await Promise.all(
        data.friendSchedules.map(async (_schedule: ScheduleDate) => {
          await Promise.all(
            _schedule.todos.map(async (_todo: TodoType) => {
              const { backdrop, iconName, temp } = await getWeatherIcon(
                _schedule.date,
                _todo.latitude,
                _todo.longitude,
                _todo.hour
              );
              _todo.backdrop = backdrop;
              _todo.iconName = iconName;
              _todo.temp = temp;
            })
          );
        })
      );
    }
    setSchedules(sortSchedules(data.friendSchedules));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFriendSchedule(id);
  }, []);

  const navigation = useNavigation();
  return (
    <View>
      <ScrollContainer>
        <PaddingContainer>
          {isLoading ? (
            <Loading />
          ) : (
            <DetailFriendsContainer schedules={schedules} />
          )}
        </PaddingContainer>
      </ScrollContainer>
      <Header>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={require('../../assets/icon/back.png')}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          <HeaderTitle>
            <Span>{name}</Span>님이 공유한 일정목록
          </HeaderTitle>
        </View>
      </Header>
    </View>
  );
};

export default DetailFriends;
