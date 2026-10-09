"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Particles } from "./particles-bg";
import { BackgroundBeams } from "./background-beams";
import { useIsDark } from "./use-is-dark";

export const Hero = () => {
  const { isDark } = useIsDark();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden bg-background text-foreground">
      {/* Dynamic Backgrounds */}
      <BackgroundBeams isDark={isDark} beamCount={12} className="opacity-50" />
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        ease={80}
        color={isDark ? "#ffffff" : "#000000"}
        refresh={false}
      />

      {/* Background Blur for Premium Feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        <div className="mb-6 inline-flex animate-fade-in items-center justify-center rounded-full border border-default-200 bg-default-100/50 px-4 py-2 text-sm text-default-600 backdrop-blur-md transition-all hover:bg-default-200/50">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Welcome to the Next Generation
        </div>
        
        <h1 className="max-w-4xl mx-auto mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Build Faster with <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Next.js & HeroUI
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto mb-10 text-lg sm:text-xl text-default-500">
          A scalable, modern, and high-performance starter template built with Next.js App Router, HeroUI v3, and Tailwind CSS v4.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full sm:w-auto font-semibold shadow-lg shadow-primary/30 rounded-full"
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto font-semibold border-default-200 hover:border-default-400 rounded-full"
          >
            Read Documentation
          </Button>
        </div>
      </div>
    </section>
  );
};
