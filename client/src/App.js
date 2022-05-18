import React from 'react'
import Context from './Context'
import PostCreate from './PostCreate'
import PostList from './PostList'

function App() {
  return (
    <Context>
    <div className='container'>
        <h1>Create Post!!!!!</h1>
        <PostCreate />
        <hr />
        <h1>Posts List</h1>
        <PostList />
    </div>
    </Context>
  )
}

export default App