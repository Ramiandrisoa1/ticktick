import React, { useEffect } from 'react';
import file from '../../src/assets/file/testOutput.txt';

function Alarme() {
  useEffect(() => {
    console.log('ray');
    fetch(file)
      .then((r) => r.text())
      .then((text) => {
        const textSplit = text.split('\n');
        const finalValue = [];
        textSplit.map((text, index) => {
          const obj = {}
          if (text.includes('SAE') && !text.includes('>')) {
            const textTmp = text.split(/((?:\w+ ){1})/g).map((data) => {
              if (data.replace(/\s/g, '') !== '') {
                return data.replace(/\s/g, '');
              }
            }).filter((data) => data !== undefined)

            const value = textSplit[index + 1].split(/((?:\w+ ){1})/g).map((data) => {
              if (data.replace(/\s/g, '') !== '') {
                return data.replace(/\s/g, '');
              }
            }).filter((data) => data !== undefined);
            for (let i = 0; i < 7; i++) {
              obj[textTmp[i]] = value[i]
            }
            // console.log(obj);
            finalValue.push(obj)
          }

        })
        console.log("Eto zama le value final ah: ", finalValue);


        // text.split('\n\n').map((entry) => {
        //   const obj = [];
        //   entry.split('\n').forEach((keyValue) => {
        //     obj.push(keyValue);
        //   });
        //   console.log(obj);
        // });
      });
  }, []);

  return (
    <div className='Alarme'>
      <button>ok</button>
    </div>
  );
}

export default Alarme;
