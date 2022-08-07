import React, { useReducer } from 'react';

const reducer = (state, { type }) => {
  switch (type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return 0;
    default:
      return state;
  }
};

const NewCounter = () => {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <p>현재 값은 {state}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
    </div>
  );
};

export default NewCounter;
