import React from 'react';
import styled from 'styled-components/native';
import SerarchFriendsContainer from '../containers/SearchFriends/SerarchFriendsContainer';

const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.palette.mainBackground};
  padding: 45px 15px 0;
`;

const SearchFriends: React.FC = () => {
  return (
    <Container>
      <SerarchFriendsContainer />
    </Container>
  );
};

export default SearchFriends;
