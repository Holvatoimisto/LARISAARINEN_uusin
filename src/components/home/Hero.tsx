import { Link } from "react-router-dom";
import { Phone, Star } from "lucide-react";
import { site, googleReviews } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

/**
 * Hero — kolmen kuvan hidas Ken Burns -slideshow dominoivana visuaalina,
 * tekstialue max ~600 px vasemmalla. Overlay suunnattu tekstipuolelle (B-18).
 * Tekstit staattisia (B-21). Mobiilissa lyhyt lead, H1 ≤ 3 riviä,
 * CTA-pino (B-20). Desktopilla hero + header = yksi hallittu first
 * screen, trust bridge alkaa heti viewportin jälkeen. Kuvaston alla
 * kompakti luottamusrivi (tähdet + kokemus). Slideshow on puhdas
 * CSS-compositor-animaatio ja pysähtyy prefers-reduced-motion
 * -asetuksella (ensimmäinen kuva jää silloin näkyviin).
 */
const HERO_SLIDES = [
  "/assets/eira-hero-poster.jpg",
  "/assets/helsinki-aerial-1915.webp",
  "/assets/lari-terrace-1400.webp",
] as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[hsl(210_48%_9%)]" aria-labelledby="hero-h1">
      {/* Taustakuvasto — 3 kuvaa, hidas zoom-drift + crossfade (katso .hero-slide) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {HERO_SLIDES.map((src, i) => (
          <div key={src} className="hero-slide" style={{ animationDelay: `${i * 7}s` }}>
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          </div>
        ))}
        {/* Luettavuusgradientti vain tekstipuolelle */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[hsl(210_48%_9%/0.88)] via-[hsl(210_48%_9%/0.52)] to-[hsl(210_48%_9%/0.02)]"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[hsl(210_48%_9%/0.85)] to-transparent sm:h-32 sm:from-[hsl(210_48%_9%/0.35)]" aria-hidden />
      </div>

      {/* Hero täyttää koko ensimmäisen viewportin (header overlay-kiinteä).
          Mobiili: 100svh + dvh-korjaus, sisältö pystykeskitettynä,
          safe-area-varaus alareunaan (iOS Safari). Desktop ennallaan. */}
      <div className="container-site relative flex min-h-[100svh] flex-col justify-center pb-[max(4rem,env(safe-area-inset-bottom))] pt-24 supports-[min-height:100dvh]:min-h-[100dvh] sm:min-h-screen sm:min-h-svh sm:pb-16">
        <div className="max-w-[37.5rem]">
          <p className="eyebrow-dark">
            <span className="sm:hidden">{site.name} · Asuntojen myynti</span>
            <span className="hidden sm:inline">
              {site.name} · {site.title}, pääkaupunkiseutu
            </span>
          </p>
          <h1
            id="hero-h1"
            className="mt-4 text-balance font-display text-[1.875rem] font-bold leading-[1.05] text-white sm:text-5xl sm:leading-[1.08] lg:text-[3.6rem]"
          >
            Kotisi myynti ansaitsee suunnitelman, joka on tehty juuri sille.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/90 sm:mt-5 sm:text-lg">
            <span className="sm:hidden">
              Henkilökohtaista ja aktiivista asuntomyyntiä pääkaupunkiseudulla.
            </span>
            <span className="hidden sm:inline">
              Henkilökohtaista ja aktiivista asuntojen myyntiä pääkaupunkiseudulla.
              Pidän sinut ajan tasalla näytöistä kauppoihin asti.
            </span>
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <Link
              to="/ota-yhteytta"
              onClick={() => trackEvent("hero_cta_click", { location: "hero" })}
              className="inline-flex items-center justify-center rounded-full bg-[hsl(38_44%_61%)] px-8 py-4 text-base font-medium text-[hsl(208_70%_8%)] shadow-[0_16px_40px_-14px_hsl(38_44%_61%/0.7)] transition-all hover:bg-[hsl(38_46%_56%)] hover:shadow-[0_20px_44px_-14px_hsl(38_44%_61%/0.8)]"
            >
              Varaa maksuton arviokäynti
            </Link>
            {/* Mobiili: kevyt tekstilinkki, ei isoa ghost-nappia */}
            <a
              href={site.phoneHref}
              onClick={() => trackEvent("phone_click", { location: "hero" })}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline sm:hidden"
            >
              <Phone className="h-4 w-4" aria-hidden /> Soita Larille: {site.phone}
            </a>
            {/* sm+: alkuperäinen ghost-nappi */}
            <a
              href={site.phoneHref}
              onClick={() => trackEvent("phone_click", { location: "hero" })}
              className="btn-ghost-light hidden sm:inline-flex"
            >
              <Phone className="h-5 w-5" aria-hidden /> Soita Larille: {site.phone}
            </a>
          </div>

          {/* Kompakti luottamusrivi — mobiilissa tiivis kaksi riviä,
              desktopilla alkuperäinen vaakarivi */}
          <div className="mt-5 flex flex-col gap-1 text-sm sm:mt-6 sm:flex-row sm:items-center sm:gap-0 sm:text-[0.95rem]">
            <div className="flex items-center gap-2 text-white">
              <span className="flex items-center gap-0.5" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-[hsl(38_44%_61%)]"
                    fill="currentColor"
                  />
                ))}
              </span>
              <span className="font-medium">{googleReviews.rating.toFixed(1)}/5</span>
              <span className="text-white/70">· {googleReviews.count} arvostelua</span>
            </div>
            <span
              className="hidden h-4 w-px bg-white/25 sm:mx-6 sm:block"
              aria-hidden="true"
            />
            <div className="text-white">
              <span className="font-medium">{site.experienceYears}+ vuotta</span>
              <span className="text-white/70">
                {" "}
                kokemusta<span className="hidden sm:inline"> asuntomyynnistä</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
