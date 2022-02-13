import React, { Component, useEffect } from 'react';
import { Avatar, Button, Box, grommet, Grommet, Nav, Sidebar, Icons,
 TextInput,
 MaskedInput,
 Form, FormField,
 Text, Grid, Header, Anchor
} from 'grommet';
import {
    Analytics,
    Chat,
    Clock,
    Deliver,
    Configure,
    Help,
    Projects,
   StatusInfoSmall,
   Add
  } from 'grommet-icons';


const ViewShip = (props) => {
    const [value, setValue] = React.useState({});

    const dimensionFormatter = new Intl.NumberFormat('en-GB', {
      style: 'decimal',
      minimumFractionDigits: 2,
    });
    
    useEffect(() => {
      async function GetShipDetails(){
          const ship = await fetch(`/api/ship/${props.match.params.id}`)
          const shipJson = await ship.json();
          setValue(shipJson);
      }
      GetShipDetails();
    }, []);

   return (
    <Box>

      <Header background="light-4" pad="medium" height="xsmall">
        <Anchor
          href="/"
          icon={<Deliver color="brand" />}
          label="View Ship"
        />
      </Header>

      <Box pad="medium">
        <Form value={value} >
          <FormField name="name" htmlFor="name" label="Ship Name">
              <TextInput id="name" name="name" value={value.name} readOnly/>
          </FormField>

          <FormField name="width" htmlFor="width" label="width">
              <TextInput id="width" name="width"  value={value.width && dimensionFormatter.format(value.width)} />
          </FormField>

          <FormField name="length" htmlFor="length" label="length">
              <TextInput id="length" name="length" value={value.length && dimensionFormatter.format(value.length)} />
          </FormField>

          <FormField name="code" htmlFor="code" label="Code">
              <TextInput id="code" name="code" value={value.code} readOnly/>
          </FormField>
        </Form>
      </Box>
    </Box>
  );
};

export default ViewShip;