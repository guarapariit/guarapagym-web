import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import {
  FiUser,
  FiChevronDown,
  FiChevronUp,
  FiSettings,
  FiLogOut,
  FiX,
} from 'react-icons/fi';

import { AuthContext } from '../../pages/contexts/AuthContext';
import {
  Container,
  UserControls,
  Modal,
} from '../../styles/components/SideMenu';
import theme from '../../styles/theme';

function SideMenu() {
  const { user, logout } = useContext(AuthContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  function toggleUserMenu() {
    setIsUserMenuOpen(!isUserMenuOpen);
  }

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <Container>
      <UserControls className={isUserMenuOpen ? 'active' : ''}>
        <figure>
          {user.avatar ? (
            <Image src={user.avatar} height={50} width={50} />
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
      <h3>{user.name}</h3>
      <img src="/assets/guarapagym-logo-black.png" alt="" />
      <Modal className={isModalOpen ? 'open' : ''}>
        <form>
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
              <h4>{user.name}</h4>
              <h5>Trocar senha:</h5>
              <div className="input-container">
                <span>Senha atual</span>
                <input type="text" name="current-password" />
              </div>

              <div className="input-container">
                <span>Nova senha</span>
                <input type="text" name="new-password" />
              </div>

              <div className="input-container">
                <span>Repetir senha</span>
                <input type="text" name="repeat-new-password" />
              </div>
            </div>
            <div>
              <figure>
                {user.avatar ? (
                  <Image src={user.avatar} height={50} width={50} />
                ) : (
                  <FiUser size={28} color={theme.colors.white} />
                )}
              </figure>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </Modal>
    </Container>
  );
}

export default SideMenu;
