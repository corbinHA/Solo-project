import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import styled from 'styled-components';
import './Navigation.css'

const Button = styled.button`
  display: inline-block;
   padding: 0.35em 1.2em;
   border: 0.1em solid #ffffff;
   margin: 0 0.3em 0.3em 0;
  background-color: black;
   border-radius: 0.12em;
   box-sizing: border-box;
   text-decoration: none;
   font-family: 'Roboto', sans-serif;
   font-weight: 300;
   color: #ffffff;
   text-align: center;
   transition: all 0.2s;
    display: block;
    margin: 0.4em;
  &:hover {
    color: #000000;
     background-color: grey;
  }
`;


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <Button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </Button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>${user.balance}</li>
          <li>
            <Button onClick={logout}>Log Out</Button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
