import { useEffect, useRef } from "react";
import Spaceship from "../../assets/dudaegiu.png";
import Avatar from "../../assets/ggiu.png";
import "./Bio.css";

export default function Bio() {
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);
  const propulsionCanvasRef = useRef<HTMLCanvasElement>(null);
  const spaceshipRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = starsCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: any[] = [];
    let w: number, h: number;

    function initCanvas() {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      stars = [];
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          delta: Math.random() * 0.02,
        });
      }
    }

    let animationFrameId: number;
    function animateStars() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (let star of stars) {
        star.alpha += star.delta;
        if (star.alpha <= 0 || star.alpha >= 1) {
          star.delta = -star.delta;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animateStars);
    }

    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener("resize", handleResize);

    initCanvas();
    animateStars();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const canvas = propulsionCanvasRef.current;
    const spaceship = spaceshipRef.current;
    if (!canvas || !spaceship) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;

    let particles: any[] = [];

    function createParticle(x: number, y: number) {
      const size = Math.random() * 2 + 3;
      const hue = Math.random() * 50 + 280;
      const color = `hsl(${hue}, 100%, 70%)`;
      const speedX = (Math.random() - 0.5) * 3;
      const speedY = Math.random() * 4 + 3;

      return { x, y, size, color, speedX, speedY, alpha: 1 };
    }

    let animationFrameId: number;
    function animateParticles() {
      if (!canvas || !spaceship || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spaceshipRect = spaceship.getBoundingClientRect();
      const canvasRect = canvas.parentElement!.getBoundingClientRect();

      // Position the canvas centered horizontally with the spaceship
      // and vertically aligned with the bottom of the spaceship
      canvas.style.left = `${
        spaceshipRect.left -
        canvasRect.left +
        (spaceshipRect.width - canvas.width) / 2
      }px`;
      canvas.style.top = `${
        spaceshipRect.top - canvasRect.top + spaceshipRect.height - 50
      }px`; // -50 to overlap slightly

      for (let i = 0; i < 5; i++) {
        particles.push(createParticle(canvas.width / 2, 0));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= 0.02;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animateParticles);
    }

    animateParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="bio-wrapper">
      <canvas id="stars-canvas" ref={starsCanvasRef}></canvas>
      <canvas id="propulsion-canvas" ref={propulsionCanvasRef}></canvas>
      <img
        src={Spaceship}
        alt="Spaceship"
        className="spaceship-img"
        ref={spaceshipRef}
      />
      <div className="bio-inner">
        <img src={Avatar} alt="Avatar" className="bio-avatar" />
        <h1 className="section-title">
          Registro Estelar 2.295 – Explorando novas fronteiras.
        </h1>
        <p>
          Oiê! Sou a Giuliana, uma mulher trans autista com altas habilidades e
          uma desenvolvedora{" "}
          <span className="highlight">fullstack multistack</span> com uma paixão
          inabalável por <span className="highlight">tecnologia</span> e{" "}
          <span className="highlight">inovação</span>.
        </p>
        <p>
          Minha jornada é movida por uma curiosidade sem limites e um amor
          profundo pelo aprendizado contínuo. Com experiência que abrange desde
          o desenvolvimento de produtos digitais diversificados até
          contribuições significativas em tecnologias de ponta na Ambev Tech,
          meu caminho profissional é um testemunho do meu compromisso com a
          evolução e a excelência.
        </p>
        <p>
          Além disso, sou uma entusiasta fervorosa de{" "}
          <span className="highlight">desenvolvimento de games</span>,
          especialmente utilizando a engine open-source{" "}
          <span className="highlight">Godot</span>. Criar mundos e experiências
          interativas é onde encontro a fusão perfeita entre criatividade e
          tecnologia, permitindo-me explorar novas fronteiras no desenvolvimento
          de jogos.
        </p>
        <p>
          A diversidade de tecnologias com as quais já trabalhei reflete minha
          adaptabilidade e prontidão para abraçar novos desafios. Como
          entusiasta do self learning, meu portfólio é uma mistura de
          autodidatismo e colaboração, impulsionado por uma paixão por resolver
          problemas e um forte senso de propriedade.
        </p>
        <p>Vamos nos conectar e explorar como podemos inovar juntos!</p>
        <div className="hashtags">
          <span>#FullStackDeveloper</span>
          <span>#WomenInTech</span>
          <span>#TechInnovation</span>
          <span>#LongLifeLearning</span>
          <span>#ProblemSolver</span>
          <span>#TeamPlayer</span>
          <span>#GameDev</span>
          <span>#GodotEngine</span>
        </div>
        <div className="bio-buttons">
          <a
            href="https://www.linkedin.com/in/giuzambot/"
            target="_blank"
            rel="noopener noreferrer"
            className="bio-button"
          >
            Ver LinkedIn
          </a>
          <a
            href="https://wa.me/5583996792806?text=Ol%C3%A1%2C%20vi%20seu%20site%20e%20quero%20conversar!"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            💬 Fale comigo no WhatsApp
          </a>
          <a
            href="https://www.instagram.com/giuzambot/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-button"
          >
            Ver Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
