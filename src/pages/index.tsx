import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import QuantityControl from "@/components/QuantityControl";
interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
}

const Header = styled.header`
  background-color: #0f52ba;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 375px) {
    height: 5rem;
  }
`;

const TitleStore = styled.div`
  display: flex;
  gap: 0.5rem;
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

  @media (max-width: 375px) {
    overflow: auto;
    height: 100%;
    margin-bottom: 2rem;
  }
`;

const ProductContainer = styled.div`
  width: 65rem;
  flex-wrap: wrap;
  height: 38rem;
  display: flex;
  padding-bottom: 0;

  @media (max-width: 375px) {
    width: 70%;
    height: 100%;
  }
`;

const ProductColumn = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 14rem;
  height: 18rem;
  margin: 6px;
  text-align: center;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  padding-top: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 8rem;
  height: 7.5rem;
  text-align: center;
`;

const ProductInformation = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  gap: 10px;
`;

const DescriptionContainer = styled.div`
  font-family: Montserrat;
  font-size: 0.625rem;
  color: #2c2c2c;
  text-align: start;
`;

const TitlePriceContainer = styled.div`
  border-radius: 10px;
  font-family: Montserrat;
  color: #2c2c2c;
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  h3 {
    text-align: start;
    font-weight: 400;
  }

  p {
    background-color: black;
    border-radius: 5px;
    align-items: center;
    width: 4.6rem;
    height: 1.4rem;
    color: white;
    padding: 2px;
  }
`;

const ContainerButton = styled.div`
  font-family: Montserrat;
  background-color: #0f52ba;
  color: white;
  display: flex;
  justify-content: center;
  padding: 5px 0;
  gap: 10px;
  width: 100%;
  cursor: pointer;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const ButtonCard = styled.div`
  font-weight: 700;
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
  width: 480px;
  height: 100%;
  font-family: Montserrat;
  background-color: #0f52ba;
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-480px")};
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: auto;

  @media (max-width: 375px) {
    width: 85%;
    border-radius: 0;
  }
`;

const HeaderSidebar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;

  h2 {
    width: 10rem;
  }
`;

const CartItem = styled.div`
  height: 7rem;
  background-color: white;
  border-radius: 5px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.3rem;
  padding: 23px;
  font-weight: 400;

  @media (max-width: 375px) {
    flex-direction: column;
    padding: 8px;
    height: 13rem;
    width: 15rem;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    gap: 0.5rem;
  }
`;

const ProductImageCart = styled.img`
  width: 4.2rem;
  height: 3.5rem;

  @media (max-width: 375px) {
    width: 7rem;
    height: 6rem;
  }
`;

const ItemName = styled.div`
  width: 7rem;

  @media (max-width: 375px) {
    width: 15rem;
    text-align: center;
  }
`;

const MobileFlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.8rem;
`;

const PriceCart = styled.div`
  font-weight: 700;

  @media (max-width: 375px) {
    background-color: black;
    border-radius: 5px;
    text-align: center;
    width: 5rem;
    height: 2rem;
    color: white;
    padding: 4px;
  }
`;

const CloseButtonCart = styled.button`
  background-color: black;
  color: white;
  width: 1.14rem;
  height: 1.14rem;
  position: relative;
  left: 28rem;
  bottom: 8.8rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 11px;

  @media (max-width: 375px) {
    position: relative;
    left: 14.18rem;
    bottom: 13.5rem;
    background-color: transparent;
    font-size: 30px;
    color: black;
  }
`;

const FooterSidebar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;

  h2 {
    width: 10rem;
  }

  p {
    font-weight: 700;
    font-size: 1.4rem;
  }

  @media (max-width: 375px) {
    h2 {
      width: 5rem;
    }
  }
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
  width: 480px;
  margin-top: auto;
  display: flex;
  justify-content: center;

  @media (max-width: 375px) {
    text-align: center;
    width: 100%;
  }
`;

const HomeProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<any>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC"
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product: any) => {
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      setCart((prevCart: any) =>
        prevCart.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart: any) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const decreaseFromCart = (productId: number) => {
    const updatedCart = cart.map((item: any) =>
    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );
  setCart(updatedCart);
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item: any) => item.id !== productId);
    setCart(updatedCart);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total: any, item: any) => {
      return total + item.quantity * parseFloat(item.price);
    }, 0);
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
          {products.map((product: any) => (
            <ProductColumn key={product.id} data-testid="product-column">
              <ProductImage src={product.photo} alt={product.name} />
              <ProductInformation>
                <TitlePriceContainer>
                  <h3>{product.name}</h3>
                  <strong>
                    <p>{`R$ ${parseFloat(product.price).toFixed(0)}`}</p>
                  </strong>
                </TitlePriceContainer>
                <DescriptionContainer>
                  {product.description}
                </DescriptionContainer>
              </ProductInformation>

              <ContainerButton>
                <Image src="./shopping-bag.svg" alt="" width={16} height={16} />
                <ButtonCard data-testid="buy-button" onClick={() => addToCart(product)}>
                  COMPRAR
                </ButtonCard>
              </ContainerButton>
            </ProductColumn>
          ))}
        </ProductContainer>
      </Body>

      <Footer>MKS sistemas © Todos os direitos reservados</Footer>

      <Sidebar isOpen={isSidebarOpen}>
        <HeaderSidebar>
          <h2>Carrinho de Compras</h2>
          <CloseButton onClick={() => setIsSidebarOpen(false)}>X</CloseButton>
        </HeaderSidebar>

        {cart.map((item: any, index: any) => (
          <div key={index}>
            <CartItem>
              <ProductImageCart
                src={item.photo}
                alt={item.name}
                title={item.name}
              />
              <ItemName>{item.name}</ItemName>

              <MobileFlexContainer>
                <QuantityControl
                  quantity={item.quantity}
                  onIncrease={() => addToCart(item)}
                  onDecrease={() => decreaseFromCart(item.id)}
                />
                <PriceCart>{`R$ ${parseFloat(item.price).toFixed(
                  0
                )}`}</PriceCart>
              </MobileFlexContainer>
            </CartItem>
            <CloseButtonCart onClick={() => removeFromCart(item.id)}>
              X
            </CloseButtonCart>
          </div>
        ))}

        <FooterSidebar>
          <h2>Total:</h2>
          <p>R$ {calculateTotalPrice()}</p>
        </FooterSidebar>
        <CheckoutButton>
          Finalizar Compra
        </CheckoutButton>
      </Sidebar>
    </div>
  );
};

export default HomeProducts;
