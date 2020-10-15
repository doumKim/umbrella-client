import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.ScrollView`
  background: ${props => props.theme.palette.mainBackground};
`;

const ScrollContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ScrollContainer;

ScrollContainer.propTypes = {
  children: PropTypes.node,
};
