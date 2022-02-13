import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import Layout from  './Layout';

import { Avatar, Button, Box, grommet, Grommet, Nav, Sidebar, Icons } from 'grommet';
import {
    Analytics,
    Chat,
    Clock,
    Configure,
    Help,
    Projects,
    StatusInfoSmall,
} from 'grommet-icons';

const App = props => (
  <Grommet theme={grommet} >
    <Layout />
  </Grommet>
);

export default App;




