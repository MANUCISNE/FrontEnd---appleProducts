import React from 'react';
import styled from 'styled-components';

const QuantityControlWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5em;
  cursor: pointer;
`;

const QuantityDisplay = styled.p`
  margin: 0 0.5em;
`;

const QuantityControl = ({ quantity, onIncrease, onDecrease }: any) => {
  return (
    <QuantityControlWrapper>
      <QuantityButton onClick={onDecrease}>-</QuantityButton>
      <QuantityDisplay>{quantity}</QuantityDisplay>
      <QuantityButton onClick={onIncrease}>+</QuantityButton>
    </QuantityControlWrapper>
  );
};

export default QuantityControl;
