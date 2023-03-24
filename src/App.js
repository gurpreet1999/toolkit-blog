import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'
import { EditPostForm } from './features/posts/EditPostForm'
import { SinglePostPage } from './features/posts/SinglePostPage'
import UsersList from './features/users/UsersList'
import UserPage from './features/users/UserPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            
            path="/"
           
      element={<AddPostForm/>}

          >

           <Route path="/" element={<PostsList/>}></Route> 
          </Route>
          <Route  path="/posts/:postId" element={<SinglePostPage/>} />
          <Route  path="/editPost/:postId" element={<EditPostForm/>} />
          <Route  path="/users" element={<UsersList/>} />
          <Route  path="/users/:userId" element={<UserPage/>} />
          
        </Routes>
      </div>
    </Router>
  )
}

export default App
