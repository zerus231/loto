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
  const [isShuffle, setIsShuffle] = useState(false);

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
      setIsShuffle(false)
    } else {
      alert("Hết số")
    }
  }
  const shuffle = () => {
    let array = initArray
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    setInitArray(array);
    setIsShuffle(true)
  }
  const getJson = (array) => {
    const data = {}
    for (let index = 0; index < (array.sort((a, b) => { return a-b}).length / 5); index++) {
      var items = array.slice(index * 5, (index + 1) * 5);
      for (let index = 0; index < 4; index++) {
        items.splice((items.length + 1) * Math.random() | 0, 0, 0)
      }
      data[index] = items
    }
    return data
  }
  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    document.body.onkeyup = function (e) {
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
        <li className='run'><button onClick={() => random()}>Quay</button></li>
        <li className='reset'><button onClick={() => reset()}>Reset</button></li>
        <li className='shuffle'><button onClick={() => shuffle()}>Shuffle</button></li>
      </ul>
      {isShuffle ? <div className='wrap-suffle'>
        <p>Suffle thành công rồi mẹ</p>
        <p className='wrap-img'><img src="/lover.jpg" alt=""/></p>
      </div> : ""}
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
