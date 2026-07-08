"use client";

import React, { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      canvasWidth: number;
      canvasHeight: number;
      
      constructor(width: number, height: number) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        const colors = ["#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;
        
        this.alpha += (Math.random() - 0.5) * 0.02;
        this.alpha = Math.max(0.1, Math.min(0.6, this.alpha));
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Draw connections
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)" }}
    />
  );
}

// Floating gradient orbs
export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electron-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
    </div>
  );
}

// Grid pattern overlay
export function GridPattern() {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px"
      }}
    />
  );
}
