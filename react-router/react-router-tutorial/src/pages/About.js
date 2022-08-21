import React from 'react';
import qs from 'qs';

const About = ({ location }) => {
  // location 객체는 라우트로 사용된 컴포넌트에게 props로 전달된다.
  const query = qs.parse(location.search, { ignoreQueryPrefix: true }); // ignoreQueryPrefix 옵션으로 문자열 맨 앞의 ?를 생략한다.
  const showDetail = query.detail === 'true';

  return (
    <div>
      <h2>소개</h2>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트입니다.</p>
      {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
    </div>
  );
};

export default About;
