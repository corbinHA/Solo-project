import { fetch } from './csrf'

const ADD_TRANSACTION = 'ADD_TRANSACTION'

const addTransaction = (bill) => {
  return {
    type: ADD_TRANSACTION,
    bill,
  }
}

export const transactionCreation = (bill) => async (dispatch) => {
  const { cost, emails, reason } = bill;
  const res = await fetch('/api/transaction/create', {
    method: 'POST',
    body: JSON.stringify({
      cost,
      emails,
      reason,
    }),
  });
  console.log(res.data)
  dispatch(addTransaction(res.data));
  return res;
}

const initialState = { bill: [] }

const transactionReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case ADD_TRANSACTION:
      return {...state, bill: [...state.bill, action.bill]};
    default:
      return state;
  }
}
export default transactionReducer
