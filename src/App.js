import './App.css';
import { 
  BrowserRouter as Router ,
  useRoutes,
  Link,
  useResolvedPath,
  useMatch,
  useNavigate 
} from 'react-router-dom';
import Todo from './todo';
import Game from './game';
import Posts from './posts';
import Post from './post'
import PostIndex from './postindex'
import Contact from './contact'
import WeatherIndex from './weatherindex'
import StockPrices from './stockprices'
import Users from './user'

import React,{ useRef } from 'react';
import { CountProvider,useCountContext } from './context/countContext'
import { QueryClient, QueryClientProvider } from 'react-query';


// import { render } from '@testing-library/react';

const queryClient = new QueryClient()

const Layout = ( {children}) => {
  return (
    <div className='flex flex-col ml-4'>
      {children}
    </div>
  );
};


const menuList = [
  { path: "/", element: <Layout><Home /></Layout>, name:"Home" },
  { path: "/weather", element: <Layout><WeatherIndex/></Layout>, name:"Weather" },
  { path: "/todo", element: <Layout><Todo /></Layout>, name:"Todo" },
  { path: "/stock", element: <Layout><StockPrices /></Layout>, name:"Stock" },
  { path: "/game", element: <Layout><Game /></Layout>, name:"Game" },
  { path: "/contact", element: <Layout><Contact message="念ずれば通ずる" /></Layout>,  name:"Contact"},
  { path: "*", element: <Layout><NoMatch  /></Layout>, name:"NoMatch"},
  { path: '/posts',element: <Layout><Posts /></Layout>,name:"Posts",
    children:[
      { path: '',element:<PostIndex /> },
      { path: ':postId',element:<Post /> },
      { path: 'users',element:<QueryClientProvider client={queryClient}><Users /></QueryClientProvider> },

    ]
  },

]

const AppRoute = () =>{
  return useRoutes(menuList);
};

function CustomLink({ children, to }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({
    path: resolved.pathname,
    end: true,
  });
  return (
    <Link  style={{ color: match ? 'blue' : 'black' }} to={to}>
        {children}
    </Link>
  );
}


function App() {
  const list = menuList.filter(menu => menu.path!=="*").map((menu,index) => {
    return (
      <li key={menu.name} className="font-sans rounded-full bg-indigo-300 py-2 px-5 border-r-4 border-blue-700 ">
        <CustomLink  to={menu.path}>{menu.name}</CustomLink>
      </li>
    )
  })
  return (
    <div>
      <h1 className='font-sans text-5xl'>Hello React</h1>
      <Router>
        <ul className='flex justify-around mb-3 mt-3 pt-3 pb-3'>
          {list}
        </ul>
        <CountProvider>
          <AppRoute />
        </CountProvider>
      </Router>
    </div>
  );
}

function Home(){
  const {count, setCount, Reload} = useCountContext()
  const navigate = useNavigate();
  // const [name,setName] = useState('')
  const selectedFile = (e) => {console.log(e.target.files)}
  const inputEl = useRef(null)
  // const handleOnClick = () => {console.log(inputEl.current.getBoundingClientRect()); inputEl.current.focus();}
  return(
    <div className='flex flex-col space-y-4 '>
      <h2 className='font-sans text-4xl'>Home Contents</h2>
      <button className='font-sans' onClick={() => navigate('/contact?api_key=eimaieU9', { state: 'test' })}>Go to Contact</button>
      <div className='flex justify-center '>
        <span className='mr-4 text-2xl'>current_value:{count} </span>
        <button className='shadow-lg mr-4 px-2 py-1  bg-blue-400 text-lg text-white font-semibold rounded  hover:bg-blue-500 hover:shadow-sm hover:translate-y-0.5 transform transition ' onClick={() => setCount(count + 1 )}>Count++ </button>
        <button className='shadow-lg mr-4 px-2 py-1  bg-blue-400 text-lg text-white font-semibold rounded  hover:bg-blue-500 hover:shadow-sm hover:translate-y-0.5 transform transition ' onClick={() => Reload()}>Reload </button>
      </div>
      <div className='flex justify-center'>
        <button className='shadow-lg px-2 py-1  bg-blue-400 text-lg text-white font-semibold rounded  hover:bg-blue-500 hover:shadow-sm hover:translate-y-0.5 transform transition ' onClick={() => inputEl.current.click()}>ファイル</button>
        <input ref={inputEl} type="file" hidden onChange={selectedFile}/>
      </div>
    </div>
  )
}


function NoMatch(){
  return <h2>このページは存在しません</h2>
}


export default App;
