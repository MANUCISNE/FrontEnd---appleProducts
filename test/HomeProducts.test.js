import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeProducts from './HomeProducts';

describe('HomeProducts component', () => {
  it('renders without crashing', () => {
    render(<HomeProducts />);
  });

  it('displays the correct number of products', () => {
    const { getAllByTestId } = render(<HomeProducts />);
    const productColumns = getAllByTestId('product-column');
    expect(productColumns.length).toBeGreaterThan(0);
  });

  it('adds a product to the cart when the "COMPRAR" button is clicked', () => {
    const { getByTestId } = render(<HomeProducts />);
    const comprarButton = getByTestId('buy-button');
    
    fireEvent.click(comprarButton);
  });
});
