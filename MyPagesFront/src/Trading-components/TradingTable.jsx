import React from 'react';
import './TradingTable.css';
import { tableColumns } from './TableColumns';
import { tableData } from './TradingData'; 


const TradingTable = () => {
  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            {/* getting columns from TableColumns.jsx */}
            {tableColumns.map((columnName) => (
              <th key={columnName}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Add table rows with data here */}
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.picture} alt="Product" width="100" />
              </td>
              <td>{item.date}</td>
              <td>{item.name}</td>
              <td>{item.sizes}</td>
              <td>{item.exchangeRate}</td>
              <td>{item.quantity}</td>
              {/* ...render remaining table data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradingTable;
