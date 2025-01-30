export const snowEffect = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
      random: true,
    },
    size: {
      value: { min: 1, max: 5 },
      random: true,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "bottom",
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
        distance: 200,
        size: 6,
        duration: 0.3,
      },
    },
  },
};
