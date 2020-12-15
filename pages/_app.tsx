import React from 'react';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreProvider } from 'src/StoreProvider';
import { AppProps } from 'next/app';
import Header from 'src/components/layout/Header';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from 'src/components/layout/Footer';
import Sidebar from 'src/components/layout/Sidebar';
// import './App.scss';

const MyApp = ({ Component, pageProps }:AppProps) => {
  return (
    <StoreProvider>
      <Header />
      <Container fluid>
        <Row>
          <Col xs={3} id="sidebar-wrapper">
            <Sidebar />
          </Col>
          <Col xs={9}>
            <Row className="mt-5 ml-3">
              <Component {...pageProps} />
            </Row>
          </Col>
        </Row>

        <Footer />
      </Container>
    </StoreProvider>
  );
};

export default MyApp;
