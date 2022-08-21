# 13.2 프로젝트 준비 및 기본 사용법 익히기

## 13.2.1 프로젝트 생성 및 라이브러리 설치

```shell

$ yarn create react-app router-tutorial

```

해당 프로젝트 디렉토리로 이동 후, react-router-dom 라이브러리 설치

```shell

$ cd router-tutorial

$ yarn add react-router-dom

```

</br>

## 13.2.2 프로젝트에 라우터 적용

프로젝트에 리액트 라우터를 적용할 때는 `<BrowserRouter>` 컴포넌트 이용.
이 컴포넌트는 웹 애플리케이션에 HTML5의 History API를 사용하여 페이지를 새로고침하지 않고도 주소를 변경하고, 현재 주소에 관련된 정보를 `props` 로 쉽게 조회하거나 사용할 수 있게 해준다.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

</br>

## 13.2.3 페이지 컴포넌트 만들기

라우트로 사용할 페이지 컴포넌트를 만들어 준다.

```jsx
import React from 'react';
const Home = () => {
  return (
    <div>
      <h2>홈</h2>
    </div>
  );
};
export default Home;
```

```jsx
import React from 'react';

const About = () => {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
};

export default About;
```

</br>

## 13.2.4 Route 컴포넌트로 특정 주소에 컴포넌트 연결

`Route` 컴포넌트를 사용하면 어떤 규칙을 가진 경로에 어떤 컴포넌트를 보여 줄지 정의할 수 있다.

```jsx
<Route path="주소 규칙" component={보여 줄 컴포넌트} />
```

```jsx
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, About } from '../pages/index';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
      </div>
    );
  }
}

export default App;
```

```jsx
class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
      </div>
    );
  }
}
```

-> `/about` 경로로 접속하면 `About` 컴포넌트만 표시되길 기대했지만, 예상과 달리 `Home` `About` 컴포넌트 모두 나타난다. `/about` 경로가 `/` 규칙에도 일치하기 때문이다.
`Home` 컴포넌트를 위한 `Route` 컴포넌트를 사용할 때 `exact`라는 `props` 를 `true` 로 설정하면 `About` 컴포넌트만 나타난다.

</br>

## 13.2.5 Link 컴포넌트를 사용하여 다른 주소로 이동하기

`Link` 컴포넌트: 클릭하면 다른 주소로 이동시켜 주는 컴포넌트.
일반 애플리케이션에서는 `<a>태그` 를 이용해 페이지를 전환하지만, 리액트 라우더 사용시에는 `<a>태그`를 직접 사용해서는 안된다. 이 태그는 페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 애플리케이션이 들고 있던 상태를 모두 날려버린다. 렌더링된 컴포넌트들도 모두 사라지고 처음부터 다시 렌더링하게 된다.

`Link`컴포넌트를 사용해 페이지를 전환하면, 페이지를 새로 불러오지 않고, 애플리케이션은 그대로 유지한 상태에서 `HTML5의 History API` 를 사용해 페이지의 주소만 변경한다.
`Link` 컴포넌트 자체는 `<a>` 태그로 이루어져 있지만, 페이지 전환을 방지하는 기능이 내장되어 있다.

```jsx
<Link to='주소'>내용</Link>
```

```jsx
import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>홈</Link>
        </li>
        <li>
          <Link to='/about'>소개</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path='/' component={Home} exact={true} />
        <Route path='/about' component={About} />
      </Switch>
    </div>
  );
};

export default App;
```

</br>

# 13.3 Route 하나에 여러 개의 path 설정하기

`path` props를 배열로 설정하면 여러 경로에서 같은 컴포넌트를 보여 줄 수 있다.

```jsx
import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>홈</Link>
        </li>
        <li>
          <Link to='/about'>소개</Link>
        </li>
      </ul>
      <hr />
      <Route path='/' component={Home} exact={true} />
      <Route path={['/about', '/info']} component={About} />
    </div>
  );
};

export default App;
```

</br>

# 13.4 URL 파라미터와 쿼리

페이지 주소를 정의할 때 가끔 유동적인 값을 전달해야 할 때도 있다.
이는 `파라미터`와 `쿼리`로 나눌 수 있다.

- **파라미터** : /profiles/velopert
      → 일반적으로 파라미터는 특정 id나 이름을 가지고 조회할 때 사용

- **쿼리** : /about?details=true
      → 쿼리의 경우엔 어떤 키워드를 검색하거나, 요청을 할 때 필요한 옵션을 전달할 때 사용

유동적인 값을 사용해야 하는 상황에서 파라미터를 써야 할지, 쿼리를 써야 할지 정할 때
무조건 따라야 하는 규칙은 없다. 다만 일반적으로 파라미터는 특정 아이디 혹은 이름을 사용하여 조회할 때 사용하고 쿼리는 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용한다.

## 13.4.1 URL 파라미터

ex) 'Profile' 페이지에서 파라미터를 사용하여 유동적으로 `username` 을 넣어 줄 때 해당 값을 `props`로 받아와서 조회.

```jsx
import React from 'react';

const data = {
  velopert: {
    name: '김민준',
    description: '리액트를 좋아하는 개발자',
  },
  gildong: {
    name: '홍길동',
    description: '전래동화 흥부전의 주인공',
  },
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
      <WithRouterSample />
    </div>
  );
};

export default Profile;
```

URL 파라미터를 사용할 때는 라우트로 사용되는 컴포넌트에서 받아 오는 `match`라는 객체 안의
`params` 값을 참조한다.
`match` 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 들어있다.
