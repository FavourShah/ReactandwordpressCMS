import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AllPostsPage from './pages/AllPostsPage'
import SinglePostsPage from './pages/SinglePostsPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<MainLayout/>}>
  <Route index element={<HomePage/>} />
  <Route path = '/posts' element = {<AllPostsPage/>}/>
  <Route path="/posts/:id" element={<SinglePostsPage />} />

  </Route>
)
)

const App = () => {

  return (
    <RouterProvider router = {router}/>
  )
}

export default App