import React, { useEffect } from 'react';
import { 
  Box, 
  TextInput,
  Form,
  FormField,
  Header,
  Anchor
} from 'grommet';
import { Deliver } from 'grommet-icons';

import { DimensionFormatter } from './../helpers'

const ViewShip = (props) => {
    const [value, setValue] = React.useState({});
    
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
        <Form >
          <FormField name="name" htmlFor="name" label="Ship Name">
              <TextInput data-testid="name" id="name" name="name" value={value.name} readOnly/>
          </FormField>

          <FormField name="width" htmlFor="width" label="width">
              <TextInput id="width" name="width"  value={value.width && DimensionFormatter.format(value.width)} readOnly/>
          </FormField>

          <FormField name="length" htmlFor="length" label="length">
              <TextInput id="length" name="length" value={value.length && DimensionFormatter.format(value.length)} readOnly/>
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