import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  padding: 60px 15px 120px;
`;

const PaddingContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default PaddingContainer;

PaddingContainer.propTypes = {
  children: PropTypes.node,
};
