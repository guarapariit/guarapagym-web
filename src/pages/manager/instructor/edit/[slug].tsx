import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Loader from 'react-loader-spinner';
import SideMenu from '../../../../components/SideMenu';
import InputMask from 'react-input-mask';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

import {
  Container,
  FormContainer,
} from '../../../../styles/pages/edit-instructor';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import getApiClient from '../../../../services/axios';

import api from '../../../../services/api';
import { Modal } from '../../../../styles/pages/new-instructor';
import { InstructorI } from '../../../../types';
import theme from '../../../../styles/theme';

interface EditInstructorProps {
  instructor: InstructorI;
}

function EditInstructor({ instructor }: EditInstructorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fillForm();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { id } = instructor;

    const user = {
      id,
      name: name + ' ' + lastName,
      email,
      cpf,
      phone,
    };

    if (!formIsFilled()) {
      NotificationManager.error(
        'Error message',
        'Preencha todos os Campos!',
        3000,
      );

      return;
    }

    api.put('/instructors', user).then(response => {
      console.log(response);
      setIsLoading(false);

      resetForm();
      setIsModalOpen(true);
    });
  }

  function resetForm() {
    formRef.current.reset();

    setName('');
    setLastName('');
    setEmail('');
    setCpf('');
    setPhone('');
  }

  function formIsFilled() {
    let isFormFilled = true;

    const toVerify = [name, lastName, email, cpf, phone];

    console.log('> call toVeirfy');

    toVerify.forEach(item => {
      if (item === '') isFormFilled = false;
    });

    return isFormFilled;
  }

  function fillForm() {
    const { name, email, cpf, phone } = instructor;
    const names = name.split(' ');
    const firstName = names[0];
    const fetchedLastName = names.splice(1, names.length).join(' ');

    console.log(fetchedLastName);

    setName(firstName);
    setLastName(fetchedLastName);
    setEmail(email);
    setCpf(cpf);
    setPhone(phone);
  }

  return (
    <div>
      <Head>
        <title>Editar Instrutor | Guarapagym </title>
      </Head>

      <Container>
        <SideMenu />
        <FormContainer>
          <Link href="/manager">
            <a className="back-button">
              <FiArrowLeft size="32" color={theme.colors.black} />
            </a>
          </Link>
          <form onSubmit={e => handleSubmit(e)} ref={formRef}>
            <h1>Editar Instrutor</h1>
            <h3>Infomações pessoais</h3>

            <fieldset>
              <div className="input-container">
                <span>Nome</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="input-container">
                <span>Sobrenome</span>
                <input
                  type="text"
                  name="last-name"
                  value={lastName}
                  onChange={e => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </fieldset>

            <div className="input-container">
              <span>Email</span>
              <input
                type="text"
                name="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <fieldset>
              <div className="input-container">
                <span>CPF</span>
                <InputMask
                  type="text"
                  name="cpf"
                  mask="999.999.999-99"
                  maskChar="0"
                  value={cpf}
                  onChange={e => {
                    setCpf(e.target.value);
                  }}
                />
              </div>

              <div className="input-container">
                <span>Telefone</span>
                <InputMask
                  type="text"
                  name="phone"
                  mask="(99) 99999-9999"
                  maskChar="0"
                  value={phone}
                  onChange={e => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </fieldset>

            <button type="submit">
              {isLoading ? (
                <Loader
                  type="Oval"
                  color={theme.colors.orange}
                  height={30}
                  width={30}
                />
              ) : (
                'Salvar'
              )}
            </button>
          </form>
        </FormContainer>
        <Modal className={isModalOpen ? 'open' : ''}>
          <div className="modal-container">
            <FiCheckCircle size={85} color={theme.colors.brown} />
            <p>Instrutor Editado!</p>

            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Ok!
            </button>
          </div>
        </Modal>
        <NotificationContainer />
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
  const { data: instructor } = await apiClient.get(`/instructors/${id}`);

  return {
    props: {
      instructor,
    },
  };
};

export default EditInstructor;
