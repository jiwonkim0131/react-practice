# [8장] Hooks

Hooks는 리액트 v16.8에 새로 도입된 기능으로 함수형 컴포넌트에서도 상태 관리를 할 수 있는 `useState`, 렌더링 직후 작업을 설정하는 `useEffect` 등의 기능을 제공하여 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있다.

---

### 참고

[18. useCallback 를 사용하여 함수 재사용하기](https://react.vlpt.us/basic/18-useCallback.html)

[Hooks API Reference - React](https://ko.reactjs.org/docs/hooks-reference.html#usecallback)

[Using the State Hook - React](https://ko.reactjs.org/docs/hooks-state.html)

- useState
- useEffect
- useMemo
- useCallback
- useReducer
- useRef

---

# 1. useState

- 함수형 컴포넌트에서도 **가변적인 상태**를 지닐 수 있게 해준다.

  → 함수형 컴포넌트에서 `상태 관리`가 필요할 때 사용한다.

```jsx
import React, { useState } from 'react';

const [value, setValue] = useState(0);

<button onClick={() => setValue(value + 1)}> + 1 </button>;
```

- `useState` 함수의 파라미터에는 **상태의 기본값**을 넣어준다.
- `useState`는 **배열을 반환**한다. 배열의 첫 번째 원소는 `상태 값`, 두 번째 원소는 `상태를 설정하는 함수`.
- 상태를 설정하는 함수(setValue)에 **파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고** 컴포넌트가 정상적으로 `리렌더링` 된다.

## 1.1 useState 여러 번 사용하기

- 하나의 `useState` 함수는 **하나의 상태 값만 관리**할 수 있다.

  → 컴포넌트에서 관리해야 할 상태 값이 여러 개라면 useState를 여러 번 사용해야 한다.

  ```jsx
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
  ```

---

# 2. useEffet

- `useEffect` 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook.
- 클래스형 컴포넌트의 `componentDidMount`와 `componentDidUpdate`를 합친 형태

  ```jsx

  import React, { useState, useEffect } from 'react';

  const Info = () => {
    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    useEffect(() => {
      // 1. useEffect 기본 : 컴포넌트가 렌더링 될 때마다 콘솔이 출력된다
      console.log('렌더링이 완료되었습니다.');
  	  });
    });

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
  ```

## 2.1 마운트 될 때만 실행하고 싶을 때

- `useEffect` 에서 설정한 함수를 컴포넌트가 처음 렌더링 될 때만 실행하고, 업데이트 될 때는 실행하지 않으려면 dependency 배열로 빈 배열을 설정한다.

  ```jsx
  useEffect(() => {
    console.log('마운트 될 때만 실행');
  }, []);
  ```

## 2.2 특정 값이 업데이트 될 때만 실행하고 싶을 때

- 특정 값이 업데이트 될 때만 `useEffect` 에 설정한 함수를 호출하려면 dependency 배열에 검사하고 싶은 값을 넣어준다.

  ```jsx
  useEffect(() => {
    console.log('name이 변경될 될 때만 실행');
  }, [name]);
  ```

## 2.3 뒷정리하기

- `useEffect` 는 기본적으로 렌더링 직후마다 실행됨.
- 컴포넌트가 언마운트되기 전이나 업데이트 직전에 함수를 호출하고 싶을 때 어떤 작업을 수행하고 싶다면, `useEffect` 에서 `clean up` 함수를 반환한다.

  ```jsx
  useEffect(() => {
    console.log('effect');
    console.log(name); // 업데이트 이후 name

    return () => {
      console.log('clean up');
      console.log(name); // 업데이트 되기 직전의 name
    };
  }, [name]);
  ```

  → 현재는 컴포넌트가 **업데이트 되기 직전**과 **언마운트 될 때** 모두 `clean up` 함수가 실행된다.

  ```jsx
  useEffect(() => {
    console.log('effect');

    return () => {
      console.log('clean up');
    };
  }, []); // dependency 배열로 빈배열을 설정하면 언마운트 될 때만 clean up 함수가 호출된다.
  ```

  → 오직 **언마운트 될 때만** `clean up` 함수가 호출된다.

---

# 3. useReducer

- `useReducer` 는 `useState` 보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트할 때 사용하는 Hook.
- `리듀서`: 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션값을 전달받아 새로운 상태를 반환하는 함수. 리듀서 함수에서 새로운 상태를 만들 때는 반드시 `불변성`을 지켜야한다.
- 리덕스의 액션 객체는 어떤 액션인지 알려주는 `type` 필드가 꼭 있어야 하지만, `useReducer` 에서 사용하는 액션 객체는 반드시 `type` 을 갖지 않아도 되며, 반드시 객체일 필요 없이 숫자나 문자열도 사용할 수 있다.

  ```jsx
  function reducer(state, action) {
  	return {...}
  }
  ```

- `useReducer` 의 첫 번째 파라미터에는 **리듀서 함수**를, 두 번째 파라미터에는 **해당 리듀서의 기본 값**을 넣는다.
- `useReducer` 함수는 `state`, `dispatch` 값을 반환한다.

  - state: 현재 가리키고 있는 상태
  - dispatch: 액션을 발생시키는 함수. `dispatch(action)` 와 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출되는 구조.

- `useReducer` 의 장점: 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다.

  ```jsx
  import React, { useReducer } from 'react';

  const reducer = (state, { type }) => {
    switch (type) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
      case 'reset':
        return 0;
      default:
        return state;
    }
  };

  const NewCounter = () => {
    const [state, dispatch] = useReducer(reducer, 0);

    return (
      <div>
        <p>현재 값은 {state}</p>
        <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      </div>
    );
  };

  export default NewCounter;
  ```

---

# 4. useMemo

```
💡 const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- `useMemo` 를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다.
- 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식.

  ```jsx
  // useMemo 실습
  // useMemo를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있다.
  import React, { useState, useMemo } from 'react';

  const getAverage = nums => {
    console.log('평균값 계산');
    if (!nums.length) return 0;
    return nums.reduce((a, b) => a + b, 0) / nums.length;
  };

  const Average = () => {
    const [nums, setNums] = useState([]);
    const [number, setNumber] = useState('');
    const avg = useMemo(() => getAverage(nums), [nums]); //nums가 바뀌지 않았다면 이전값 사용

    const onChange = ({ target }) => setNumber(target.value);
    const onClick = () => {
      const nextNums = [...nums, +number];
      setNums(nextNums);
      setNumber('');
    };

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

  export default Average;
  ```

---

# 5. useCallback

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

- `useMemo` 는 특정 결과값을 재사용 할 때 사용, `useCallback` 은 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 사용.
- 렌더링 성능 최적화를 위해 사용.
- 메모이제이션 된 콜백을 반환한다.
- `useCallback(fn, deps)`은 `useMemo(() => fn, deps)`와 같다.
- before

  ```jsx
  // useMemo 실습
  // useMemo를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있다.
  import React, { useState, useMemo } from 'react';

  const getAverage = nums => {
    console.log('평균값 계산');
    if (!nums.length) return 0;
    return nums.reduce((a, b) => a + b, 0) / nums.length;
  };

  const Average = () => {
    const [nums, setNums] = useState([]);
    const [number, setNumber] = useState('');
    const avg = useMemo(() => getAverage(nums), [nums]); //nums가 바뀌지 않았다면 이전값 사용

    const onChange = ({ target }) => setNumber(target.value);
    const onClick = () => {
      const nextNums = [...nums, +number];
      setNums(nextNums);
      setNumber('');
    };

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

  export default Average;
  ```

  → `onChange` 와 `onClick` 은 컴포넌트가 리렌더링 될 때마다 함수가 새로 생긴다.

- after

  ```jsx
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
  ```

  → `onChange`, `onClick` 에 `useCallback` 을 이용해 특정 조건에서만 함수를 생성하도록 변경

- `useCallback` 사용 시, dependency 배열에 빈 배열을 주면, 컴포넌트가 렌더링 될 때 단 한 번만 함수가 생성됨
- 함수 내부에서 **상태값에 의존해야하는 경우**에는 반드시 그 값을 `useCallback` 의 두 번째 파라미터에 포함시켜야 한다.
- `useCallback` 은 결국 `useMemo` 로 함수를 반환하는 상황에서 더 편하게 사용할 수 있는 Hook
- 숫자, 문자열, 객체처럼 일반 값을 재사용할 때는 `useMemo` 사용, 함수를 재사용하려면 `useCallback` 사용
- 다음 두 코드는 동일한 코드

  ```jsx
  useCallback(() => {
    console.log('hello world');
  }, []);

  useMemo(() => {
    const fn = () => {
      console.log('hello world');
      return fn;
    };
  }, []);
  ```

---

# 6. useRef

- `useRef` 훅은 함수형 컴포넌트에서 `ref` 를 쉽게 사용할 수 있도록 한다.
- `useRef` 를 사용해 `ref` 를 설정하면 `useRef` 를 통해 만든 객체 안의 `current` 값이 실제 엘리먼트를 가리킨다.

  ```jsx
  // useRef 실습
  // useRef를 사용해 input요소에 focus 주기
  import React, { useState, useMemo, useCallback, useRef } from 'react';

  const getAverage = nums => {
    console.log('평균값 계산');
    if (!nums.length) return 0;
    return nums.reduce((a, b) => a + b, 0) / nums.length;
  };

  const AutoFocusAverage = () => {
    const [nums, setNums] = useState([]);
    const [number, setNumber] = useState('');
    const avg = useMemo(() => getAverage(nums), [nums]);
    const inputEl = useRef(null);

    const onChange = useCallback(({ target }) => setNumber(target.value), []);
    const onClick = useCallback(() => {
      const nextNums = [...nums, +number];
      setNums(nextNums);
      setNumber('');
      **inputEl.current.focus()**; // useRef를 통해 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킨다.
    }, [number, nums]);

    return (
      <div>
        <div>
          <input value={number} onChange={onChange} type='number' ***ref={inputEl}*** />
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

  export default AutoFocusAverage;
  ```

## 6.1 useRef를 이용하여 로컬 변수 사용하기

- 컴포넌트 로컬 변수를 사용해야 할 때도 useRef를 활용할 수 있다.
- 로컬 변수: 렌더링과 상관없이 바뀔 수 있는 값.

  ```jsx
  const RefSample = () => {
    const id = useRef(1);
    const setId = n => {
      id.current = n;
    };

    const printId = () => {
      console.log(id.current);
    };

    return <div>refsample</div>;
  };
  ```
