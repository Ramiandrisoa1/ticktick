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
        let obj = {}
        textSplit.map((text, index) => {
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
            }).filter((data) => data !== undefined)

            for (let i = 0; i < 7; i++) {
              obj[textTmp[i]] = value[i]
            }
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
  function isEmpty(strValue) {
    // Test whether strValue is empty
    if (!strValue || strValue.trim() === "" || (strValue.trim()).length === 0) {
      //do something
    }
  }
  return (
    <div className='Alarme'>
      <button>ok</button>
    </div>
  );
}

export default Alarme;
