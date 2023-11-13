import React from 'react';
import styled from 'styled-components';

const QuantityControlWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  padding: 0.4rem;
  height: 1.8rem;
  border-radius: 10px;
`;

const QuantityButton = styled.button`
  background-color: transparent;
  color: black;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
`;

const QuantityDisplay = styled.p`
  margin: 0 0.5em;

  &::before {
    content: "|";
    margin-right: 0.5em; 
    color: lightgray; 
  }

  &::after {
    content: "|";
    margin-left: 0.5em; 
    color: lightgray; 
  }
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
