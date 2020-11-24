import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as transactionActions from '../../store/transactionReducer';

function TransactionForm() {
  const dispatch = useDispatch();
  // const transactionBill = useSelector((state) => state.transaction.bill)
  const [cost, setCost] = useState(null)
  const [emails, setEmails] = useState('')
  const [reason, setReason] = useState('')
  const [errors, setErrors] = useState([])


  const handleSubmit = (e) => {
      e.preventDefault();
      if (cost && emails && reason) {
        setErrors([]);
        return dispatch(transactionActions.transactionCreation({ cost, emails, reason }))
          .catch(res => {
            if (res.data && res.data.errors) setErrors(res.data.errors);
          });
      }
      return setErrors(['Field\'s must be all filled out']);
  };


    return (
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Cost
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </label>
        <label>
          Users Emails
          <input
            type="search"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            required
          />
        </label>
        <label>
          Reason for split?
          <input
            type='text'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    )
  }



export default TransactionForm
