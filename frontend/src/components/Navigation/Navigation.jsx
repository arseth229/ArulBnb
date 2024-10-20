import { NavLink } from "react-router-dom";
import {useSelector} from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";


function Navigation({isLoaded}) {
    const sessionUser = useSelector((state) => state.session.user);

    const sessionLinks = sessionUser ? (
    <>
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    </>
  ) : (
    <>
      <li>
        <OpenModalButton 
        modalComponent={<LoginFormModal />}
        buttonText={'Log In'}
        />
      </li>
      <li>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    </>
  );


    return (
        <>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                {isLoaded && sessionLinks}
            </ul>
        </>
    )
}

export default Navigation;