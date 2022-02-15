import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, DataTable, Text, Layer, Grid, Header, Anchor } from 'grommet';
import { Add, Edit, Trash } from 'grommet-icons';
import AddEditShip from './AddEditShip';
import DeleteShip from './DeleteShip';
import { Deliver } from 'grommet-icons';
import { Spinner, Pagination } from 'grommet';

import { DimensionFormatter } from './../helpers'

const ShipList = () => {
  const [totalShips, setTotalShips] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentShips, setCurrentShips] = React.useState([]);
  const [currentEditShip, setCurrentEditShip] = React.useState({});
  const [showAdd, setShowAdd] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(true);

  const columns = [
    {
      property: 'name',
      header: <Text>Name</Text>,
      primary: true,
    },
    {
      property: 'length',
      header: 'Length (in meters)',
      render: (datum) => DimensionFormatter.format(datum.length),
      align: 'end',
    },
    {
      property: 'width',
      header: 'Width (in meters)',
      render: (datum) => DimensionFormatter.format(datum.width),
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
  
  const history = useHistory();

  function sleep(time){
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async function fetchShips() {
    setShowLoader(true);

    const res = await fetch(`/api/ship?page=${currentPage}`);
    const jsonRes = await res.json();

    //not required, to simulate a long api call. sleeps for 3 seconds
    await sleep(3000);

    setCurrentShips(jsonRes.ships);
    setTotalShips(jsonRes.shipsCount);
    setShowLoader(false);  
  };

  useEffect(() => {
      fetchShips();
  }, [currentPage]);

  const AddShipLocal = (ship) => {
    const existingShips = JSON.parse(JSON.stringify(currentShips));
    const updatedShips = [...existingShips, ship];
    setCurrentShips(updatedShips);
    setCurrentEditShip({});
  }

  const UpdateShipLocal = (ship) => {
    const existingShips = JSON.parse(JSON.stringify(currentShips));
    const index = existingShips.findIndex(x => x.id === currentEditShip.id);
    existingShips[index] = ship;
    setCurrentShips(existingShips);
    setCurrentEditShip({});
  }

  const deleteShip = (ship) => {
    //const existingShips = JSON.parse(JSON.stringify(currentShips));
    //const index = existingShips.findIndex(x => x.id === currentEditShip.id);
    //existingShips.splice(index, 1);
    //setCurrentShips(existingShips);
    setCurrentEditShip({});
    
    //reload grid
    fetchShips();
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
    history.replace({ pathname: `/view/${id}`});
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

    { showLoader ?
      <Box className='load-spinner' >
        <Spinner size={"medium"} />
      </Box>

    :  <Box pad="medium">
      <Grid columns={['xsmall']} >
        <Box background={'brand'} pad="small" direction="row" align="center" gap="small" onClick={() => showAddForm()}>
          <Add />
          <Text>Add</Text>
        </Box>
      </Grid>

      <DataTable
        columns={columns}
        data={currentShips}
        step={10}
        paginate
      />

      <Box align="center" className='pagination'>
        <Pagination 
          page={currentPage}
          step={5}
          numberItems={totalShips} 
          onChange={({ page }) => setCurrentPage(page)}/>
      </Box>

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
      </Box> }
    </Box> 
  );
};

export default ShipList;