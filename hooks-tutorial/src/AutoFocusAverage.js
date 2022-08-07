// useRef 실습
// useRef를 사용해 input요소에 focus주기
import React, { useState, useMemo, useCallback, useRef } from 'react';

const getAverage = nums => {
  console.log('평균값 계산');
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
};

const AutoFocusAverage = () => {
  const [nums, setNums] = useState([]);
  const [number, setNumber] = useState('');
  const avg = useMemo(() => getAverage(nums), [nums]);
  const inputEl = useRef(null);

  const onChange = useCallback(({ target }) => setNumber(target.value), []);
  const onClick = useCallback(() => {
    const nextNums = [...nums, +number];
    setNums(nextNums);
    setNumber('');
    inputEl.current.focus(); // useRef를 통해 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킨다.
  }, [number, nums]);

  return (
    <div>
      <div>
        <input value={number} onChange={onChange} type='number' ref={inputEl} />
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

export default AutoFocusAverage;
