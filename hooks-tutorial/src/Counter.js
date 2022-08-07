// useState 실습

import React, { useState } from 'react';

const Counter = () => {
  const [number, setNumber] = useState(0); // useState의 인자로는 초기값을 설정해준다.

  return (
    <div>
      <p>현재 값은{number}입니다.</p>
      <button onClick={() => setNumber(number + 1)}>+1</button>
      <button onClick={() => setNumber(number - 1)}>-1</button>
    </div>
  );
};

export default Counter;
