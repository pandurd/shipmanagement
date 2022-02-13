import React, { useEffect } from 'react';

import { Box, DataTable, Meter, Text } from 'grommet';

const dimensionFormatter = new Intl.NumberFormat('en-GB', {
  style: 'decimal',
  minimumFractionDigits: 2,
});

const columns = [
  {
    property: 'name',
    header: <Text>Name</Text>,
    primary: true,
  },
  {
    property: 'id',
    header: 'ID',
  },
  {
    property: 'length',
    header: 'Length',
    render: (datum) => dimensionFormatter.format(datum.length),
    align: 'end',
  },
  {
    property: 'width',
    header: 'width',
    render: (datum) => dimensionFormatter.format(datum.width),
    align: 'end',
  },
  {
    property: 'code',
    header: 'Code',
    align: 'end',
  },
];

// const locations = ['Boise', 'Fort Collins', 'Bay Area', 'Houston'];

// const data = [];

// for (let i = 0; i < 40; i += 1) {
//   data.push({
//     name: `Name ${i + 1}`,
//     location: locations[i % locations.length],
//     date: `2018-07-${(i % 30) + 1}`,
//     percent: (i % 11) * 10,
//     paid: ((i + 1) * 17) % 1000,
//   });
// }

// const DATA = [
//   {
//     name: 'Shimi',
//     location: '',
//     date: '',
//     percent: 0,
//     paid: 0,
//   },
//   {
//     name: 'Bryan',
//     location: 'Fort Collins',
//     date: '2018-06-10',
//     percent: 30,
//     paid: 1234,
//   },
//   {
//     name: 'Chris',
//     location: 'Bay Area',
//     date: '2018-06-09',
//     percent: 40,
//     paid: 2345,
//   },
//   {
//     name: 'Eric',
//     location: 'Bay Area',
//     date: '2018-06-11',
//     percent: 80,
//     paid: 3456,
//   },
//   {
//     name: 'Matt',
//     location: 'Fort Collins',
//     date: '2018-06-10',
//     percent: 60,
//     paid: 1234,
//   },
//   {
//     name: 'Taylor',
//     location: 'Bay Area',
//     date: '2018-06-09',
//     percent: 40,
//     paid: 3456,
//   },
//   {
//     name: 'Mike',
//     location: 'Boise',
//     date: '2018-06-11',
//     percent: 50,
//     paid: 1234,
//   },
//   {
//     name: 'Ian',
//     location: 'Houston',
//     date: '2018-06-10',
//     percent: 10,
//     paid: 2345,
//   },
// ];

export const Paginated = () => {
  const [select, setSelect] = React.useState([]);
  const [currentShips, setCurrentShips] = React.useState([]);

  useEffect(() => {
    async function fetchShips() {
        const res = await fetch('/api/ship');
        setCurrentShips(await res.json());
      };
      fetchShips();
  }, []);

  return (
    <Box pad="large">
      <DataTable
        columns={columns}
        data={currentShips}
        sortable
        step={10}
        paginate
      />
    </Box>
  );
};

export default {
  title: 'Visualizations/DataTable/Paginated',
};