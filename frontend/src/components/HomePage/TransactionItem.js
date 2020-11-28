import React from 'react';

const TransactionItem = (props) => {
  const { amountOwed, reason, otherUser, type } = props.txn;
  const style = { border: '2px solid pink' };

  const isDebt = type === 'debt'
  return (
    <div style={style}>
      <div>
        <h2>
          {otherUser.firstName} {otherUser.lastName}
        </h2>
        <h3>
          {otherUser.email}
        </h3>
        <p>
          {reason}
        </p>
      </div>
      <div>
        {amountOwed}
      </div>
      <SwitchComponent value={ isDebt }>
        <h3>you owe</h3>
        <h3>you are owed</h3>
      </SwitchComponent>

    </div>
  );
};

const ConditionalShow = (props) => {
  const { show, children } = props;
  return show ? children : null;
};

const SwitchComponent = (props) => {
  const { value, children } = props;
  return value ? children[0] : children[1];
};

const User = (props) => {
  const { firstName, lastName, amountOwed, email } = props.user;
  return (
    <div>
      {firstName}, {lastName}, {amountOwed}, {email}{' '}
    </div>
  );
};

export default TransactionItem;
