import Head from 'next/head';
import { useState } from 'react';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';

import SideMenu from '../../components/SideMenu';
import { Container, ListsContainer, List } from '../../styles/pages/Menager';
import theme from '../../styles/theme';

function Manager() {
  const [isStudentSelectorOpen, setIsStudentSelectorOpen] = useState(false);
  const [isInstrutorSelectorOpen, setIsInstrutorSelectorOpen] = useState(false);

  const [studentSelectorSelected, setStudentSelectorSelected] = useState(
    'Ultimos editados',
  );
  const [InstrutorSelectorSelected, setInstrutorSelectorSelected] = useState(
    'Ultimos editados',
  );

  const selectorOptions = [
    'Últimos editados',
    'Tempo que foi editado',
    'Últimos cadastrados',
    'A - Z',
    'Z - A',
  ];

  function toggleIsStudentSelectorOpen() {
    setIsStudentSelectorOpen(!isStudentSelectorOpen);
  }

  function toggleIsInstrutorSelectorOpen() {
    setIsInstrutorSelectorOpen(!isInstrutorSelectorOpen);
  }

  return (
    <div>
      <Head>
        <title>Gerente | Guarapagym </title>
      </Head>

      <Container>
        <SideMenu />
        <ListsContainer>
          <List>
            <h2>Alunos</h2>
            <div>
              <div
                className={`selector ${isStudentSelectorOpen ? 'open' : ''}`}
              >
                <div className="selected" onClick={toggleIsStudentSelectorOpen}>
                  <span>{studentSelectorSelected}</span>
                  {isStudentSelectorOpen ? (
                    <FiChevronUp size={20} color={theme.colors.brown} />
                  ) : (
                    <FiChevronDown size={20} color={theme.colors.brown} />
                  )}
                </div>
                <ul className="to-select">
                  {selectorOptions.map((option, index) => {
                    return (
                      <li
                        key={index}
                        value={option}
                        onClick={() => {
                          setStudentSelectorSelected(option);
                          setIsStudentSelectorOpen(false);
                        }}
                      >
                        {option}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="search-container">
                <input type="text" name="search" />
                <button>
                  <FiSearch size={20} color={theme.colors.brown} />
                </button>
              </div>
            </div>
          </List>
          <List>
            <h2>Instrutores</h2>
            <div>
              <div
                className={`selector ${isInstrutorSelectorOpen ? 'open' : ''}`}
              >
                <div
                  className="selected"
                  onClick={toggleIsInstrutorSelectorOpen}
                >
                  <span>{InstrutorSelectorSelected}</span>
                  {isInstrutorSelectorOpen ? (
                    <FiChevronUp size={20} color={theme.colors.brown} />
                  ) : (
                    <FiChevronDown size={20} color={theme.colors.brown} />
                  )}
                </div>
                <ul className="to-select">
                  {selectorOptions.map((option, index) => {
                    return (
                      <li
                        key={index}
                        value={option}
                        onClick={() => {
                          setInstrutorSelectorSelected(option);
                          setIsInstrutorSelectorOpen(false);
                        }}
                      >
                        {option}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="search-container">
                <input type="text" name="search" />
                <button>
                  <FiSearch size={20} color={theme.colors.brown} />
                </button>
              </div>
            </div>
          </List>
        </ListsContainer>
      </Container>
    </div>
  );
}

export default Manager;
