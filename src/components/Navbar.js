import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loc, setLoc] = useState(null)

  useEffect(() => {
    setLoc(location?.pathname)
  }, [location?.pathname])
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <Nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: (loc === '/form' || loc === '/404') ? 'dodgerblue' : 'white',
        padding: "10px",
        color: (loc === '/form' || loc === '/404') ? 'white' : 'dodgerblue'
      }}
    >
      <NavList>
        {token ? (
          <>
            <NavItem>
              <StyledLink to="/home" style={{ color: loc === '/home' ? 'black' : (loc === '/form' || loc === '/404') ? 'white' : 'dodgerblue' }}>Home</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/recommend" style={{ color: loc === '/recommend' ? 'black' : (loc === '/form' || loc === '/404') ? 'white' : 'dodgerblue' }}>Recommendation</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/form" style={{ color: loc === '/form' ? 'black' : loc === '/404' ? 'white' : 'dodgerblue' }}>Style Profile</StyledLink>
            </NavItem>
            <NavItem>
              <LogoutButton onClick={handleLogout} style={{ color: (loc === '/form' || loc === '/404') ? 'white' : 'dodgerblue' }}>Logout</LogoutButton>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <StyledLink to="/login" style={{ color: loc === '/login' ? 'black' : 'dodgerblue' }}>Login</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/sign" style={{ color: loc === '/sign' ? 'black' : 'dodgerblue' }}>Sign Up</StyledLink>
            </NavItem>
          </>
        )}
      </NavList>
    </Nav>
  );
}

const Nav = styled.nav`
  background-color: #333;
  padding: 1rem;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-right: 1.5rem;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #ddd;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`;

export default Navbar;
