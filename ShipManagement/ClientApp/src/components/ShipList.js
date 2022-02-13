import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, DataTable, Meter, Text, Button, Layer, Grid, Header, Anchor } from 'grommet';
import { Add, Edit, Trash } from 'grommet-icons';
import AddEditShip from './AddEditShip';
import DeleteShip from './DeleteShip';
import { Deliver } from 'grommet-icons';

const dimensionFormatter = new Intl.NumberFormat('en-GB', {
  style: 'decimal',
  minimumFractionDigits: 2,
});

const ShipList = () => {
  const [currentShips, setCurrentShips] = React.useState([]);
  const [currentEditShip, setCurrentEditShip] = React.useState({});
  const [showAdd, setShowAdd] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);

  const columns = [
    {
      property: 'name',
      header: <Text>Name</Text>,
      primary: true,
    },
    {
      property: 'length',
      header: 'Length (in meters)',
      render: (datum) => dimensionFormatter.format(datum.length),
      align: 'end',
    },
    {
      property: 'width',
      header: 'Width (in meters)',
      render: (datum) => dimensionFormatter.format(datum.width),
      align: 'end',
    },
    {
      property: 'code',
      header: 'Code',
    },
    {
      header: '',
      render: (datum) => <Box onClick={() => showShipView(datum.id)}  pad="small" direction="row" align="center" gap="small">
        <Edit />
        <Text>View</Text>
      </Box>,
      sortable: false,
    },
    {
      header: '',
      render: (datum) => <Box onClick={() => showEditForm(datum.id)}  pad="small" direction="row" align="center" gap="small">
        <Edit />
        <Text>Edit</Text>
      </Box>,
      sortable: false,
    },
    {
      header: '',
      render: (datum) => <Box onClick={() => showDeleteForm(datum.id)}  pad="small" direction="row" align="center" gap="small">
        <Trash />
        <Text>Delete</Text>
      </Box>,
      sortable: false
    },
  ];
  
  const history = useHistory()

  useEffect(() => {
    async function fetchShips() {
        const res = await fetch('/api/ship');
        setCurrentShips(await res.json());
      };
      fetchShips();
  }, []);

  const AddShipLocal = (ship) => {
    const existingShips = JSON.parse(JSON.stringify(currentShips));
    const updatedShips = [...existingShips, ship];
    setCurrentShips(updatedShips);
    setCurrentEditShip({});
  }

  const UpdateShipLocal = (ship) => {
    const existingShips = JSON.parse(JSON.stringify(currentShips));
    const index = existingShips.findIndex(x => x.id == currentEditShip.id);
    existingShips[index] = ship;
    setCurrentShips(existingShips);
    setCurrentEditShip({});
  }

  const deleteShip = (ship) => {
    const existingShips = JSON.parse(JSON.stringify(currentShips));
    const index = existingShips.findIndex(x => x.id == currentEditShip.id);
    existingShips.splice(index, 1);
    setCurrentShips(existingShips);
    setCurrentEditShip({});
  }

  const showAddForm = () => {
    setShowAdd(true);
  }
  
  const showEditForm = (id) => {
    const existingShips = JSON.parse(JSON.stringify(currentShips));
    setCurrentEditShip(existingShips.find(x => x.id === id));
    setShowEdit(true);
  }

  const showShipView = (id) => {
    history.replace({ pathname: `/view/${id}`})
    //window.history.replaceState(null, "View Ship", `/view/${id}`)
  }
  
  const showDeleteForm = (id) => {
    const existingShips = JSON.parse(JSON.stringify(currentShips));
    setCurrentEditShip(existingShips.find(x => x.id === id));
    setShowDelete(true);
  }

  const closeAddEditModal = () => {
    setShowAdd(false);
    setShowEdit(false);
    setShowDelete(false);
  }
  

  return (
    <Box >

      <Header background="light-4" pad="medium" height="xsmall">
        <Anchor
          href="/"
          icon={<Deliver color="brand" />}
          label="Ship Management"
        />
      </Header>

    <Box pad="medium">
      <Grid columns={['xsmall']} >
        <Box background={'orange'} pad="small" direction="row" align="center" gap="small" onClick={() => showAddForm()}>
          <Add />
          <Text>Add</Text>
        </Box>
      </Grid>

      <DataTable
        columns={columns}
        data={currentShips}
        sortable
        step={10}
        paginate
      />

      { ( showAdd || showEdit ) && (
              <Layer
                onEsc={() => closeAddEditModal()}
                onClickOutside={() => closeAddEditModal()}
              >
                <Grid columns={['medium']} >
                  <Box pad="small" direction="row" align="center" gap="small" >
                    <AddEditShip 
                      UpdateShipLocal={UpdateShipLocal} 
                      currentEditShip={currentEditShip} 
                      isUpdate={showEdit} 
                      isAdd={showAdd}
                      AddShipLocal={AddShipLocal} 
                      closeModal={closeAddEditModal} />
                  </Box>
                </Grid>
                  
               
              </Layer>
            )}


      { showDelete && (
              <Layer
                onEsc={() => closeAddEditModal()}
                onClickOutside={() => closeAddEditModal()}
              >
                <Grid columns={['medium']} >
                  <Box pad="small" direction="row" align="center" gap="small" >
                    <DeleteShip 
                      deleteShip={deleteShip} 
                      closeModal={closeAddEditModal}
                      currentEditShip={currentEditShip}  />
                  </Box>
                </Grid>
                  
               
              </Layer>
            )}
      </Box>
    </Box>
  );
};

export default ShipList;