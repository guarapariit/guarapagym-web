import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import SideMenu from '../../../components/SideMenu';
import InstructorExercisesList from '../../../components/InstructorExercisesList';
import getApiClient from '../../../services/axios';
import { FiArrowLeft } from 'react-icons/fi';

import { Category, ExerciseI, StudentI } from '../../../types';
import {
  Container,
  ListsContainer,
} from '../../../styles/pages/InstructorExercises';
import Link from 'next/link';
import React from 'react';

interface ManagerProps {
  exercises: ExerciseI[];
  categories: Category[];
}

function Manager({ exercises, categories }: ManagerProps) {
  return (
    <div>
      <Head>
        <title>Gerente | Guarapagym </title>
      </Head>

      <Container>
        <SideMenu />
        <ListsContainer>
          <div className="controls">
            <Link href="/instructor">
              <a>
                <FiArrowLeft size={28} />
              </a>
            </Link>
          </div>
          <div className="container">
            <InstructorExercisesList
              exercises={exercises}
              categories={categories}
            />

            <div className="list-wrapper">
              <h3>Categorias:</h3>
              <ul>
                <li className="list-item exercise"></li>
              </ul>
            </div>
          </div>
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

  const { data: exercises } = await apiClient.get('/exercises');
  const { data: categories } = await apiClient.get('/categories');

  console.log(exercises);

  return {
    props: {
      exercises,
      categories,
    },
  };
};

export default Manager;
