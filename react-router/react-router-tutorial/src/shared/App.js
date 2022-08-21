import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Home, About, Profile } from '../pages/index';

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
        <li>
          <Link to='/profile/velopert'>velopert 프로필</Link>
        </li>
        <li>
          <Link to='/profile/gildong'>gildong 프로필</Link>
        </li>
      </ul>
      <hr />
      <Route exact path='/' component={Home} />
      <Route path={['/about', '/info']} component={About} />
      <Route path='/profile/:username' component={Profile} />
    </div>
  );
};

export default App;
