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
