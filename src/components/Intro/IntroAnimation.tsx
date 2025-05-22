import FallingShapes from "./FallingShapes";
import LogoMotion from "./LogoMotion";

const IntroAnimation = () => {
  return (
    <div className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center">
      <FallingShapes />
      <LogoMotion />
    </div>
  );
};

export default IntroAnimation;