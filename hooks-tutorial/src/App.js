import Info from './Info';
import { useState } from 'react';

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{visible ? '숨기기' : '보이기'}</button>
      {visible && <Info />}
    </div>
  );
};
export default App;
