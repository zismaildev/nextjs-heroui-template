"use client";

import {
  Modal,
  useOverlayState,
} from "@heroui/react";

import { siteConfig } from "@/config/site";
import pkg from "../../package.json";

interface FooterCompProps {
  appVersion?: {
    project: string;
    client: {
      version: string;
      nextjs: string;
      heroui: string;
      tailwind: string;
    };
    library: {
      api: string;
      "next-core": string;
      database: string;
      utils: string;
    };
    date: { short: string; full: string };
  };
  copyrightText?: string;
  hideCredits?: boolean;
}

export default function FooterComp({
  appVersion: providedAppVersion,
  copyrightText,
  hideCredits = false,
}: FooterCompProps) {
  const state = useOverlayState();

  const appVersion = providedAppVersion || {
    project: pkg.version,
    client: {
      version: pkg.version,
      nextjs: pkg.dependencies.next.replace(/[\^~]/g, ""),
      heroui: pkg.dependencies["@heroui/react"].replace(/[\^~]/g, ""),
      tailwind: (pkg.devDependencies.tailwindcss || "").replace(/[\^~]/g, ""),
    },
    library: {
      api: "1.0.0",
      "next-core": "1.0.0",
      database: "Prisma+Supabase",
      utils: "1.0.0",
    },
    date: { short: "-", full: "-" },
  };

  return (
    <div className="mt-auto w-full">
      <footer className="w-full bg-background border-t border-divider">
        <div className="mx-auto w-full max-w-screen-xl select-none p-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-90">
            {/* ฝั่งซ้าย: Credits & Copyright */}
            <div className="flex flex-col items-center md:items-start text-xs text-default-400 gap-1.5 order-2 md:order-1">
              <p className="font-medium text-default-600 text-sm">
                {copyrightText ||
                  `Copyright ©${new Date().getFullYear()} - Present Zismaial-Hero-Template. All rights reserved`}
              </p>
              {!hideCredits && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-1 text-[11px]">
                  <span>Designed & Developed by</span>
                  <a
                    className="font-bold text-primary hover:underline transition-all"
                    href={siteConfig.links?.githubdeveloper || "#"}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    ZismailDev
                  </a>
                </div>
              )}
            </div>

            {/* ฝั่งขวา: Tools & Socials */}
            <div className="flex items-center gap-4 order-1 md:order-2">
              <div className="flex items-center gap-2.5 border-r border-divider pr-4">
                <a
                  className="text-default-400 hover:text-primary transition-colors duration-200"
                  href={siteConfig.links.facebook}
                  rel="noreferrer"
                  target="_blank"
                  title="Facebook"
                >
                  <svg
                    aria-hidden="true"
                    className="size-4"
                    fill="currentColor"
                    viewBox="0 0 8 19"
                  >
                    <path
                      clipRule="evenodd"
                      d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              {/* Version Pill triggers modal */}
              <div
                className="cursor-pointer select-none bg-default-100 dark:bg-default-50 hover:bg-default-200 dark:hover:bg-default-100 transition-all px-2.5 py-1 rounded-full flex items-center gap-1.5"
                onClick={state.open}
              >
                <p className="text-[10px] font-bold text-default-600">
                  v{appVersion.project}
                </p>
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
              </div>
            </div>

            <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
              <Modal.Backdrop variant="blur">
                <Modal.Container placement="center">
                  <Modal.Dialog className="select-none">
                    <Modal.Header className="flex flex-col">
                      เวอร์ชั่น {appVersion.project}
                    </Modal.Header>
                    <Modal.Body className="pb-6">
                      <ul>
                        <li className="font-bold">เว็บไซต์</li>
                        <li>
                          <small>{appVersion.client.version}</small>
                        </li>
                        <ul className="mx-2 list-none">
                          <li>
                            ┗ เฟรมเวิร์ก
                            <ul className="mx-6 list-disc text-sm">
                              <li>
                                NextJS <small>{appVersion.client.nextjs}</small>
                              </li>
                              <li>
                                HeroUI <small>{appVersion.client.heroui}</small>
                              </li>
                              <li>
                                Tailwind{" "}
                                <small>{appVersion.client.tailwind}</small>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </ul>

                      <ul className="py-2">
                        <li className="font-bold">ไลบรารี</li>
                        <ul className="mx-6 list-disc text-sm">
                          <li>
                            API <small>{appVersion.library.api}</small>
                          </li>
                          <li>
                            Next-Core{" "}
                            <small>{appVersion.library["next-core"]}</small>
                          </li>
                          <li>
                            Database{" "}
                            <small>{appVersion.library.database}</small>
                          </li>
                          <li>
                            Utils <small>{appVersion.library.utils}</small>
                          </li>
                        </ul>
                      </ul>
                    </Modal.Body>
                    <Modal.Footer className="border-t border-divider">
                      <div className="text-right w-full">
                        <p className="font-bold text-sm">อัปเดตล่าสุด</p>
                        <p className="text-xs text-default-500">
                          {appVersion.date.full}
                        </p>
                      </div>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
          </div>
        </div>
      </footer>
    </div>
  );
}
