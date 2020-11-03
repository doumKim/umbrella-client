import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import PaddingContainer from '../components/Common/PaddingContainer';
import DetailScheduleContainer from '../containers/DetailSchedule/DetailScheduleContainer';
import { Dimensions } from 'react-native';
import { ScheduleType } from '../api/schedule';

const { height } = Dimensions.get('screen');

const DetailScroll = styled.ScrollView`
  background: ${props => props.theme.palette.mainBackground};
  min-height: ${height}px;
  z-index: -100;
`;

type Props = {
  navigation: { children?: React.ReactNode };
  route: { params: { type: string; schedule: ScheduleType } };
};

const DetailSchedule: React.FC<Props> = ({
  route: {
    params: { type, schedule },
  },
}: Props) => {
  return (
    <View>
      <DetailScroll>
        <PaddingContainer>
          <DetailScheduleContainer type={type} schedule={schedule} />
        </PaddingContainer>
      </DetailScroll>
    </View>
  );
};

export default DetailSchedule;
