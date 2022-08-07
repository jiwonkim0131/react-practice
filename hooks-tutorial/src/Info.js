//useState, useEffect 실습
import React, { useState, useEffect } from 'react';

const Info = () => {
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  useEffect(() => {
    // 1. useEffect 기본 : 컴포넌트가 렌더링 될 때마다 콘솔이 출력된다
    // console.log('렌더링이 완료되었습니다.');

    // 2. useEffect 마운트 될 때마 특정 함수 실행 : 두 번째 인자로 빈 배열 전달
    console.log('마운트 될 때만 실행');
  }, []);

  const onChangeName = ({ target }) => setName(target.value);
  const onChangeNickName = ({ target }) => setNickName(target.value);

  return (
    <div>
      <div>
        이름
        <input value={name} onChange={onChangeName} />
        닉네임
        <input value={nickName} onChange={onChangeNickName} />
      </div>
      <div>
        <p>이름:{name}</p>
        <p>닉네임:{nickName}</p>
      </div>
    </div>
  );
};

export default Info;
