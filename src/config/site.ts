export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Zismaial-Hero-Template",
    description: "Zismaial-Hero-Template is a Next.js template that uses TypeScript, TailwindCSS, and HeroUI.",
    url: "#",
    icon: "/favicon.ico",
    author: "ZismailDev",
    keywords: ["nextjs", "react", "typescript", "tailwindcss", "heroui"],
    navItems: [
        {
            title: "About",
            href: "/about",
        },
        {
            title: "Projects",
            href: "/projects",
        },
        {
            title: "Contact",
            href: "/contact",
        },
    ],
    navMenuItems: [
        {
            title: "About",
            href: "/about",
        },
        {
            title: "Projects",
            href: "/projects",
        },
        {
            title: "Contact",
            href: "/contact",
        },
    ],
    links: {
        facebook: "#",
        instagram: "#",
        email: "example@gmail.com",
        githubdeveloper: "https://github.com/ZismailDev",
    },
}