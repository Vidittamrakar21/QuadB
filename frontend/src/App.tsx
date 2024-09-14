import { useState , useEffect } from 'react'

import './App.css'
import axios from 'axios';

function App() {

  const [seconds, setSeconds] = useState(60);
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);
  const [data ,setdata] = useState([]);

   type recordtype = {
    name: String,
    last: String,
    buy: String,
    sell: String,
    volume: String,
    base_unit: String,
  }

  useEffect(() => {
    // Timer interval to reduce seconds
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        // Reset to 60 when countdown reaches 0
        if (prevSeconds === 1) {
          return 60;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Progress of the circular stroke
    const progress = ((60 - seconds) / 60) * circumference;
    setStrokeDashoffset(circumference - progress);

    // Cleanup the interval when component unmounts
    return () => clearInterval(timer);
  }, [seconds, circumference]);


  
  const fetchdata = async () => {
    const records = await (await axios.get('http://localhost:8080/api/fetchdata')).data;

    if(records.data){
      setdata(records.data);
    }
  }

  useEffect(()=>{
    fetchdata();
  },[])
  return (
    <div className='main'>
      <nav className='nav'>
      <h1 id='head'>HODLINFO</h1>

      <div className='button'>
        <button className='btn'><span className='sp'>INR</span>&nbsp; &#x25BE;</button>
        <button className='btn'><span className='sp'>BTC</span>&nbsp; &#x25BE;</button>
        <button className='btn btn1'><span className='sp'>BUY BTC</span></button>
      </div>

      
      <div className='box'>

      
      <div className="countdown-container">
      <svg width="120" height="120" className="countdown-circle">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth="5"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#40B3E0"
          fill="transparent"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="countdown-text">
        {seconds}
      </div>
    </div>

    <button className='tele'><img src="images/tele.svg" alt="" />Connect Telegram</button>
    </div>
      </nav>

      <div className='display'>
        <div className='tpp'>
          <li>#</li>
          <li>Name</li>
          <li>Base_Unit</li>
          <li>Last Traded Price</li>
          <li>Buy/Sell</li>
          <li>Volume</li>
        </div>
      
      {data.map((item:recordtype, index)=>(
          <div className='bars'>
          <h1>{index + 1}</h1>
          <h1>{item.name}</h1>
          <h1>{item.base_unit}</h1>
          <h1> &#8377; &nbsp;{item.last}</h1>
          <h1>{`${item.buy}` + "/"+`${item.sell}`}</h1>
          <h1>{item.volume}</h1>

        </div>
      ))}
        

      </div>

    </div>
  )
}

export default App
