import { useState } from 'react';
import Weather from './weather'

function WeatherIndex(){
  const [cities,setCities] = useState([{
    city_name: 'Tokyo',
    color_name: 'blue'
  },
  {
    city_name: 'London',
    color_name: 'yellow'
  },
  {
    city_name: 'Paris',
    color_name: 'green'
  }, 
  {
    city_name: 'Los Angeles',
    color_name: 'red'
  },]);
  const [inputCity,setNewCity] = useState("")

  const addCity = () => {
    let tmpCities = cities.slice()
    let newCity = { city_name:inputCity, color_name:'green'}
    setCities(tmpCities.concat(newCity))
    setNewCity("")
  }
  const getCity = (e) => {setNewCity (e.target.value) }
  return(
    <>
      <div className="col-span-3 sm:col-span-2">
        <label className="ml-4 font-sans text-4xl block text-sm font-medium text-gray-700"> Weather List </label>
          <div className="w-96 mt-2 ml-4 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> ADD </span>
            <input onInput={getCity} type="text" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300" placeholder="Enter CityName..."/>
            <button onClick={addCity} className=" mr-4 inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">Regist</button>
          </div>
      </div>
      <div className="min-h-screen flex justify-center items-center flex-wrap">
        {
          cities.map((city,index) => {
            return( <Weather key={index} city_name={city.city_name} color_name={city.color_name} />)
          })
        }
      </div>
   </>
  )
}

export default WeatherIndex;