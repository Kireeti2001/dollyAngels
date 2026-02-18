// src/components/ParticlesBackground.jsx
import { useCallback, useMemo } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { magicSparkles } from "../assets/styles/ParticleEffects/magicSparkles";
import { useMediaQuery } from "../hooks/useMediaQuery";

function ParticlesBackground() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const options = useMemo(
    () =>
      isMobile
        ? {
            ...magicSparkles,
            particles: {
              ...magicSparkles.particles,
              number: { value: 20, density: { enable: true, area: 800 } },
            },
          }
        : magicSparkles,
    [isMobile]
  );

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return <Particles id="tsparticles" init={particlesInit} options={options} />;
}

export default ParticlesBackground;
