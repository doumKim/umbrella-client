import React from 'react';
import styled from 'styled-components/native';
import SearchFriendsContainer from '../containers/SearchFriends/SearchFriendsContainer';

const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.palette.mainBackground};
  padding: 45px 15px 0;
`;

type Props = {
  route?: { params: { scheduleId: number; type: string } };
};

const SearchFriends: React.FC<Props> = ({ route }: Props) => {
  return (
    <Container>
      <SearchFriendsContainer
        scheduleId={route?.params && route.params.scheduleId}
        type={route?.params && route.params.type}
      />
    </Container>
  );
};

export default SearchFriends;
