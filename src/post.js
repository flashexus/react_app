import { 
  useParams,
} from 'react-router-dom';

import {
  useEffect,useState
} from 'react'


function Post() {
  const { postId } = useParams();
  const [ post, setPost ] = useState('');

  useEffect( () => {
    const fetchPost = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [postId])

  return (<>
    <h2>Single Post</h2>
    <div>
      <p>ID:{post.id}</p>
      <p>Title:{post.title}</p>
      <p>Subject:{post.body}</p>
    </div>
  </>);
}

export default Post;