import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faContactBook } from '@fortawesome/free-solid-svg-icons/faContactBook';

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
}

interface HomeProductsProps {}

const Header = styled.header`
  background-color: #0f52ba;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleStore = styled.div`
  display: flex;
  gap: .5rem;
  font-family: Montserrat;
  align-items: center;

  strong {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.25rem;
    font-weight: 100;
  }
`;

const CartButton = styled.button`
  background-color: white; 
  width: 80px;
  border: none;
  cursor: pointer;
  color: black; 
  font-size: 16px;
  padding: 13px;
  border-radius: 15px; 
  align-items: center;
`;

const CartIcon = styled.span`
  margin-right: 15px;
  color: black; 
`;

const Body = styled.div`
  background-color: #f9f9f9;
  color: black;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const ProductContainer = styled.div`
  width: 65rem;
  flex-wrap: wrap;
  height: 38rem;
  display: flex;
`

const ProductColumn = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 15rem;
  height: 18rem;
  margin: 6px;
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 8rem;
  height: 7.5rem;
`;

const Footer = styled.footer`
  background-color: #eeeeee;
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  color: black;
  font-family: Montserrat;
  font-size: 0.75rem; 
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
  width: 400px;
  height: 100%;
  font-family: Montserrat;
  background-color: #0f52ba;
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-400px')};
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;

  @media (max-width: 375px) {
    width: 90%; 
    border-radius: 0; 
  }
`;

const HeaderSidebar = styled.div`
  flex-direction: row;
`;

const CartItem = styled.div`
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background-color: black;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const CheckoutButton = styled.button`
  background-color: black;
  color: white;
  padding: 20px;
  border: none;
  cursor: pointer;
  font-size: 25px;
  width: 400px;
  margin-top: auto; 
`;

const HomeProducts: React.FC<HomeProductsProps> = () => {
  const [products, setProducts] = useState<Product>([]);
  const [cart, setCart] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCheckout = () => {
    // Adicione a lógica para finalizar a compra, por exemplo, enviar a lista de produtos ao backend.
    //console.log('Compra finalizada:', cart);
  };

  return (
    <div>
      <Header>
        <TitleStore>
          <strong>MKS</strong>
          <p>Sistemas</p>
        </TitleStore>

        <CartButton onClick={toggleSidebar}>
          <CartIcon>
            <FontAwesomeIcon icon={faShoppingCart} />
          </CartIcon>
          {cart.length}
        </CartButton>
      </Header>

      <Body>
        <ProductContainer>
          {products.map((product) => (
              <ProductColumn key={product.id}>
                <ProductImage src={product.photo} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{`R$ ${product.price}`}</p>
                <button onClick={() => addToCart(product)}    >Comprar</button>
              </ProductColumn>
          ))}
        </ProductContainer>
      </Body>

      <Footer>
        MKS sistemas © Todos os direitos reservados
      </Footer>

      <Sidebar isOpen={isSidebarOpen}>
        <HeaderSidebar>
          <h2>Carrinho de Compras</h2>
          <CloseButton onClick={() => setIsSidebarOpen(false)}>X</CloseButton>
        </HeaderSidebar>

        {cart.map((item, index) => (
          <CartItem key={index}>
            <p>{item.name}</p>
            <CloseButton onClick={() => removeFromCart(item.id)}>X</CloseButton>
          </CartItem> 
        ))}
        <CheckoutButton onClick={handleCheckout}>Finalizar Compra</CheckoutButton>
      </Sidebar>
    </div>
  );
};

export default HomeProducts;
