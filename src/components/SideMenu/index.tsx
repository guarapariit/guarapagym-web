import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import Loader from 'react-loader-spinner';
import {
  FiUser,
  FiChevronDown,
  FiChevronUp,
  FiSettings,
  FiLogOut,
  FiX,
} from 'react-icons/fi';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

import { AuthContext } from '../../pages/contexts/AuthContext';
import api from '../../services/api';
import {
  Container,
  UserControls,
  Modal,
} from '../../styles/components/SideMenu';
import theme from '../../styles/theme';

function SideMenu() {
  const { user, logout, updateUserInfo } = useContext(AuthContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userNewAvatar, setuserNewAvatar] = useState<File>();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  function toggleUserMenu() {
    setIsUserMenuOpen(!isUserMenuOpen);
  }

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files[0];

    if (file) {
      setuserNewAvatar(file);
    }
  }

  function resetForm() {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    if (userNewAvatar) {
      const data = new FormData();

      data.append('avatar', userNewAvatar);

      await api.patch('/users/avatar', data);

      await updateUserInfo();
      setuserNewAvatar(null);

      NotificationManager.success('Salvo!', '', 3000);
    }

    if (currentPassword !== '') {
      if (newPassword === '' || confirmNewPassword == '') {
        NotificationManager.warning(
          'Atenção!',
          'Preencha todos os campos',
          3000,
        );

        setIsLoading(false);
        return;
      }

      if (newPassword !== confirmNewPassword) {
        NotificationManager.warning(
          'Atenção!',
          'Nova senha difere da confirmação',
          3000,
        );

        setIsLoading(false);
        return;
      }

      api
        .put('/profile', {
          old_password: currentPassword,
          password: newPassword,
        })
        .then(() => {
          NotificationManager.success('Salvo!', '', 3000);
        })
        .catch(error => {
          if (error.response.status) {
            NotificationManager.error('Senha Incorreta', '', 3000);
          }
        });
    }

    resetForm();
    setIsLoading(false);
  }

  return (
    <Container>
      <UserControls className={isUserMenuOpen ? 'active' : ''}>
        <figure>
          {user?.avatar_url ? (
            <img src={user?.avatar_url} />
          ) : (
            <FiUser size={28} color={theme.colors.white} />
          )}
        </figure>

        <div>
          <FiSettings
            size={22}
            color={theme.colors.white}
            onClick={toggleModal}
          />
          <FiLogOut size={22} color={theme.colors.white} onClick={logout} />
        </div>

        {isUserMenuOpen ? (
          <FiChevronUp
            size={28}
            color={theme.colors.white}
            onClick={toggleUserMenu}
          />
        ) : (
          <FiChevronDown
            size={28}
            color={theme.colors.white}
            onClick={toggleUserMenu}
          />
        )}
      </UserControls>
      <h3>{user?.name}</h3>
      <img src="/assets/guarapagym-logo-black.png" alt="" />
      <Modal className={isModalOpen ? 'open' : ''}>
        <form onSubmit={handleSubmit} ref={formRef}>
          <button
            className="close"
            onClick={e => {
              e.preventDefault();
              toggleModal();
            }}
          >
            <FiX />
          </button>
          <div className="top">
            <div>
              <h4>{user?.name}</h4>
              <h5>Trocar senha:</h5>
              <div className="input-container">
                <span>Senha atual</span>
                <input
                  type="text"
                  name="current-password"
                  value={currentPassword}
                  onChange={e => {
                    setCurrentPassword(e.target.value);
                  }}
                />
              </div>

              <div className="input-container">
                <span>Nova senha</span>
                <input
                  type="text"
                  name="new-password"
                  value={newPassword}
                  onChange={e => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>

              <div className="input-container">
                <span>Repetir senha</span>
                <input
                  type="text"
                  name="repeat-new-password"
                  value={confirmNewPassword}
                  onChange={e => {
                    setConfirmNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="avatar">
                {userNewAvatar ? (
                  <img src={URL.createObjectURL(userNewAvatar)} />
                ) : user?.avatar_url ? (
                  <img src={user?.avatar_url} />
                ) : (
                  <FiUser size={28} color={theme.colors.white} />
                )}
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={e => handleFileInputChange(e)}
              />
              <p>Trocar Imagem</p>
            </div>
          </div>
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
      </Modal>
      <NotificationContainer />
    </Container>
  );
}

export default SideMenu;
