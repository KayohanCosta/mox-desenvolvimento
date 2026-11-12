import { Footer } from "@/components/footer";
import "@fontsource-variable/inter";
import type { Metadata, Viewport } from "next";
import { ScrollThread } from "@/components/scroll-thread";
import { SiteMotion } from "@/components/motion";
import { RouteScroll } from "@/components/route-scroll";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/ui";
import { contacts, siteUrl, indexable } from "@/lib/site";
import "./globals.css";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090B",
};
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MOX. | Desenvolvimento web em Fortaleza",
    template: "%s | MOX.",
  },
  robots: { index: indexable, follow: true },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  applicationName: "MOX.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <a href="#conteudo" className="skip">
          Pular para o conteúdo
        </a>
        <RouteScroll />
        <SiteMotion />
        <ScrollThread />
        <Header />
        {children}
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${siteUrl}/#organization`,
                name: "MOX.",
                telephone: "+5585998213158",
                email: contacts.email,
                sameAs: [contacts.instagramUrl],
                url: siteUrl,
                description:
                  "Desenvolvimento de sites, aplicativos e sistemas web em Fortaleza, com atendimento online em todo o Brasil.",
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}/logo.svg`,
                  width: 504,
                  height: 130,
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+5585920118493",
                  email: contacts.email,
                  contactType: "sales",
                  availableLanguage: "pt-BR",
                  areaServed: "BR",
                },
                areaServed: { "@type": "City", name: "Fortaleza" },
              },
              {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                name: "MOX.",
                url: siteUrl,
                inLanguage: "pt-BR",
                publisher: { "@id": `${siteUrl}/#organization` },
              },
            ],
          }}
        />
      </body>
    </html>
  );
}
