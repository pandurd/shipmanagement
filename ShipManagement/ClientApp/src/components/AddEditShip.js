import React from 'react';
import {  Button,
    Box,
    TextInput,
    MaskedInput,
    Form,
    FormField,
    Text
} from 'grommet';


const AddEditShip = (props) => {
    const [value, setValue] = React.useState({...props.currentEditShip});

    //Add new ship
    const SubmitNewShip = async (ship) => {
        const requestOptions = {
            method: props.isAdd ? 'POST' : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ship)
        };

        fetch('/api/ship', requestOptions)
            .then(response => response.json())
            .then(() => {
                props.isAdd ? props.AddShipLocal(ship) : props.UpdateShipLocal(ship); 
                props.closeModal();
            });

    };
  
    return (
        <div>
            { props.isAdd ? 
                <Text size='large' weight="bolder" > Add Ship </Text>
                : <Text size='large' weight="bolder" >  Edit Ship </Text> }
            <Form
                value={value}
                onChange={nextValue => setValue(nextValue)}
                onReset={() => setValue({})}
                onSubmit={({ value }) => {  debugger; SubmitNewShip(value); }}
            >
                <FormField name="name" htmlFor="name" label="Ship Name">
                    <TextInput id="name" name="name" />
                </FormField>

                <FormField name="width" htmlFor="width" label="width">
                    <TextInput type='number' step='0.01' id="width" name="width" />
                </FormField>

                <FormField name="length" htmlFor="length" label="length">
                    <TextInput type='number' step='0.01' id="length" name="length" />
                </FormField>

                <FormField name="code" htmlFor="code" label="Code">
                    <MaskedInput id="code" name="code"                  
                        mask={[{
                            length: 4,
                            regexp: /^[a-zA-Z]+$/,
                            placeholder: 'AAAA'
                        },{
                            fixed: '-' 
                        },{
                            length: 4,
                            regexp: /^[0-9]+$/,
                            placeholder: '1111',
                        },{ 
                            fixed: '-'
                        },{
                            length: 1,
                            regexp: /^[a-zA-Z]+$/,
                            placeholder: 'A',
                        },{
                            length: 1,
                            regexp: /^[0-9]+$/,
                            placeholder: '1',
                        }]}
                        value={value.code}
                        onChange={(event) =>  {
                            setValue({...value, 'code' : event.target.value.toUpperCase()});
                            debugger;
                        }}
                    />
                    </FormField>
                    <Box direction="row" gap="medium">
                        <Button type="submit" primary label="Submit" />
                        <Button type="reset" label="Reset" />
                    </Box>
                </Form>
        </div>
    );
  };

  export default AddEditShip;