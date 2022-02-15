import React from 'react';
import { Button,
    Box,
    Form,
    Text
} from 'grommet';

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
                <br/>
                <br/>
                <Text> Confirm Delete Ship ? </Text> 
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