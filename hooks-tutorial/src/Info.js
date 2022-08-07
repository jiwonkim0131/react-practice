import React, { useState } from 'react';

const Info = () => {
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');

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
