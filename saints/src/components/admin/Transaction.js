import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pagination } from 'antd';
import SearchIcon from '@mui/icons-material/Search';

const Transaction = () => {
  const [transactions, setAllTransaction] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(15);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/api/v1/payment/orders');
      setAllTransaction(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredTransactions = transactions.filter((transaction) =>
      transaction.receipt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAllTransaction(filteredTransactions);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchData(); // Reload original transactions
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='mainDiv'>
      <div className='TransDiv'>
        <h1>Transaction Data</h1>
        <div style={{ marginBottom: '35px' }}>
          <form style={{ display: 'flex', position: 'relative', right: 0 }}>
            <input
              style={{ margin: 0, height: '2.4vmax', width: '18vmax' }}
              placeholder='Enter Receipt'
              value={searchTerm}
              onChange={handleInputChange}
            />
            <Button
              type='button'
              style={{
                backgroundColor: 'gray',
                color: 'whitesmoke',
                width: '60px',
                margin: 0,
                marginLeft: '5px',
              }}
              onClick={handleSearch}
            >
              <SearchIcon />
            </Button>
            <Button
              type='button'
              style={{
                backgroundColor: 'gray',
                color: 'whitesmoke',
                width: '90px',
                margin: 0,
                marginLeft: '5px',
              }}
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Amount Due</th>
              <th>Amount Paid</th>
              <th>Attempts</th>
              <th>Created At</th>
              <th>Currency</th>
              <th>Entity</th>
              <th>ID</th>
              <th>Receipt</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.amount_due}</td>
                <td>{transaction.amount_paid}</td>
                <td>{transaction.attempts}</td>
                <td>{transaction.created_at}</td>
                <td>{transaction.currency}</td>
                <td>{transaction.entity}</td>
                <td>{transaction.id}</td>
                <td>{transaction.receipt}</td>
                <td>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          current={currentPage}
          pageSize={transactionsPerPage}
          total={transactions.length}
          onChange={paginate}
          style={{ marginTop: '20px' }}
        />
      </div>
    </div>
  );
};

export default Transaction;
