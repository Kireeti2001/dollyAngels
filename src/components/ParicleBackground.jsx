// src/components/ParticlesBackground.jsx
import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { magicSparkles } from "../assets/styles/ParticleEffects/magicSparkles";

function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={magicSparkles}
    />
  );
}

export default ParticlesBackground;
