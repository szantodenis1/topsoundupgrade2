import React, { memo, useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  variant?: 'light' | 'dark';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = memo(({ variant = 'light' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseColor = variant === 'light' ? '14, 165, 233' : '30, 41, 59'; // accent-blue or dark-800 in RGB

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    let connections: Array<[number, number]> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 50);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    };

    const updateParticles = () => {
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });
    };

    const findConnections = () => {
      connections = [];
      const maxDistance = Math.min(canvas.width, canvas.height) * 0.15;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            connections.push([i, j]);
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach(([i, j]) => {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = Math.min(canvas.width, canvas.height) * 0.15;
        const opacity = (1 - distance / maxDistance) * 0.15;

        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
        ctx.stroke();
      });

      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, 0.1)`;
        ctx.fill();
      });
    };

    const animate = () => {
      updateParticles();
      findConnections();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [baseColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-50"
      style={{ 
        filter: 'blur(1px)',
        WebkitFilter: 'blur(1px)'
      }}
    />
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;