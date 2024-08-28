import heroImg from "../assets/images/heroImg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <div
      className="h-[400px] bg-cover bg-center mb-20 z-0"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative text-center">
          {/* Bouncing Text */}
          <h1 className="text-white text-4xl md:text-6xl font-raleway mb-4 animate-bounce">
            Lift Today!
          </h1>

          {/* Lifting Icon */}
          <FontAwesomeIcon
            icon={faDumbbell}
            className="text-white text-4xl md:text-6xl absolute left-1/2 transform -translate-x-1/2 animate-lift"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
