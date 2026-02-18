// src/components/ParticlesBackground.jsx
import { useCallback, useMemo } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { magicSparkles } from "../assets/styles/ParticleEffects/magicSparkles";
import { useBreakpointValue } from "@chakra-ui/react";

function ParticlesBackground() {
  const isMobile = useBreakpointValue({ base: true, md: false });
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
