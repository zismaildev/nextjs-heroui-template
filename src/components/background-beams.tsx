"use client";

import { useEffect, useRef } from "react";

interface Beam {
    x: number;
    y: number;
    angle: number;
    speed: number;
    length: number;
    width: number;
    opacity: number;
    color: string;
    life: number;
    maxLife: number;
    exploding: boolean;
    explosionRadius: number;
    explosionOpacity: number;
    particles: ExplosionParticle[];
}

interface ExplosionParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    color: string;
}

const BEAM_COLORS_DARK = [
    "rgba(167,139,250,",   // violet
    "rgba(96,165,250,",    // blue
    "rgba(52,211,153,",    // emerald
    "rgba(251,191,36,",    // amber
    "rgba(248,113,113,",   // rose
    "rgba(103,232,249,",   // cyan
];

const BEAM_COLORS_LIGHT = [
    "rgba(109,40,217,",    // violet
    "rgba(29,78,216,",     // blue
    "rgba(4,120,87,",      // emerald
    "rgba(180,83,9,",      // amber
    "rgba(185,28,28,",     // rose
    "rgba(8,145,178,",     // cyan
];

function randomBetween(a: number, b: number) {
    return a + Math.random() * (b - a);
}

function createBeam(width: number, height: number, isDark: boolean): Beam {
    const colors = isDark ? BEAM_COLORS_DARK : BEAM_COLORS_LIGHT;
    const color = colors[Math.floor(Math.random() * colors.length)];
    // เส้น beam ออกมาจากขอบบนเป็นหลัก
    const x = randomBetween(width * 0.05, width * 0.95);
    const maxLife = randomBetween(80, 160);
    return {
        x,
        y: 0,
        angle: randomBetween(75, 105), // เกือบตั้งฉาก ลงมาด้านล่าง
        speed: randomBetween(2, 5),
        length: randomBetween(80, 220),
        width: randomBetween(1, 2.5),
        opacity: randomBetween(0.5, 1),
        color,
        life: 0,
        maxLife,
        exploding: false,
        explosionRadius: 0,
        explosionOpacity: 1,
        particles: [],
    };
}

function createExplosionParticles(x: number, y: number, color: string): ExplosionParticle[] {
    const count = Math.floor(randomBetween(6, 14));
    return Array.from({ length: count }, () => ({
        x,
        y,
        vx: randomBetween(-3, 3),
        vy: randomBetween(-4, 1),
        radius: randomBetween(1, 3),
        opacity: 1,
        color,
    }));
}

interface BackgroundBeamsProps {
    className?: string;
    isDark?: boolean;
    beamCount?: number;
}

export function BackgroundBeams({ className = "", isDark = true, beamCount = 8 }: BackgroundBeamsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const rafRef = useRef<number | null>(null);
    const isDarkRef = useRef(isDark);

    useEffect(() => {
        isDarkRef.current = isDark;
    }, [isDark]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            beamsRef.current = Array.from({ length: beamCount }, () =>
                createBeam(canvas.width, canvas.height, isDarkRef.current)
            );
        };

        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Spawn new beams if needed
            while (beamsRef.current.length < beamCount) {
                const b = createBeam(canvas.width, canvas.height, isDarkRef.current);
                b.y = randomBetween(-50, 0);
                beamsRef.current.push(b);
            }

            beamsRef.current = beamsRef.current.filter(beam => {
                if (beam.exploding) {
                    // Draw explosion ring
                    beam.explosionRadius += 3;
                    beam.explosionOpacity -= 0.05;
                    if (beam.explosionOpacity <= 0) return false;

                    ctx.beginPath();
                    ctx.arc(beam.x, beam.y, beam.explosionRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = `${beam.color}${beam.explosionOpacity.toFixed(2)})`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();

                    // Draw explosion particles
                    beam.particles.forEach((p, idx) => {
                        p.x += p.vx;
                        p.y += p.vy;
                        p.vy += 0.1; // gravity
                        p.opacity -= 0.04;
                        if (p.opacity <= 0) return;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                        ctx.fillStyle = `${p.color}${p.opacity.toFixed(2)})`;
                        ctx.fill();
                    });
                    beam.particles = beam.particles.filter(p => p.opacity > 0);
                    return true;
                }

                // Move beam
                const rad = (beam.angle * Math.PI) / 180;
                beam.x += Math.cos(rad) * beam.speed;
                beam.y += Math.sin(rad) * beam.speed;
                beam.life++;

                // Hit bottom or max life → explode
                if (beam.y >= canvas.height || beam.life >= beam.maxLife) {
                    beam.exploding = true;
                    beam.particles = createExplosionParticles(beam.x, beam.y, beam.color);
                    return true;
                }

                // Draw beam as gradient line
                const tailX = beam.x - Math.cos(rad) * beam.length;
                const tailY = beam.y - Math.sin(rad) * beam.length;
                const grad = ctx.createLinearGradient(tailX, tailY, beam.x, beam.y);
                grad.addColorStop(0, `${beam.color}0)`);
                grad.addColorStop(1, `${beam.color}${beam.opacity})`);

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(beam.x, beam.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = beam.width;
                ctx.stroke();

                // Glow at head
                ctx.beginPath();
                ctx.arc(beam.x, beam.y, beam.width * 2, 0, Math.PI * 2);
                ctx.fillStyle = `${beam.color}${beam.opacity * 0.8})`;
                ctx.fill();

                return true;
            });

            rafRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [beamCount]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full ${className}`}
            aria-hidden="true"
        />
    );
}
