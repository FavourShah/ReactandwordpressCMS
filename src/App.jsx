import { Route, createHashRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'; // Use createHashRouter
import MainLayout from './Layouts/MainLayout';
import HomePage from './Pages/HomePage';
import AllPostsPage from './Pages/AllPostsPage';
import SinglePostsPage from './Pages/SinglePostsPage';
import NotFoundPage from './Pages/NotFoundPage';
import ProductsPage from './Pages/ProductsPage';
import CheckOutPage from './Pages/CheckOutPage'; // Import CheckoutPage

const router = createHashRouter( // Use createHashRouter
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/posts' element={<AllPostsPage />} />
      <Route path='/products' element={<ProductsPage />} />
      <Route path='/cart' element={<CheckOutPage />} /> 
      <Route path='/posts/:id' element={<SinglePostsPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
