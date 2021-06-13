import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useState } from 'react';

import SideMenu from '../../components/SideMenu';
import getApiClient from '../../services/axios';

import { InstructorI, StudentI } from '../../types';

import { Container, ListsContainer } from '../../styles/pages/Menager';
import theme from '../../styles/theme';
import { useEffect } from 'react';
import { getSortedRoutes } from 'next/dist/next-server/lib/router/utils';
import UsersList from '../../components/UsersList';

interface ManagerProps {
  instructors: InstructorI[];
  students: StudentI[];
}

function Manager({ instructors, students }: ManagerProps) {
  return (
    <div>
      <Head>
        <title>Gerente | Guarapagym </title>
      </Head>

      <Container>
        <SideMenu />
        <ListsContainer>
          <UsersList
            users={students}
            title="Alunos"
            addLink="/manager/student"
          />
          <UsersList
            users={instructors}
            title="Instrutores"
            addLink="/manager/instructor"
          />
        </ListsContainer>
      </Container>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['guarapagym.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const apiClient = getApiClient(ctx);

  const { data: instructors } = await apiClient.get('/instructors');
  const { data: students } = await apiClient.get('/students');

  return {
    props: {
      instructors,
      students,
    },
  };
};

export default Manager;
