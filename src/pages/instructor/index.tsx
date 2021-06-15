import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import SideMenu from '../../components/SideMenu';
import UsersList from '../../components/UsersList';
import getApiClient from '../../services/axios';

import { StudentI } from '../../types';
import { Container, ListsContainer } from '../../styles/pages/Instructor';

interface ManagerProps {
  students: StudentI[];
}

function Manager({ students }: ManagerProps) {
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
            linkTo="/manager/students"
            hasEdit={false}
            hasAdd={false}
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

  const { data: students } = await apiClient.get('/students/me');

  return {
    props: {
      students,
    },
  };
};

export default Manager;
