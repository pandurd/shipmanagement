import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './components/Home';
import ShipView from './components/ShipView';
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
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/view/:id' component={ShipView}  />
        </Layout>
  </Grommet>
);

export default App;




