import React from 'react';
import Header from './component/header/header';
// import Page from './page';
import Footer from './component/footer/footer';
import Routes from './routes';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
