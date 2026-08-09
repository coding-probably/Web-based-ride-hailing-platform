import { useState } from 'react'


import { Route, Router, Routes } from 'react-router-dom';
import Start from '../pages/Start';
import Home from '../pages/Home';
import UserLogin from '../pages/UserLogin';
import UserSignup from '../pages/UserSignup';
import CaptainLogin from '../pages/Captainlogin';
import CaptainSignup from '../pages/CaptainSignup';
import UserProtectWrapper from '../pages/UserProtectWrapper';
import UserLogout from '../pages/UserLogout';
import CaptainHome from '../pages/CaptainHome';
import CaptainProtectWrapper from '../pages/CaptainProtectWrapper';
import Riding from '../pages/Riding';
import CaptainRiding from '../pages/CaptainRiding';

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />

        <Route path='/home' element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />

        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />

        <Route path='/captain-home' element={
          <CaptainProtectWrapper>

            <CaptainHome />

          </CaptainProtectWrapper>} />


        <Route path='/captain-riding' element={<CaptainRiding />} />



      </Routes>

    </>
  )
}

export default App
