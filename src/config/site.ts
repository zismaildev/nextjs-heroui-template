export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Heroui Template",
    description: "heroui template for nextjs 16",
    url: "#",
    icon: "/favicon.ico",
    author: "Nattapong Panthiya",
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
        github: "https://github.com/ZismailDev",
        linkedin: "#",
        email: "nattapong130247@gmail.com",
    },
}