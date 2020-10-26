import React from 'react';
import styled from 'styled-components/native';
import AddFriendsContainer from '../containers/AddFriends/AddFriendsContainer';

const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.palette.mainBackground};
  padding: 45px 15px 0;
`;

const AddFriends: React.FC = () => {
  return (
    <Container>
      <AddFriendsContainer />
    </Container>
  );
};

export default AddFriends;
