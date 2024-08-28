import { Route, createHashRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'; // Use createHashRouter
import MainLayout from './Layouts/MainLayout';
import HomePage from './Pages/HomePage';
import AllPostsPage from './Pages/AllPostsPage';
import SinglePostsPage from './Pages/SinglePostsPage';

const router = createHashRouter( // Use createHashRouter
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/posts' element={<AllPostsPage />} />
      <Route path="/posts/:id" element={<SinglePostsPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
