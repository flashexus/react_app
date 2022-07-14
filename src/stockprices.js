import {useEffect, useState} from 'react'
import axios from 'axios'
import Chart from './chart'

function Stockprices(){

  const URL = process.env.REACT_APP_MARKETSTOCK_URL;
  const ACCESS_KEY = process.env.REACT_APP_MARKETSTOCK_KEY;
  const [stockData, setStockData] = useState({})
  const [stockPrice, setStockPrice] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const getStockData = async (symbol) => {
      await axios.get(`${URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&outputsize=compact&apikey=${ACCESS_KEY}`)
      .then(response => {
        setStockPrice(JSON.parse(JSON.stringify(response.data)));
      //  setLoading(false);
      })

      let data = [];
      let labels = [];
//      await axios.get(`${URL}?function=TIME_SERIES_MONTHLY_ADJUSTED&interval=60min&outputsize=compact&symbol=${symbol}&apikey=${ACCESS_KEY}`)
      await axios.get(`${URL}?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${ACCESS_KEY}`)

      .then(response => {
          console.log(response.data)
          let res = JSON.parse(JSON.stringify(response.data["Monthly Adjusted Time Series"]))
          let asc_res_keys =  Object.keys(res).sort((a, b) => new Date(a) - new Date(b));
          
          asc_res_keys.forEach(key => {
            data.push((res[key]["5. adjusted close"]))
            labels.push(key)
          })
          setStockData({
            labels: labels,
            datasets:[
              {
                borderColor: 'rgba(35,200,153,1)',
                data: data,
                lineTension: 0,
              }
            ]
          })
        setLoading(false);
      });

     
    }
    getStockData('TSLA')
  },[ACCESS_KEY,URL])

  if (loading) {
    return <div >
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>;
  }

  return (
    <div className="bg-black text-white">
      <h1 className='text-4xl'>{stockPrice["Meta Data"]["2. Symbol"]}</h1>
      <h2>Last Refreshed: {stockPrice["Meta Data"]["3. Last Refreshed"]}</h2>
      <h2>${stockPrice["Time Series (60min)"][stockPrice["Meta Data"]["3. Last Refreshed"]]["4. close"]}</h2>
      <Chart stockData={stockData} />
    </div>
  )

}

export default Stockprices