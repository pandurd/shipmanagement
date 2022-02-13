import React, { Component } from 'react';
import ShipList from './components/ShipList';
import Home from './components/Home';
import ShipView from './components/ShipView';
import { BrowserRouter, Route, Router, Switch, useHistory } from "react-router-dom";
import { Avatar, Button, Box,
    Stack,
    Text,
    Nav, Main,
    Sidebar } from 'grommet';
import {
    Analytics,
    Chat,
    Clock,
    Configure,
    Help,
    Projects,
    Split,
    StatusInfoSmall,
} from 'grommet-icons';

import * as Icons from 'grommet-icons';

const src = 'http://s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

const SidebarHeader = () => (
  <Box align="center" gap="small" direction="row" margin={{ bottom: 'large' }}>
      <Stack alignSelf="start" align="center" anchor="top-right">
        <Avatar src={src} />
        <Box pad="xsmall" background="orange" round responsive={false} />
      </Stack>
      <Text>John Doe</Text>
    </Box>
);

const SidebarButton = ({ icon, label, ...rest }) => (
  <Box pad="small">
    <Button
      gap="medium"
      alignSelf="start"
      plain
      icon={icon}
      label={label}
      {...rest}
    />
  </Box>
);

const SidebarFooter = () => (
  <Nav>
  </Nav>
);

const MainNavigation = () => (
  <Nav gap="large" responsive={false} height={{ min: '100%' }}>
    <SidebarButton icon={<Projects />} label="Ships" hoverIndicator />
  </Nav>
);



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




