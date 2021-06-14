import { GetServerSideProps, GetStaticPaths } from 'next';
import { parseCookies } from 'nookies';
import getApiClient from '../../../services/axios';

export default function UpdateStudent() {}

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

  const { slug } = ctx.params;
  const { data } = await apiClient.get('/student');

  return {
    props: {},
  };
};
