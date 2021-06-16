import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import SideMenu from '../../components/SideMenu';
import UsersList from '../../components/UsersList';
import getApiClient from '../../services/axios';
import { FiArrowRight } from 'react-icons/fi';

import { StudentI } from '../../types';
import { Container, ListsContainer } from '../../styles/pages/Instructor';
import Link from 'next/link';

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
          <div className="controls">
            <h2>Alunos</h2>
            <Link href="/instructor/exercises">
              <a>
                Exercicios <FiArrowRight />{' '}
              </a>
            </Link>
          </div>
          <UsersList
            users={students}
            title=""
            linkTo="/instructor/student"
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
