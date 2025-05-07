import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// ------------------- Styled Components -------------------
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.aside`
  width: 240px;
  background-color: #005bea;
  color: #fff;
  padding: 1rem;
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  width: 50px;
  margin-right: 0.5rem;
`;

const Brand = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.5rem;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 10px 5px;
  color: inherit;
  text-decoration: none;
  border-radius: 0.25rem;

  &:hover {
    background-color:rgb(40, 117, 249);
  }

  &.active {
    background-color:rgb(0, 82, 214);
    font-weight: bold;
    border-left: 4px solid #FFD700;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: block;
  padding: 1.5rem;
`;
// -----------------------------------------------------------

const Layout = ({ children }) => (
  <AppContainer>
    <Sidebar>
      <BrandContainer>
        <Logo src="/logo.png" alt="Logo" />
        <Brand>MyCardVault</Brand>
      </BrandContainer>
      <nav>
        <NavList>
          {[
            { name: 'Trang chủ', path: '/' },
            { name: 'Quét QR',    path: '/scan' },
            { name: 'Danh sách thẻ', path: '/cards' },
            { name: 'Thêm thẻ mới', path: '/add-card' },
            { name: 'Tài khoản',  path: '/profile' },
          ].map(item => (
            <NavItem key={item.path}>
              <StyledNavLink
                to={item.path}
                end={item.path === '/'}  /* ensure '/' only active on exact match */
              >
                {item.name}
              </StyledNavLink>
            </NavItem>
          ))}
        </NavList>
      </nav>
    </Sidebar>
    <MainContent>{children}</MainContent>
  </AppContainer>
);

export default Layout;
