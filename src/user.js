import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const fetchUsers = async () =>{
  const rest = await
    fetch('https://jsonplaceholder.typicode.com/users')
  return rest.json()
}

function Users(){
  const {data,isLoading,isError,error} = useQuery('users',fetchUsers)
  if(isLoading){
    return <span>Now Loading...</span>
  }
  if(isError){
    return <span>Error:{error.message}</span>
  }

  return(
    <div>
      <ReactQueryDevtools initialIsOpen={false} />
      <h2>ユーザ一覧</h2>
      <div>
        {data.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  )

}

export default Users