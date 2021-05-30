import React, { useCallback, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import Head from 'next/head';
import Link from 'next/Link';

import { Container, Title } from '../styles/pages/LandingPage';

const LandingPage: React.FC = () => {
  const [isRed, setIsRed] = useState(true);

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
        <Link href="/login">
          <a className="button">
            Entrar
            <FiArrowRight color="#F58426" size={48} />
          </a>
        </Link>
      </div>
      <p className="copy-right">Guarapari IT Ltda - Copyright 2021</p>
    </Container>
  );
};

export default LandingPage;
