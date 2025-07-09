import type { Container, Engine } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

const ParticlesComponent = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options = {
    fullScreen: { enable: true, zIndex: 0 },
    particles: {
      number: { value: 30 },
      color: { value: "#FFD580" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 2, random: true },
      move: {
        enable: true,
        speed: 0.5,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "trail",
        },
      },
      modes: {
        trail: {
          delay: 0.2,
          quantity: 2,
          particles: {
            color: { value: "#FFD580" },
            size: { value: 3, random: true },
            opacity: { value: 0.4, random: true },
          },
        },
      },
    },
    background: {
      color: {
        value: "transparent",
      },
    },
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default ParticlesComponent;
