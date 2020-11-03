import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');

const Container = styled.ScrollView`
  background: ${props => props.theme.palette.mainBackground};
  padding-top: 50px;
  min-height: ${height}px;
  z-index: -100;
`;

const ScrollContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ScrollContainer;

ScrollContainer.propTypes = {
  children: PropTypes.node,
};
