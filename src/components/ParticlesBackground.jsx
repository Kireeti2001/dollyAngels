import { useCallback, useMemo } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { magicSparkles } from "../assets/styles/ParticleEffects/magicSparkles";
import { useMediaQuery } from "../hooks/useMediaQuery";

function ParticlesBackground() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const options = useMemo(
    () => ({
      detectRetina: true,
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      ...(isMobile
        ? {
            ...magicSparkles,
            particles: {
              ...magicSparkles.particles,
              number: { value: 18, density: { enable: true, area: 800 } },
            },
          }
        : magicSparkles),
    }),
    [isMobile]
  );

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  if (reduceMotion) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 h-full w-full pointer-events-none"
      init={particlesInit}
      options={options}
    />
  );
}

export default ParticlesBackground;
