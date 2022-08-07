//useState, useEffect 실습
import React, { useState, useEffect } from 'react';

const Info = () => {
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  useEffect(() => {
    // 1. useEffect 기본 : 컴포넌트가 렌더링 될 때마다 콘솔이 출력된다
    // console.log('렌더링이 완료되었습니다.');
    // 2. useEffect 마운트 될 때마 특정 함수 실행 : 두 번째 인자로 빈 배열 전달
    // console.log('마운트 될 때만 실행');
    // 3. 특정 값이 업데이트 될 때만 실행 => 두 번째 인자의 배열로 검사하고 싶은 값을 추가한다
    console.log('특정 값이 업데이트 될 때만 실행: 이름 변경중');
    // 4. 뒷정리하기
    // 4.1 컴포넌트가 언마운트 되기 전이나 업데이트 되기 직전에 어떤 작업을 하고 싶다면 useEffect에서 clean up 함수를 반환한다.
    // clean up 함수 - 현재는 컴포넌트가 업데이트 될 때도 clean up 함수가 호출됨
    return () => {
      console.log('clean up');
    };
  }, [name]);

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
