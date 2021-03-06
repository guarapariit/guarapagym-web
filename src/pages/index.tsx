import React, { useCallback, useContext, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Container } from '../styles/pages/LandingPage';
import { AuthContext } from './contexts/AuthContext';

const LandingPage: React.FC = () => {
  const { isLoggedIn, user } = useContext(AuthContext);

  const router = useRouter();

  function handleLinkClick(e) {
    e.preventDefault();

    if (isLoggedIn) {
      router.push(`/${user.role_name}`);
    } else {
      router.push(`/login`);
    }
  }

  return (
    <Container>
      <Head>
        <title>Guarapagym</title>
      </Head>
      <div>
        <img src="/assets/guarapagym-logo.png" alt="" />
        <span>
          Eleve suas <br /> habilidades para o <br /> próximo nível com a <br />
          <strong>Guarapagym</strong>
        </span>
        <a className="button" onClick={handleLinkClick}>
          Entrar
          <FiArrowRight color="#F58426" size={48} />
        </a>
      </div>
      <p className="copy-right">Guarapari IT Ltda - Copyright 2021</p>
    </Container>
  );
};

export default LandingPage;
