import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Header from '../components/Common/Header';
import PaddingContainer from '../components/Common/PaddingContainer';
import ScrollContainer from '../components/Common/ScrollContainer';
import DetailFriendsContainer from '../containers/DetailFriends/DetailFriendsContainer';
import schedule from '../modules/schedule';

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
const DetailFriends: React.FC<Props> = ({
  route: {
    params: { name, id },
  },
}: Props) => {
  const [schedules, setSchedules] = useState([]);

  const fetchFriendSchedule = async (id: number): Promise<void> => {
    const { data } = await axios.get(
      `http://bringumb.tk/schedule/friendSchedules/${id}`
    );
    setSchedules(data.friendSchedules);
  };

  useEffect(() => {
    fetchFriendSchedule(id);
  }, []);

  const navigation = useNavigation();
  return (
    <View>
      <ScrollContainer>
        <PaddingContainer>
          <DetailFriendsContainer schedules={schedules} />
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
