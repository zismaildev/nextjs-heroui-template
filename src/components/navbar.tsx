"use client";

import { useState } from "react";
import {
    Button,
    Link as HeroUILink,
} from "@heroui/react";
import { linkVariants } from "@heroui/styles";
import NextLink from "next/link";
import NextImage from "next/image";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "./theme-switch";

const Logo = () => (
    <NextImage
        src="/favicon.ico"
        alt="AureliaX-Core Logo"
        width={36}
        height={36}
        className="object-contain"
        priority
    />
);

const MenuIcon = () => (
    <svg
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <line x1="3" x2="21" y1="12" y2="12" />
        <line x1="3" x2="21" y1="6" y2="6" />
        <line x1="3" x2="21" y1="18" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <line x1="18" x2="6" y1="6" y2="18" />
        <line x1="6" x2="18" y1="6" y2="18" />
    </svg>
);

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const linkSlots = linkVariants({ color: "foreground" });

    return (
        <header className="sticky top-0 z-50 w-full border-b border-default bg-background/80 backdrop-blur-md transition-colors duration-500">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                {/* Left side: Brand & Desktop Links */}
                <div className="flex items-center gap-6">
                    <Button
                        isIconOnly
                        variant="ghost"
                        className="lg:hidden"
                        onPress={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </Button>

                    <NextLink href="/" className="flex items-center gap-2">
                        <Logo />
                        <p className="font-bold text-inherit">{siteConfig.name}</p>
                    </NextLink>

                    <nav className="hidden lg:flex items-center gap-4">
                        {siteConfig.navItems.map((item) => {
                            return (
                                <NextLink
                                    key={item.href}
                                    href={item.href}
                                    className={linkSlots.base({
                                        className:
                                            "data-[active=true]:text-accent data-[active=true]:font-medium text-sm",
                                    })}
                                >
                                    {item.title}
                                </NextLink>
                            );
                        })}
                    </nav>
                </div>

                {/* Right side: Search & Profile */}
                <div className="flex items-center gap-4">
                    <ThemeSwitch />
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-surface border-b border-default p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
                    {siteConfig.navItems.map((item) => {
                        return (
                            <HeroUILink
                                key={item.href}
                                href={item.href}
                                className="text-foreground"
                                onPress={() => setIsMenuOpen(false)}
                            >
                                {item.title}
                            </HeroUILink>
                        );
                    })}
                </div>
            )}
        </header>
    );
};
