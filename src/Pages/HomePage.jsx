import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import HomePage from './Pages/HomePage';
import PostsPage from './Pages/PostsPage';
import ContactPage from './Pages/ContactPage';
import TestimonialsPage from './Pages/TestimonialsPage'; // Assuming you have separate pages for these sections

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="posts" element={<PostsPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="testimonials" element={<TestimonialsPage />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
