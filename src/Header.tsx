import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { Anchor, Box, Image } from 'grommet';
import logo from './logo.png';
import invoicesRoutes from './invoices/routes';
import contactsRoutes from './contacts/routes';
import userRoutes from './user/routes';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

interface MenuItem {
  label: string,
  route: string,
  external?: boolean
}

interface NavBarProps {
  selectedRoute: string,
  push: (route: string) => void
}

const Header: FunctionComponent<NavBarProps> = (props) => {

  const { selectedRoute, push } = props;

  const mainMenuItems: MenuItem[] = [
    { label: 'Invoices', route: invoicesRoutes.index },
    { label: 'Contacts', route: contactsRoutes.index },
    { label: 'Logout', route: userRoutes.logout, external: true },
  ];

  return <Box
    justify="center"
    align="center"
    height="xsmall"
    fill="horizontal"
  >
    <Box
      direction="row"
      fill="vertical"
      align="center"
      justify="between"
      width="xlarge"
    >
      <Link label="Centrifuge" to="/" size="large">
        <Image src={logo}/>
      </Link>
      <Box direction="row" gap="small" fill align="center" justify="end">
        {mainMenuItems.map((item) => {
            const anchorProps = {
              ...(item.external ? { href: item.route } : { onClick: () => push(item.route) }),
              ...(selectedRoute === item.route ? { className: 'selected' } : {}),
            };
            return <Anchor
              key={item.label}
              label={item.label}
              {...anchorProps}
            />;
          },
        )}
      </Box>
    </Box>
  </Box>;
};

Header.displayName = 'Header';

const mapStateToProps = (state) => {
  return {
    selectedRoute: state.router.location.pathname,
  };
};
export default connect(
  mapStateToProps,
  { push },
)(Header);