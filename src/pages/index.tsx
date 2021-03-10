import React from 'react';
import Head from 'next/head';

import guarapagymLogo from '../assets/guarapagym-logo.png';

import { Container } from '../styles/pages/Home';

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>
      <div>
        <img src={guarapagymLogo} alt="" />
        <span>
          Eleve suas habilidades para o próximo nível com a{' '}
          <strong>Guarapagym</strong>
        </span>
      </div>
    </Container>
  );
};

export default Home;
