import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TransactionItem from './TransactionItem'

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/userTransaction/`);
        const data = await res.json();
        setTransactions(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const transactionItems = transactions.map((txn, idx) => (
    <TransactionItem key={idx} txn={txn} />
  ));

  return (
    <div>
      <container>{transactionItems}</container>
    </div>
  );
};


export default HomePage;
