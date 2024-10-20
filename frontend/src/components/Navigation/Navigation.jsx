import { NavLink } from "react-router-dom";
import {useSelector} from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../SignUpModal/SignupFormModal";


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
        <OpenModalButton
        modalComponent={<SignupFormModal />}
        buttonText={'Sign Up'}
        />
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