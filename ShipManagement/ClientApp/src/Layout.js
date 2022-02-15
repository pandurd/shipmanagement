import React from 'react';
import { useHistory } from "react-router-dom";
import { 
    Avatar,
    Button,
    Box,
    Nav,
    Main,
    Sidebar } 
from 'grommet';
import * as Icons from 'grommet-icons';

const Layout = (props) => {
  const history = useHistory();

  return(
    <Box direction="row" style={{ height: '100vh' }}>
      <Sidebar background="brand" 
        header={
          <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
        }
        footer={
          <Button icon={<Icons.Help />} hoverIndicator />
        }>
        <Nav gap="small" onClick={() => history.replace({ pathname: `/`})}>
          <Button icon={<Icons.Projects />} hoverIndicator />
        </Nav>
      </Sidebar>

      <Main>
        {props.children} 
      </Main>
    </Box>);
};

export default Layout




