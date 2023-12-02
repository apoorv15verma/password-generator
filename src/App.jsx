import { useState, useCallback, useEffect, useRef } from 'react';

import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [upper, setupper] = useState(false);
  const [lower, setlower] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = '';
    if (lower) str += 'abcdefghijklmnopqrstuvwxyz';
    if (upper) str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, upper, lower, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, upper, lower, charAllowed]);

  const rangeChanger = (e) => {
    setLength(e.target.value);
  };

  const checknumber = () => {
    setNumberAllowed((prev) => !prev);
  };

  const checkCharacter = function () {
    setCharAllowed((prev) => !prev);
  };

  const checkUpper = function () {
    setupper((prev) => !prev);
  };

  const checkLower = function () {
    setlower((prev) => !prev);
  };

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div
      style={{ color: 'orange' }}
      className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500"
    >
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-white hover:text-blue-700  border-4 border-blue-700 "
        >
          copy
        </button>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={rangeChanger}
        />
        <label>Length: {length}</label>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={checknumber}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={checkCharacter}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={upper}
            id="upperInput"
            onChange={checkUpper}
          />
          <label htmlFor="characterInput">Uppercase</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={lower}
            id="lowerInput"
            onChange={checkLower}
          />
          <label htmlFor="characterInput">Lowercase</label>
        </div>
      </div>
    </div>
  );
}

export default App;
