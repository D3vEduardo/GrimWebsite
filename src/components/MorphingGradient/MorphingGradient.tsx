'use client';

import { useEffect, useRef } from 'react';
import styles from './MorphingGradient.module.css';

interface MorphingGradientProps {
  className?: string;
}

interface Color {
  r: number;
  g: number;
  b: number;
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  xSpeed: number;
  ySpeed: number;
  color: Color;
  phase: number;
}

const GRADIENT_COLORS: Color[] = [
  { r: 30, g: 0, b: 60 },  // Roxo escuro
  { r: 60, g: 20, b: 120 }, // Roxo médio
  { r: 80, g: 40, b: 170 }  // Roxo claro
];

const BUBBLE_COUNT = 8;

const initializeCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  return { dpr, rect };
};

const createBubbles = (count: number, width: number, height: number, colors: Color[]): Bubble[] => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 100 + Math.random() * 200,
    xSpeed: (Math.random() - 0.5) * 0.7,
    ySpeed: (Math.random() - 0.5) * 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
    phase: Math.random() * Math.PI * 2
  }));
};

const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'rgba(10, 0, 30, 1)');
  gradient.addColorStop(1, 'rgba(30, 10, 60, 1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};

const updateAndDrawBubble = (ctx: CanvasRenderingContext2D, bubble: Bubble, time: number, width: number, height: number) => {
  bubble.x += bubble.xSpeed;
  bubble.y += bubble.ySpeed;

  const morphFactor = Math.sin(time * 0.001 + bubble.phase) * 0.2 + 1;
  const currentRadius = bubble.radius * morphFactor;

  if (bubble.x < -currentRadius) bubble.x = width + currentRadius;
  if (bubble.x > width + currentRadius) bubble.x = -currentRadius;
  if (bubble.y < -currentRadius) bubble.y = height + currentRadius;
  if (bubble.y > height + currentRadius) bubble.y = -currentRadius;

  const bubbleGradient = ctx.createRadialGradient(
    bubble.x, bubble.y, 0,
    bubble.x, bubble.y, currentRadius
  );

  const { r, g, b } = bubble.color;
  bubbleGradient.addColorStop(0, `rgba(${r + 30}, ${g + 20}, ${b + 30}, 0.4)`);
  bubbleGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

  ctx.fillStyle = bubbleGradient;
  ctx.beginPath();
  ctx.arc(bubble.x, bubble.y, currentRadius, 0, Math.PI * 2);
  ctx.fill();
};

const MorphingGradient = ({ className = '' }: MorphingGradientProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const canvasContextRef = useRef<{ ctx: CanvasRenderingContext2D, dpr: number, rect: DOMRect } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { dpr, rect } = initializeCanvas(canvas, ctx);
    canvasContextRef.current = { ctx, dpr, rect };
    bubblesRef.current = createBubbles(BUBBLE_COUNT, rect.width, rect.height, GRADIENT_COLORS);

    const draw = (time: number) => {
      if (!canvasContextRef.current) return;
      const { ctx, rect } = canvasContextRef.current;

      ctx.clearRect(0, 0, rect.width, rect.height);
      //drawBackground(ctx, rect.width, rect.height);

      bubblesRef.current.forEach(bubble => {
        updateAndDrawBubble(ctx, bubble, time, rect.width, rect.height);
      });

      animationFrameIdRef.current = requestAnimationFrame(draw);
    };

    animationFrameIdRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      if (!canvas || !canvasContextRef.current) return;
      const { ctx } = canvasContextRef.current;
      const { dpr, rect: newRect } = initializeCanvas(canvas, ctx);
      canvasContextRef.current.dpr = dpr;
      canvasContextRef.current.rect = newRect;
      // Recriar bolhas pode ser uma opção aqui se o comportamento desejado for que elas se ajustem ao novo tamanho
      // bubblesRef.current = createBubbles(BUBBLE_COUNT, newRect.width, newRect.height, GRADIENT_COLORS);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${className}`}
      aria-hidden="true"
    />
  );
};

export default MorphingGradient;