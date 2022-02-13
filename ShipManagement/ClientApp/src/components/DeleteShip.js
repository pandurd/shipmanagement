import React, { Component, useEffect } from 'react';
import { Avatar, Button, Box, grommet, Grommet, Nav, Sidebar, Icons,
 TextInput,
 MaskedInput,
 Form, FormField,
 Text} from 'grommet';
import {
    Analytics,
    Chat,
    Clock,
    Configure,
    Help,
    Projects,
   StatusInfoSmall,
  } from 'grommet-icons';

const DeleteShip = (props) => {

    //Add new ship
    const doDeleteShip = async () => {
        const requestOptions = {
            method:  'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(`/api/ship/${props.currentEditShip.id}`, requestOptions)
            .then(response => response.json())
            .then(() => {
                props.deleteShip(props.currentEditShip); 
                props.closeModal();
            });

    };
  
    return (
        <div>
            <Text size='large' weight="bolder" >  Delete Ship </Text> 
            <Form
                onSubmit={() => {  doDeleteShip(); }}
                onReset={() => props.closeModal()}
            >
                <Text> Confirm Delete ? </Text> 
                <Text> {props.currentEditShip.name} </Text>
                
                <br/>
                <br/>
                <br/>
                <Box direction="row" gap="medium">
                    <Button type="submit" primary label="Submit" />
                    <Button type="reset" label="Reset" />
                </Box>
           </Form>
        </div>
    );
  };

  export default DeleteShip;