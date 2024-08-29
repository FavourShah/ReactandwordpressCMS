import { Element } from "react-scroll";
import Hero from "../Components/Hero";
import PostListings from "../Components/PostListings";
import HomeBody from "../Components/HomeBody";
import Contact from "../Components/Contact";
import Testimonials from "../Components/Testimonials";

const HomePage = () => {
  const categoryId = 4;

  return (
    <>
      <Hero />
      <PostListings />
      <HomeBody categoryId={categoryId} />

      {/* Wrap sections with Element and  a name matching the scroll link */}
      <Element name="contact">
        <Contact />
      </Element>
      
      <Element name="testimonials">
        <Testimonials />
      </Element>
    </>
  );
};

export default HomePage;
