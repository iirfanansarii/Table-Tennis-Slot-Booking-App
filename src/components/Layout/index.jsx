import React from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
export default function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
