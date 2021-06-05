import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';
import Loader from 'react-loader-spinner';
import SideMenu from '../../../components/SideMenu';
import InputMask from 'react-input-mask';

import { Container, FormContainer } from '../../../styles/pages/new-instructor';
import theme from '../../../styles/theme';
import api from '../../../services/api';
import { Modal } from '../../../styles/pages/new-instructor';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';

const NewInstructor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      name,
      email,
      cpf,
      phone,
      password: cpf,
    };

    setIsLoading(true);

    api.post('/instructors', user).then(response => {
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

  return (
    <div>
      <Head>
        <title>Novo Instrutor | Guarapagym </title>
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
            <h1>Novo Instrutor</h1>
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
            <p>Instrutor cadastrado!</p>

            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Ok!
            </button>
            <span>A senha é o CPF</span>
          </div>
        </Modal>
      </Container>
    </div>
  );
};

export default NewInstructor;
