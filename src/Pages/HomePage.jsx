
import Hero from "../Components/Hero";
import PostListings from "../Components/PostListings";
import HomeBody from "../Components/HomeBody";
import ContactPage from "./ContactPage";
import TestimonialsPage from "./TestimonialsPage";


const HomePage = () => {
  const categoryId = 4;

  return (
    <>
      <Hero />
      <PostListings />
      <HomeBody categoryId={categoryId} />

        <ContactPage />
   
      
   
        <TestimonialsPage />
     
    </>
  );
};

export default HomePage;
