// useCallback 실습
// useCallback을 사용해 함수를 새로 만들지 않고 재사용
import React, { useState, useMemo, useCallback } from 'react';

const getAverage = nums => {
  console.log('평균값 계산');
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
};

const NewAverage = () => {
  const [nums, setNums] = useState([]);
  const [number, setNumber] = useState('');
  const avg = useMemo(() => getAverage(nums), [nums]);

  const onChange = useCallback(({ target }) => setNumber(target.value), []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성
  const onClick = useCallback(() => {
    const nextNums = [...nums, +number];
    setNums(nextNums);
    setNumber('');
  }, [number, nums]); // number, nums 가 바뀔 때마다 함수 생성
  // 함수 내부에서 상태값에 의존해야하는 경우에는 반드시  그 값을 두 번째 파라미터에 포함시켜야 한다.
  // onChange의 경우 기존 값을 조회하지 않고 새로운 값을 설정만 하기 때문에 dependency 배열이 비어있어도 괜찮지만,
  // onClick의 경우 기존의 nums와 number를 조회해서 nextNums를 설정하기 때문에 dependency 배열에 nums와 number를 반드시 포함해야 한다.

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

export default NewAverage;
