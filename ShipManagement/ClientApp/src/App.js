import React from 'react';
import { Route } from 'react-router';
import Home from './components/Home';
import ShipView from './components/ShipView';
import Layout from './Layout';

import { grommet, Grommet } from 'grommet';

import './custom.css';

const App = props => (
  <Grommet theme={grommet} >
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/view/:id' component={ShipView}  />
        </Layout>
  </Grommet>
);

export default App;




