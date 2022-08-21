import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Home, About } from '../pages/index';

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
      <Route exact path='/' component={Home} />
      <Route exact path={['/about', '/info']} component={About} />
    </div>
  );
};

export default App;
