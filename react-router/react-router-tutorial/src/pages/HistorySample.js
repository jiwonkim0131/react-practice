import React from 'react';

const HistorySample = ({ history }) => {
  const goBack = () => {
    history.goBack();
  };
  const goHome = () => {
    console.log(history);
    history.push('/');
  };
  return (
    <div>
      <button onClick={goBack}>뒤로</button>
      <button onClick={goHome}>홈으로</button>
    </div>
  );
};

export default HistorySample;
