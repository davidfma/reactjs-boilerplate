import { Outlet } from 'react-router-dom';
import { Page, Header, Footer, Button, Menu, Text, Anchor, Box } from 'grommet';
import { Home } from 'grommet-icons';
import { useState } from 'react';
import NavBar from '../../components/navbar';

export function Layout() {
  const [activate, setActivate] = useState(true);

  return (
    <Page kind="full" height="100vh">
      <Header background="light-3" pad="small">
        <Button icon={<Home />} hoverIndicator />
        <Menu label="account" items={[{ label: 'logout' }]} />
      </Header>

      <Box flex direction="row">
        <NavBar background="light-3" active={activate}>
          <Button
            primary
            label="teste"
            onClick={() => setActivate(!activate)}
          />
        </NavBar>
        <Outlet />
      </Box>
      <Footer background="light-3" pad="small">
        <Text>Copyright</Text>
        <Anchor label="About" />
      </Footer>
    </Page>
  );
}
