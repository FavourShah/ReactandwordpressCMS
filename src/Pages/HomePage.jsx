import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../Components/Hero";
import PostListings from "../Components/PostListings";
import HomeBody from "../Components/HomeBody";
import Contact from "../Components/Contact";
import Testimonials from "../Components/Testimonials";

const HomePage = () => {
  const categoryId = 4;
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <PostListings />
      <HomeBody categoryId={categoryId} />
      <div id="contact">
        <Contact />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
    </>
  );
};

export default HomePage;
