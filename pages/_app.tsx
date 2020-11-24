import React from 'react';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreProvider } from 'src/StoreProvider';
import { AppProps } from 'next/app';
import Header from 'src/components/layout/Header';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from 'src/components/layout/Footer';
// import './App.scss';

const MyApp = ({ Component, pageProps }:AppProps) => {
  return (
    <StoreProvider>
      <Container fluid>
        <Header />
        <Row className="mt-5">
          <Col sm={2} />
          <Col sm={8}>
            <Component {...pageProps} />
          </Col>
          <Col sm={2} />
        </Row>
        <Footer />
      </Container>
    </StoreProvider>
  );
};

export default MyApp;
