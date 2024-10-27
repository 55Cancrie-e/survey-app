import Image from 'next/image';
import styled from 'styled-components';


export const NavbarWrapper = styled.nav`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 10px 20px;
  min-height: 55px;
`;
export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;

  &:hidden {
    visibility: hidden;
  }
`;

export const NavImage = styled(Image)`
  vertical-align: top;
`