import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import * as sessionActions from './store/session';
import SignupFormPage from './components/SignUpForm/SignupFormPage';
import Navigation from './components/Navigation/Navigation'

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  )
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route element={<Layout />}>
      <Route path='/' element={<h1>Welcome!</h1>} />
      <Route path='/login' element={<LoginFormPage />} />
      <Route path='/signup' element={<SignupFormPage />} />
    </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;


