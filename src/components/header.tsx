"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { services } from "@/lib/site";
export function Header() {
  const [open, setOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (!dropdown.current?.contains(event.target as Node))
        setServicesOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);
  const pathname = usePathname();
  function close() {
    setOpen(false);
    setServicesOpen(false);
  }
  return (
    <header
      className="header wrap"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          if (servicesOpen) {
            setServicesOpen(false);
            trigger.current?.focus();
          } else {
            close();
            event.currentTarget
              .querySelector<HTMLButtonElement>(".menu-toggle")
              ?.focus();
          }
        }
      }}
    >
      <Link
        href="/"
        className="logo"
        aria-label="MOX. — início"
        onClick={close}
      >
        <Image src="/logo.svg" alt="MOX." width={504} height={130} priority />
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Fechar" : "Menu"}
      </button>
      <nav
        id="navigation"
        className={open ? "nav open" : "nav"}
        aria-label="Principal"
      >
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          onClick={close}
        >
          Início
        </Link>
        <div
          className="nav-services"
          ref={dropdown}
          onBlur={(event) => {
            if (
              event.relatedTarget &&
              !event.currentTarget.contains(event.relatedTarget as Node)
            )
              setServicesOpen(false);
          }}
        >
          <button
            ref={trigger}
            className="services-toggle"
            aria-expanded={servicesOpen}
            aria-controls="service-navigation"
            onClick={() => setServicesOpen((value) => !value)}
          >
            Soluções <span aria-hidden="true">⌄</span>
          </button>
          <div
            id="service-navigation"
            className="nav-service-list"
            hidden={!servicesOpen}
          >
            <p className="eyebrow">O QUE VAMOS CONSTRUIR?</p>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                aria-current={
                  pathname === `/${service.slug}` ? "page" : undefined
                }
                onClick={close}
              >
                {service.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
        <Link
          href="/portfolio"
          aria-current={pathname === "/portfolio" ? "page" : undefined}
          onClick={close}
        >
          Portfólio
        </Link>
        <Link
          href="/sobre"
          aria-current={pathname === "/sobre" ? "page" : undefined}
          onClick={close}
        >
          Sobre a MOX.
        </Link>
        <Link
          className="nav-cta"
          href="/contato"
          aria-current={pathname === "/contato" ? "page" : undefined}
          onClick={close}
        >
          Contato <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
