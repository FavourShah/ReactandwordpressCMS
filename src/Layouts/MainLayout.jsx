import { Outlet } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
     
      <header>
        <Navbar />
      </header>
      
      {/* Main content area that grows */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Sticky Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
