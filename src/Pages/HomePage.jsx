
import Hero from "../Components/Hero"
import PostListings from "../Components/PostListings"
import HomeBody from "../Components/HomeBody"
import Contact from "../Components/Contact"
import Testimonials from "../Components/Testimonials"

const HomePage = () => {
    const categoryId = 4; 
  return (
    <>
   
    <Hero/>
    <PostListings/>
    <HomeBody categoryId={categoryId}/>
    <Contact/>
    <Testimonials/>

    
    </>
  )
}

export default HomePage