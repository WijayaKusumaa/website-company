import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export default function SparkleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Amber and golden colors matching the hero background sparkles
    const colors = ['#E8772E', '#F6B352', '#FFFFFF', '#FFE8A1'];

    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      // Burst speed
      const speed = Math.random() * 2 + 0.2;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5, // Slight upward bias
        life: 0,
        maxLife: Math.random() * 40 + 20, // 20-60 frames
        size: Math.random() * 6 + 3, // 3-9px radius (fairly large to see the star shape clearly)
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
      });
    };

    let lastX = -1000;
    let lastY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn particles based on distance moved (density control)
      if (dist > 8) {
        // Spawn 1-2 particles
        const count = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < count; i++) {
          createParticle(
            e.clientX + (Math.random() - 0.5) * 15,
            e.clientY + (Math.random() - 0.5) * 15
          );
        }
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    // Add burst on click for extra interactivity
    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 8; i++) {
        createParticle(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const drawStar = (
      cx: number,
      cy: number,
      radius: number,
      rotation: number,
      color: string,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      
      // Draw 4-pointed star using inward quadratic curves
      ctx.beginPath();
      ctx.moveTo(0, -radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.quadraticCurveTo(0, 0, 0, radius);
      ctx.quadraticCurveTo(0, 0, -radius, 0);
      ctx.quadraticCurveTo(0, 0, 0, -radius);
      ctx.closePath();
      ctx.fill();

      // Inner glowing core
      ctx.globalAlpha = alpha * 0.9;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.25, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        
        // Gentle friction so they slow down over time
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.rotation += p.rotationSpeed;
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Fade in quickly, hold, then fade out smoothly
        let alpha = 1;
        const progress = p.life / p.maxLife;
        if (progress < 0.1) {
          alpha = progress / 0.1;
        } else if (progress > 0.5) {
          alpha = 1 - (progress - 0.5) / 0.5;
        }

        // Pulse size slightly or just shrink
        const currentSize = p.size * (1 - progress * 0.2);

        drawStar(p.x, p.y, currentSize, p.rotation, p.color, alpha);
      }

      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}
