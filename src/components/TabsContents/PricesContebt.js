import React/*, { useContext }*/ from 'react';
import { Container } from 'semantic-ui-react'
// import { get } from 'lodash'
// import AppContext from '../../services/AppContext';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
    {name: '10.11', price: 1297.06},
    {name: '11.11', price: 1197.06},
    {name: '12.11', price: 1290},
    {name: '13.11', price: 1300},
    {name: '14.11', price: 1280.64},
    {name: '15.11', price: 1263.55},
];


const PricesContent = () => {
//   const { currentLangData } = useContext(AppContext);
    return (
      <Container>
        <LineChart width={550} height={400} data={data} margin={{ top: 25, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
      </Container>
    );
};

export default PricesContent;