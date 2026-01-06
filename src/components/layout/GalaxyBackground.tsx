"use client";
import { useEffect, useRef } from 'react';
import styles from './GalaxyBackground.module.scss';

export default function GalaxyBackground({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fullscreen responsive
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Configuration
    const particlesArray: Particle[] = [];
    const numberOfParticles = 80;
    const mouse = { x: -1000, y: -1000 }; // Start off screen

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() * 1.5) - 0.75;
        this.speedY = (Math.random() * 1.5) - 0.75;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas!.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas!.height || this.y < 0) this.speedY = -this.speedY;

        // Mouse repulsor
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < 150) {
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * 3;
            this.y -= Math.sin(angle) * 3;
        }
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = '#08fdd8';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Init
    for (let i = 0; i < numberOfParticles; i++) particlesArray.push(new Particle());

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Connect lines (Constellation effect)
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(8, 253, 216, ${1 - distance/120})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.content}>{children}</div>
      <div className={styles.vignette} />
    </div>
  );
}