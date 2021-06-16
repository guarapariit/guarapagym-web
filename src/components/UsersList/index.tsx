import { useEffect, useState } from 'react';
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiPlusCircle,
  FiUser,
  FiEdit,
  FiArrowRight,
} from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

import { List } from '../../styles/components/UsersList';
import theme from '../../styles/theme';
import { useRouter } from 'next/router';

interface User {
  id: string;
  name: string;
  cpf: string;
  avatar_url: string;
}

interface UsersListProps {
  users: User[];
  title: string;
  linkTo: string;
  hasAdd: boolean;
  addLink?: string;
  hasEdit: boolean;
  editLink?: string;
}

export default function UsersList({
  users,
  title,
  addLink,
  hasEdit,
  editLink,
  linkTo,
  hasAdd,
}: UsersListProps) {
  const [isUsersSelectorOpen, setIsUsersSelectorOpen] = useState(false);
  const [userSelectorSelected, setUsersSelectorSelected] = useState({
    name: 'Últimos editados',
    value: 'updated_at',
    reversed: false,
  });
  const [usersList, setUsersList] = useState(users);
  const [usersListSearchTerm, setUsersListSearchTerm] = useState('');

  const selectorOptions = [
    { name: 'Últimos editados', value: 'updated_at', reversed: true },
    {
      name: 'Tempo que foi editado',
      value: 'updated_at',
      reversed: false,
    },
    {
      name: 'Últimos cadastrados',
      value: 'created_at',
      reversed: false,
    },
    {
      name: 'Primiros cadastrados',
      value: 'created_at',
      reversed: true,
    },
    { name: 'A - Z', value: 'name', reversed: false },
    { name: 'Z - A', value: 'name', reversed: true },
  ];

  const router = useRouter();

  useEffect(() => {
    console.log('> studentsListSearchTerm');

    setUsersList(
      users.filter(student => {
        const { name, cpf } = student;

        const normalizedSearchTerm = usersListSearchTerm
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLocaleLowerCase();
        const normalizedStudentName = name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLocaleLowerCase();

        if (
          normalizedStudentName.includes(normalizedSearchTerm) ||
          cpf.includes(normalizedSearchTerm)
        ) {
          return true;
        }
        return false;
      }),
    );
  }, [usersListSearchTerm]);

  useEffect(() => {
    console.log('> studentsListOrderTerm');

    const { value, reversed } = userSelectorSelected;

    setUsersList(
      users.sort((a, b) => {
        console.log(value);
        console.log(a[value]);
        console.log(b[value]);

        if (a[value] < b[value]) {
          return -1;
        }
        if (a[value] > b[value]) {
          return 1;
        }
        return 0;
      }),
    );

    if (reversed) {
      setUsersList(users.reverse());
    }
  }, [userSelectorSelected]);

  function toggleIsUserselectorOpen() {
    setIsUsersSelectorOpen(!isUsersSelectorOpen);
  }

  function handleEditClick(e, userId) {
    e.preventDefault();

    router.push(`${editLink}/${userId}`);
  }

  return (
    <List>
      <h2>{title}</h2>
      <div>
        <div className={`selector ${isUsersSelectorOpen ? 'open' : ''}`}>
          <div className="selected" onClick={toggleIsUserselectorOpen}>
            <span>{userSelectorSelected.name}</span>
            {isUsersSelectorOpen ? (
              <FiChevronUp size={20} color={theme.colors.brown} />
            ) : (
              <FiChevronDown size={20} color={theme.colors.brown} />
            )}
          </div>
          <ul className="to-select">
            {selectorOptions.map((option, index) => {
              const { name } = option;

              return (
                <li
                  key={name}
                  onClick={() => {
                    setUsersSelectorSelected(option);
                    setIsUsersSelectorOpen(false);
                  }}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="search-container">
          <input
            type="text"
            name="search"
            value={usersListSearchTerm}
            onChange={e => setUsersListSearchTerm(e.target.value)}
          />
          <button>
            <FiSearch size={20} color={theme.colors.brown} />
          </button>
        </div>
      </div>
      <ul className="list">
        {usersList.map(user => {
          return (
            <Link key={user.id} href={`${linkTo}/${user.id}`}>
              <a>
                <li>
                  <figure>
                    {user.avatar_url ? (
                      <Image src={user.avatar_url} height={50} width={50} />
                    ) : (
                      <FiUser size={28} color={theme.colors.black} />
                    )}
                  </figure>
                  <div>
                    <h3>{user.name}</h3>
                    {hasEdit ? (
                      <button onClick={e => handleEditClick(e, user.id)}>
                        <FiEdit color={theme.colors.brown} size={25} />
                      </button>
                    ) : (
                      ''
                    )}
                    <button>
                      <FiArrowRight color={theme.colors.brown} size={30} />
                    </button>
                  </div>
                </li>
              </a>
            </Link>
          );
        })}
      </ul>
      {hasAdd ? (
        <Link href={addLink}>
          <a className="add-button">
            <span>Adicionar</span>
            <FiPlusCircle size={20} color={theme.colors.white} />
          </a>
        </Link>
      ) : (
        ''
      )}
    </List>
  );
}
