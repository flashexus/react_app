import { Chart as ChartJS, registerables } from 'chart.js';
import { Line} from "react-chartjs-2"
ChartJS.register(...registerables);

function StockChart(stockData){
  const options = {
    plugins:{
      legend:{
        display:false,
      },
    },
    scales: {
      x:{
        display: false
      },
      y:{
        display: false
      },
    },
    transitions: {
      show: {
        animations: {
          x: {
            from: 0
          },
          y: {
            from: 0
          }
        }
      },
      hide: {
        animations: {
          x: {
            to: 0
          },
          y: {
            to: 0
          }
        }
      }
    }}

  
  return (
    <div className='chart'>
      <Line data={stockData['stockData']} options={options} />
    </div>
  )
}

export default StockChart