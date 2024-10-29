import './App.css';

import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';

function App(props) {
  return (
    <>
    <Header />
      {props.children}
    <Footer/>
    </>
  );
}

export default App;
