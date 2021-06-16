import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import SideMenu from '../../../components/SideMenu';
import UsersList from '../../../components/UsersList';
import getApiClient from '../../../services/axios';
import { FiArrowRight } from 'react-icons/fi';

import { StudentI, Training } from '../../../types';
import {
  Container,
  ListsContainer,
  TrainingsList,
} from '../../../styles/pages/InstructorStudentTrainings';
import Link from 'next/link';
import { useState } from 'react';

interface ManagerProps {
  student: StudentI;
  trainings: Training[];
}

function Manager({ student, trainings }: ManagerProps) {
  const [trainingsList, setTrainingsList] = useState(trainings);

  return (
    <div>
      <Head>
        <title>Gerente | Guarapagym </title>
      </Head>

      <Container>
        <SideMenu />
        <ListsContainer>
          <div className="controls">
            <h2>Treinos</h2>
            <div className="user">
              <h2>{student.name}</h2>

              <figure>
                {student.avatar_url ? (
                  <img src={student.avatar_url} alt="" />
                ) : (
                  ''
                )}
              </figure>
            </div>
          </div>
          <TrainingsList>
            {trainingsList.map((trainging, index) => {
              return (
                <li>
                  <div className="top"></div>
                </li>
              );
            })}
          </TrainingsList>
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

  const { slug: id } = ctx.params;

  const { data: student } = await apiClient.get(`/students/${id}`);
  const { data: trainings } = await apiClient.get(`/students/${id}/trainings`);

  console.log(student);

  return {
    props: {
      student,
      trainings,
    },
  };
};

export default Manager;
