import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import {
  FiUser,
  FiChevronDown,
  FiChevronUp,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';

import { UserContext } from '../../pages/contexts/UserContext';
import { Container, UserControls } from '../../styles/components/SideMenu';
import theme from '../../styles/theme';

function SideMenu() {
  const { user } = useContext(UserContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  function toggleUserMenu() {
    setIsUserMenuOpen(!isUserMenuOpen);
  }

  return (
    <Container>
      <UserControls
        onClick={toggleUserMenu}
        className={isUserMenuOpen ? 'active' : ''}
      >
        <figure>
          {user.avatar ? (
            <Image src={user.avatar} height={50} width={50} />
          ) : (
            <FiUser size={28} color={theme.colors.white} />
          )}
        </figure>

        <div>
          <FiSettings size={22} color={theme.colors.white} />
          <FiLogOut size={22} color={theme.colors.white} />
        </div>

        {isUserMenuOpen ? (
          <FiChevronUp size={28} color={theme.colors.white} />
        ) : (
          <FiChevronDown size={28} color={theme.colors.white} />
        )}
      </UserControls>
      <h3>{user.name}</h3>
      <img src="/assets/guarapagym-logo-black.png" alt="" />
    </Container>
  );
}

export default SideMenu;
