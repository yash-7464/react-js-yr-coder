import React from 'react';
import { useState } from 'react';

export default function Calc () {

    const [value, setValue] = useState('');

    function handelClick(e){
        if(e === "AC"){
            setValue('');
        }else if(e === "DELL"){
            setValue(value.slice(0, -1));
        }else if(e === "="){
            setValue(eval(value));
        }else{
            setValue(value + e);
        }
    }

  return (
    <div className="calculator">
      <div className='inputText'>
        <input 
            type="text" 
            value={value}
            placeholder='0'
        />
      </div>
      <div className="button">
        <div>
          <button onClick={() => handelClick('AC')}>AC</button>
          <button onClick={() => handelClick('DELL')}>DELL</button>
          <button onClick={() => handelClick('%')}>%</button>
          <button onClick={() => handelClick('/')}>/</button>
        </div>

        <div>
          <button onClick={() => handelClick('7')}>7</button>
          <button onClick={() => handelClick('8')}>8</button>
          <button onClick={() => handelClick('9')}>9</button>
          <button onClick={() => handelClick('*')}>*</button>
        </div>

        <div>
          <button onClick={() => handelClick('4')}>4</button>
          <button onClick={() => handelClick('5')}>5</button>
          <button onClick={() => handelClick('6')}>6</button>
          <button onClick={() => handelClick('-')}>-</button>
        </div>

        <div>
          <button onClick={() => handelClick('1')}>1</button>
          <button onClick={() => handelClick('2')}>2</button>
          <button onClick={() => handelClick('3')}>3</button>
          <button onClick={() => handelClick('+')}>+</button>
        </div>

        <div>
          <button onClick={() => handelClick('00')}>00</button>
          <button onClick={() => handelClick('0')}>0</button>
          <button onClick={() => handelClick('.')}>.</button>
          <button onClick={() => handelClick('=')} className='equal'>=</button>
        </div>
      </div>
    </div>
  );
}
