import React, { useEffect } from 'react';
import file from '../../src/assets/file/testOutput.txt';

function Alarme() {
  useEffect(() => {
    fetch(file)
      .then((r) => r.text())
      .then((text) => {
        text.split('\n\n').map((entry) => {
          const obj = [];
          entry.split('\n').forEach((keyValue) => {
            obj.push(keyValue);
          });
          console.log(obj);
        });
      });
  }, []);

  return (
    <div className='Alarme'>
      <button>ok</button>
    </div>
  );
}

export default Alarme;
