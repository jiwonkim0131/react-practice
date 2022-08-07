// useMemo 실습
// useMemo를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있다.
import React, { useState, useMemo } from 'react';

const getAverage = nums => {
  console.log('평균값 계산');
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
};

const Average = () => {
  const [nums, setNums] = useState([]);
  const [number, setNumber] = useState('');
  const avg = useMemo(() => getAverage(nums), [nums]); //nums가 바뀌지 않았다면 이전값 사용

  const onChange = ({ target }) => setNumber(target.value);
  const onClick = () => {
    const nextNums = [...nums, +number];
    setNums(nextNums);
    setNumber('');
  };

  return (
    <div>
      <div>
        <input value={number} onChange={onChange} type='number' />
        <button onClick={onClick}>추가</button>
      </div>

      <ul>
        {nums.map((val, index) => (
          <li key={index}>{val}</li>
        ))}
      </ul>
      <p>평균값:{avg}</p>
    </div>
  );
};

export default Average;
