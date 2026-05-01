"use client";

import { useState } from "react";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { Button, Link as HeroUILink } from "@heroui/react";
import { ThemeSwitch } from "./theme-switch";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-default bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                {/* Brand / Logo */}
                <div className="flex items-center gap-8">
                    <NextLink href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            {siteConfig.name}
                        </span>
                    </NextLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {siteConfig.navItems.map((item) => (
                            <NextLink
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                            >
                                {item.title}
                            </NextLink>
                        ))}
                    </nav>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex gap-2">
                        <ThemeSwitch />
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-default bg-background md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-x-0 top-16 z-40 h-[calc(100vh-64px)] bg-background p-6 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <nav className="flex flex-col gap-4">
                        {siteConfig.navMenuItems.map((item) => (
                            <NextLink
                                key={item.href}
                                href={item.href}
                                className="text-lg font-semibold text-foreground/80 hover:text-foreground"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.title}
                            </NextLink>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};