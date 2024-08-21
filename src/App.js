import './asset//style.scss'
import './asset//common.css'
import { useEffect, useState } from 'react';
import FlipNumbers from 'react-flip-numbers';
function App() {
  const MIN = 1;
  const MAX = 91;
  const [initArray, setInitArray] = useState([]);
  const [listNumberShow, setListNumberShow] = useState([]);
  const [listResult, setListReusult] = useState([]);
  
  function padWithLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
  }
  const init = () => {
    const arr = []
    for (let index = MIN; index < MAX; index++) {
      arr.push(index)
    }
    setInitArray(arr)
    setListNumberShow(arr)
  }
  const reset = () => {
    init();
    setListReusult([])
  }
  const random = () => {
    if (initArray.length !== 0) {
      const randomIndex = Math.floor(Math.random() * initArray.length);
      const item = initArray[randomIndex];
      const padNum = padWithLeadingZeros(item, 2);
      setInitArray(initArray.filter(num => num !== item))
      setListReusult(num => [...num, padNum])
    } else {
      alert("Hết số")
    }
  }
  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    document.body.onkeyup = function(e) {
      if (e.key === " " ||
          e.code === "Space" ||      
          e.keyCode === 32      
      ) {
        random();
      }
    }
  })
  return (
    <div className="inner">
      <FlipNumbers
        height={200}
        width={200} color="red" background="white"
        numberStyle={{
          fontSize: '4vw'
        }}
        nonNumberStyle={{ fontSize: '30px' }}
        play numbers={listResult.length !== 0 ? listResult[listResult.length - 1] : '99'} duration={2} />
      <ul className='list-button'>
        <li><button onClick={() => random()}>Quay</button></li>
        <li><button onClick={() => reset()}>Reset</button></li>
      </ul>
      <ul className='list-number'>
        {
          listNumberShow && listNumberShow.map(num => {
            return (
              <li className={listResult.includes(padWithLeadingZeros(num, 2)) && 'choise'} key={num}>{padWithLeadingZeros(num, 2)}</li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
