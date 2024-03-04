import { useState } from 'react'
import './App.css'

function App() {
  const [number, setNumber] = useState(0);
  const [roman, setRoman] = useState('');

  return (
    <>
      <h1>Roman numbers</h1>
      <div className="card">
        <input
          type="number"
          name="number"
          min="1"
          max="3999999"
          value={number}
          onFocus={(e: any) => {if (e.target.value == '0') e.target.value = ''}}
          onChange={(e: any) => setNumber(e.target.value)}
        />
        <button onClick={() => {setRoman('');setNumber(0);}}>
          X
        </button>
        <button onClick={() => setRoman(convertToRoman(number))}>
          Convert
        </button>
        <p dangerouslySetInnerHTML={{__html : roman }}></p>
      </div>
    </>
  )
}

const convertToRoman = (num: number) : string => {
  if (num > 3999999) return 'Number too big!';

  const romanLetters: {[key: string]:number} = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000, V1:5000, X1:10000, L1:50000, C1:100000, D1:500000, M1:1000000 }
  const letters = Object.keys(romanLetters).reverse();
  let romanNumberArray = [];

  for (let i = 0, len = letters.length; i < len; i++ ) {
    const letter = letters[i];
    const result = Math.trunc(num / romanLetters[letter]);
    num = num % romanLetters[letter];

    if (result === 0) continue;
    if (result === 1 && Math.trunc(num / romanLetters[letters[i + 1]]) === 4) {
      romanNumberArray.push(letters[i + 1] + letters[i - 1]);
      num = num % romanLetters[letters[i + 1]];
    } else if (result <= 3) {
      romanNumberArray.push(''.padEnd((result * letter.length), letter));
    } else {
      romanNumberArray.push(letters[i] + letters[i - 1]);
    }
  }

  return romanNumberArray.join('').replace(/(.)1/gm, '<span style="border-top:white 1px solid;">$1</span>');
}

export default App
