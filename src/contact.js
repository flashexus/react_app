import { useLocation, useSearchParams } from 'react-router-dom';
// import { useContext } from 'react'
// import { UserCount } from './App'
import { useCountContext } from './context/countContext'

function Contact(props){
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsValue = searchParams.get('product_name') || '';
  
  console.log("location:",location)
  // console.log("searchParam:",searchParams.get('product_name'));
  const products = [
    {
      id: 1,
      product_name: 'iPhone',
      price: 1000,
    },
    {
      id: 2,
      product_name: 'iPad',
      price: 500,
    },
    {
      id: 3,
      product_name: 'iPod',
      price: 40,
    },
    {
      id: 4,
      product_name: 'MacBook',
      price: 2000,
    },
  ];
  
  const handleChange = (event) => {
    const product_name = event.target.value;
    if(product_name){
      setSearchParams({product_name: event.target.value});
    }else{
      setSearchParams({});
    }
  }

  const serachProducts = () =>{
    return products.filter( (product) => {
      return product.product_name.includes(
        searchParams.get('product_name') || ''
      )
    })
  }
  const {count, setCount} = useCountContext()

  return (
    <div className='flex flex-col ml-6 place-items-center'>
      <h2 className='font-sans text-4xl text-sm font-medium text-gray-700'>Contact -> {props.message}</h2>
      <input className='bg-auto' type="text" onChange={handleChange} value={paramsValue}/>
      <ul>
        { serachProducts().map((product) => (
           <li key={product.id}>
            {product.product_name}/{product.price}
           </li> 
        )) }
      </ul>
      <div className='flex flex-row mt-4 ml-6'>
        <p className='mr-4 text-2xl'>current_value:{count}</p>
        <button className='shadow-lg mr-4 px-2 py-1  bg-blue-400 text-lg text-white font-semibold rounded  hover:bg-blue-500 hover:shadow-sm hover:translate-y-0.5 transform transition ' onClick={() => setCount(count - 1 )}>Count-- </button>
      </div>
    </div>
  )
}

export default Contact;