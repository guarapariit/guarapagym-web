import Head from 'next/head';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { FiArrowLeft, FiCheckCircle, FiUser } from 'react-icons/fi';
import SideMenu from '../../../../components/SideMenu';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import api from '../../../../services/api';
import InputMask from 'react-input-mask';
import Loader from 'react-loader-spinner';
import { InstructorI, StudentI } from '../../../../types';

import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

import {
  Container,
  FormContainer,
  Modal,
} from '../../../../styles/pages/new-student';

import theme from '../../../../styles/theme';
import getApiClient from '../../../../services/axios';
import { useEffect } from 'react';

interface EditStudentProps {
  instructors: InstructorI[];
  student: StudentI;
}

function NewStudent({ student, instructors }: EditStudentProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const days = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sabado',
  ];

  useEffect(() => {
    fillForm();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      id: student.id,
      name: name + ' ' + lastName,
      email,
      cpf,
      phone,
      instructor_id: selectedInstructor,
      days: selectedDays.map(day => days.findIndex(day2 => day === day2)),
    };

    console.log(user);

    if (!formIsFilled()) {
      NotificationManager.error(
        'Error message',
        'Preencha todos os Campos!',
        3000,
      );

      return;
    }

    setIsLoading(true);

    api
      .put('/students', user)
      .then(response => {
        console.log(response);

        resetForm();
        setIsModalOpen(true);
      })
      .catch(error => {
        if (error.response.data.message === 'Email address already used.') {
          NotificationManager.error('Warning message', 'Email em uso', 3000);
        } else {
          NotificationManager.error('Warning message', 'Algo deu errado', 3000);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function resetForm() {
    formRef.current.reset();

    setName('');
    setLastName('');
    setEmail('');
    setCpf('');
    setPhone('');
    setSelectedInstructor('');
    setSelectedDays([]);
  }

  function formIsFilled() {
    let isFormFilled = true;

    const toVerify = [
      name,
      lastName,
      email,
      cpf,
      phone,
      selectedInstructor,
      selectedDays,
    ];

    console.log('> call toVeirfy');

    toVerify.forEach(item => {
      if (item === '') isFormFilled = false;
    });

    return isFormFilled;
  }

  function toggleDayOfWeek(day: string) {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(day2 => day !== day2));

      return;
    }

    setSelectedDays([...selectedDays, day]);
  }

  function fillForm() {
    const {
      name,
      email,
      cpf,
      phone,
      days: studentDays,
      instructor_id,
    } = student;
    const names = name.split(' ');
    const firstName = names[0];
    const fetchedLastName = names.splice(1, names.length).join(' ');

    console.log(fetchedLastName);

    setName(firstName);
    setLastName(fetchedLastName);
    setEmail(email);
    setCpf(cpf);
    setPhone(phone);
    setSelectedDays(studentDays.map(studentDay => days[studentDay]));
    setSelectedInstructor(instructor_id);
  }

  return (
    <div>
      <Head>
        <title>Gerente | Guarapagym </title>
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
            <h1>Novo Aluno</h1>
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
            <h3>Infomações pessoais</h3>

            <fieldset className="days-of-week">
              {days.map((day, index) => {
                return (
                  <div
                    key={index}
                    className={selectedDays.includes(day) ? 'selected' : null}
                    onClick={() => {
                      toggleDayOfWeek(day);
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </fieldset>

            <fieldset className="instructors">
              {instructors.map(instructor => {
                return (
                  <div key={instructor.id} className="card">
                    <figure>
                      {instructor.avatar_url ? (
                        <Image
                          src={instructor.avatar_url}
                          height={50}
                          width={50}
                        />
                      ) : (
                        <FiUser size={28} color={theme.colors.black} />
                      )}
                    </figure>
                    <div>
                      <h4>{instructor.name}</h4>
                      {selectedInstructor === instructor.id ? (
                        <button
                          type="button"
                          className="selected"
                          onClick={e => {
                            e.preventDefault();
                            setSelectedInstructor(instructor.id);
                          }}
                        >
                          Selecionado
                          <FiCheckCircle color={theme.colors.white} size={14} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={e => {
                            e.preventDefault();
                            setSelectedInstructor(instructor.id);
                          }}
                        >
                          Selecionar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
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
            <p>Aluno Editado!</p>

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
  const { data: student } = await apiClient.get(`/students/${id}`);
  const { data: instructors } = await apiClient.get(`/instructors`);

  return {
    props: {
      student,
      instructors,
    },
  };
};

export default NewStudent;
