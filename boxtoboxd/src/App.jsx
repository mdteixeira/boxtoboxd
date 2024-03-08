import React from 'react';
import Navbar from './components/Navbar';
import Perfil from './pages/Perfil';
import FloatButton from './components/FloatButton';
import Home from './pages/Home';
import ListRatings from './pages/ListRatings';

function App() {
  return (
    <>
      <Navbar />
      <FloatButton />
      {/* <Home /> */}
      {/* <Perfil /> */}
      <ListRatings />
    </>
  );
}

export default App;
