import React, { Component, useEffect } from 'react';
import { Avatar, Button, Box, grommet, Grommet, Nav, Sidebar, Icons,
 TextInput,
 MaskedInput,
 Form, FormField,
 Text
} from 'grommet';
import {
    Analytics,
    Chat,
    Clock,
    Configure,
    Help,
    Projects,
   StatusInfoSmall,
  } from 'grommet-icons';
  import ShipList from './ShipList';

const Home = (props) => {
  return (
    <Box>
      <ShipList />
    </Box>
  );
};

export default Home;
