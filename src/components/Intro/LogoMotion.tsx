import Firework from "./Firework";
import FallingShapes from "./FallingShapes";
import LogoMotion from "./LogoMotion";

export default function IntroAnimation() {
  return (
    <div className="relative w-full h-screen bg-white overflow-visible flex items-center justify-center">
      <Firework />
      <FallingShapes />
      <LogoMotion />
    </div>
  );
}
