import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout';
import './custom.css';
import ItemDetails from './components/ItemDetails';
import ItemDelete from './components/ItemDelete';
import ItemUpdate from './components/ItemUpdate';
import ItemBook from './components/ItemBook';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
            return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
          })}

          { /* Adding routes based on the items ItemId */ }
          <Route path="/details/:itemId" element={<ItemDetails />} />
          <Route path="/delete/:itemId" element={<ItemDelete />} />
          <Route path="/update/:itemId" element={<ItemUpdate />} />
          <Route path="/book/:itemId" element={<ItemBook />} />
        </Routes>
      </Layout>
    );
  }
}
