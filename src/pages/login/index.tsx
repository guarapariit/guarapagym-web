import Head from 'next/head';
import { useContext, useRef, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useRouter } from 'next/router';
import theme from '../../styles/theme';
import Loader from 'react-loader-spinner';

import { Container } from '../../styles/pages/Login';
import validateEmail from '../../utils/validateEmail';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const {
    authUser,
    isLoggedIn,
    toggleIsRememberMeActive,
    isRememberMeActive,
  } = useContext(AuthContext);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      emailInputRef.current.focus();

      return;
    }

    if (password === '') {
      setIsPasswordValid(false);
      passwordInputRef.current.focus();

      return;
    }

    const data = await authUser(email, password, isRememberMeActive);

    console.log(data.user);

    if (data.auth) {
      router.push(`/${data.user.role_name}`);
    } else {
      if (data.status === 401) {
        resetForm();
        setMessage('Usuário ou senha invalidos');
      } else {
        setMessage('Um erro ocorreu');
      }
    }

    setIsLoading(false);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setIsEmailValid(true);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function resetForm() {
    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';

    emailInputRef.current.focus();
  }

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        <img src="/assets/guarapagym-logo-black.png" />
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Fazer Login</h1>

        <div className="input-wrapper">
          <span>Email</span>
          <input
            type="text"
            name="email"
            value={email}
            ref={emailInputRef}
            className={`${isEmailValid || 'invalid'}`}
            onChange={e => handleEmailChange(e)}
          />
        </div>

        <div className="input-wrapper last">
          <span>Senha</span>
          <input
            type="password"
            name="email"
            value={password}
            ref={passwordInputRef}
            className={`${isPasswordValid || 'invalid'}`}
            onChange={e => handlePasswordChange(e)}
          />
        </div>

        <div
          className={`remember-me ${isRememberMeActive ? 'active' : ''}`}
          onClick={toggleIsRememberMeActive}
        >
          <div>{isRememberMeActive && <FiCheck />}</div>
          <span>Lembrar-me</span>
        </div>

        <button type="submit">
          {isLoading ? (
            <Loader
              type="Oval"
              color={theme.colors.orange}
              height={35}
              width={35}
            />
          ) : (
            'Entrar'
          )}
        </button>
        <span className="message">{message !== '' && message}</span>
      </form>
    </Container>
  );
};

export default Login;
