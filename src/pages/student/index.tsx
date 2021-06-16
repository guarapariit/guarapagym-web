import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import SideMenu from '../../components/SideMenu';
import TrainingListItem from '../../components/TrainingListItem';
import getApiClient from '../../services/axios';
import { Container, Content } from '../../styles/pages/Student';
import { DatedTraining, Training } from '../../types';
import spreadTrainingsInMonth from '../../utils/spreadTrainingsInMonth';
import { User } from '../contexts/AuthContext';

interface StudentProps {
  trainings: DatedTraining[];
}

const Student = ({ trainings }: StudentProps) => {
  return (
    <>
      <Head>
        <title>Dashboard | Guarapagym </title>
      </Head>

      <Container>
        <SideMenu />
        <Content>
          <h1>Próximos</h1>
          <ul>
            {trainings.map(training => (
              <TrainingListItem key={training.parsedDate} training={training} />
            ))}
          </ul>
        </Content>
      </Container>
    </>
  );
};

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

  const { ['guarapagym.user']: userStr } = parseCookies(ctx);
  const user = JSON.parse(userStr) as User;

  const apiClient = getApiClient(ctx);

  const { data: trainings } = await apiClient.get<Training[]>(
    '/students/trainings/me',
  );

  const datedTrainings = spreadTrainingsInMonth({
    trainings,
    studentAvailabilty: user.days,
  });

  return {
    props: {
      trainings: datedTrainings,
    },
  };
};

export default Student;
