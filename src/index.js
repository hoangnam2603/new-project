import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import App from './App';
import Blog from './components/Blog/Blog/Blog';
import BlogDetail from './components/Blog/Blog-detail/BlogDetail';
import Loginn from './components/Login/Loginn';
import Home from './components/HomePg/Home';
import Account from './components/AccountPage/Account';
import MyProduct from './components/Myproduct/AddProduct';
import AddProductProduct from './components/Myproduct/AddProduct';
import AddProduct from './components/Myproduct/AddProduct';
import ImProduct from './components/Myproduct/ImProduct';
import EditProduct from './components/Myproduct/EditProduct';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <Router>
        <App>
          <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/login' element={<Loginn/>}/>
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/blog/detail/:id' element={<BlogDetail/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/add-product' element={<AddProduct/>} />
            <Route path='/my-product' element={<ImProduct/>}/>
            <Route path='/user/product/:id' element={<EditProduct/>} />
          </Routes>
        </App>
        
      </Router>
    
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
