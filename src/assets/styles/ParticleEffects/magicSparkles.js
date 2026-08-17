export const magicSparkles = {
  particles: {
    number: {
      value: 26,
      density: {
        enable: true,
        area: 900,
      },
    },
    color: {
      value: ["#FE6D2E", "#FED933", "#00AD6F", "#377EF0"],
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.15, max: 0.35 },
    },
    size: {
      value: { min: 1.5, max: 3.5 },
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out",
      },
    },
    links: {
      enable: false,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
      },
    },
    modes: {
      bubble: {
        distance: 180,
        size: 6,
        duration: 1.5,
        opacity: 0.5,
      },
    },
  },
};
