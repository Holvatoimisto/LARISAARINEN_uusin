import { useState } from "react";
import { Star, Quote, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { homepageReviews, type Review } from "@/data/reviews";
import { site, googleReviews } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-0.5", className)} aria-label="5/5 tähteä" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-[hsl(38_44%_61%)] text-[hsl(38_44%_61%)]" aria-hidden />
      ))}
    </span>
  );
}

export function ReviewCard({
  review,
  className,
  variant = "darkGlass",
}: {
  review: Review;
  className?: string;
  /** darkGlass (oletus, koko sivuston korttityyli) | light (vaalea variaatio) */
  variant?: "light" | "darkGlass";
}) {
  const dark = variant === "darkGlass";
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-xl border px-7 py-6",
        dark
          ? // Lähes peittävä navy-gradientti yhtenä background-image -luokkana —
            // ei erillistä bg-color + bg-gradient -paria, koska tailwind-merge
            // kuitelisi toisen niistä pois cn()-yhdistelmässä (aiheutti
            // läpinäkyvän/valkoiseksi näkyvän kortin).
            "border-white/10 bg-[linear-gradient(145deg,rgba(23,53,80,0.98)_0%,rgba(11,31,51,0.98)_55%,rgba(7,21,34,0.99)_100%)] shadow-[0_24px_50px_-24px_hsl(208_66%_8%/0.55)] ring-1 ring-inset ring-white/5 backdrop-blur-sm"
          : "border-border bg-card",
        className,
      )}
    >
      <Quote
        className={cn("h-5 w-5", dark ? "text-[hsl(38_44%_61%/0.7)]" : "text-primary/30")}
        aria-hidden
      />
      <blockquote className="mb-6 mt-4" lang={review.lang === "en" ? "en" : undefined}>
        <p className={cn("text-[0.95rem] leading-relaxed", dark ? "text-white/90" : "text-foreground/90")}>
          {review.quote}
        </p>
      </blockquote>
      <figcaption
        className={cn(
          "mt-auto flex items-end justify-between gap-3 border-t pt-5",
          dark ? "border-white/10" : "border-border",
        )}
      >
        <div>
          <p className={cn("text-sm font-medium", dark ? "text-white" : "text-foreground")}>{review.author}</p>
          <p className={cn("mt-0.5 text-xs", dark ? "text-white/70" : "text-muted-foreground")}>
            {review.role === "myyjä" ? "Myyjä" : "Ostaja"}
            {review.location ? ` · ${review.location}` : ""}
            {review.lang === "en" ? " · in English" : ""}
          </p>
          <p className={cn("mt-1 text-[0.7rem]", dark ? "text-white/55" : "text-muted-foreground/80")}>
            {review.source === "Oikotie" ? "Oikotie-palaute" : "larisaarinen.fi"}
          </p>
        </div>
        <Stars />
      </figcaption>
    </figure>
  );
}

/**
 * Etusivun palaute-osio — neljäsivuinen karuselli (B-12):
 * 10 kuratoitua lyhyttä/keskipitkää vahvistettua palautetta
 * (homepageReviews, pituuspoikkeamat jätetty etusivulta pois),
 * kolme korttia per sivu, ei autoplayta, ei loopausta.
 * Desktopilla yksi vakaa korttikorkeus (lg:h-[420px]) → osion korkeus
 * ei muutu sivunvaihdossa; tablet/mobiili luonnollinen korkeus.
 * Otsikkoryhmä keskitettynä korttien yläpuolelle, lähdeviite jokaisessa
 * kortissa, alla ulkoiset lähdelinkit (Google + Oikotie) saman tyylisinä.
 * Liike vain transformilla (translate3d), yksi sivu per klikkaus.
 */
export default function ReviewsSection() {
  const [page, setPage] = useState(0);

  const pages: Review[][] = [];
  for (let i = 0; i < homepageReviews.length; i += 3) {
    pages.push(homepageReviews.slice(i, i + 3));
  }
  const maxPage = pages.length - 1;

  const arrowClass =
    "h-11 w-11 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground shadow-[0_10px_26px_-12px_hsl(208_66%_12%/0.5)] transition-colors hover:bg-primary/90 focus-visible:outline-2";

  return (
    <section className="pb-12 pt-12 sm:pb-20 sm:pt-16 lg:pt-20" aria-labelledby="palautteet-otsikko">
      <div className="container-site">
        {/* Otsikkoryhmä keskitettynä korttien yläpuolelle. */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="palautteet-otsikko"
            className="text-balance font-display text-3xl font-bold leading-[1.15] sm:text-4xl"
          >
            Mitä asiakkaani kertovat yhteistyöstä
          </h2>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <Stars />
            <span>
              Google-arvosana {googleReviews.ratingDisplay} · {googleReviews.count} arvostelua
            </span>
          </p>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Palautteet ovat muokkaamattomia ja niiden lähteet ovat nähtävissä Oikotie-profiilissani.
          </p>
        </div>

        {/* Karuselli — sivunuolet md+ korttirivin sivuilla, mobiilissa
            nuolit ovat edistymisrivillä pisteiden kanssa */}
        <div className="relative mt-6 sm:mt-8 lg:mt-10" role="region" aria-roledescription="karuselli" aria-label="Arvostelut">
          {page > 0 && (
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              aria-label="Edelliset kolme arvostelua"
              className={`absolute -left-5 top-1/2 z-10 hidden -translate-y-1/2 md:flex ${arrowClass}`}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
          )}

          <div className="overflow-hidden">
            <div
              className="flex items-start transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translate3d(-${page * 100}%, 0, 0)` }}
            >
              {pages.map((pageReviews, pi) => (
                <div
                  key={pi}
                  className="grid w-full flex-none grid-cols-1 gap-5 md:grid-cols-3"
                  aria-hidden={pi !== page}
                >
                  {pageReviews.map((r) => (
                    <ReviewCard key={r.author + r.quote.slice(0, 12)} review={r} variant="darkGlass" className="lg:h-[420px]" />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {page < maxPage && (
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
              aria-label="Seuraavat kolme arvostelua"
              className={`absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 md:flex ${arrowClass}`}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          )}
        </div>

        {/* Edistymisindikaattori + mobiilinuolet */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center md:hidden">
            {page > 0 && (
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                aria-label="Edelliset kolme arvostelua"
                className={`flex ${arrowClass}`}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
            )}
          </span>
          <div className="flex items-center gap-2" role="group" aria-label="Arvostelusivut">
            {pages.map((_, pi) => (
              <button
                key={pi}
                type="button"
                onClick={() => setPage(pi)}
                aria-label={`Sivu ${pi + 1} / ${pages.length}`}
                aria-current={pi === page}
                className="review-dot h-2 w-2 rounded-full bg-primary/25 transition-[width,background-color] duration-300 hover:bg-primary/50 focus-visible:outline-2"
              />
            ))}
          </div>
          <span className="flex h-11 w-11 items-center justify-center md:hidden">
            {page < maxPage && (
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                aria-label="Seuraavat kolme arvostelua"
                className={`flex ${arrowClass}`}
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            )}
          </span>
        </div>

        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          <a
            href={googleReviews.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("review_link_click", { location: "reviews_section_google" })}
            className="link-quiet inline-flex items-center gap-1.5 font-medium text-muted-foreground"
          >
            Palautteet Googlessa <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
          <a
            href={site.oikotieProfile}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("review_link_click", { location: "reviews_section" })}
            className="link-quiet inline-flex items-center gap-1.5 font-medium text-muted-foreground"
          >
            Palautteet Oikotie-profiilissa <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </p>
      </div>
    </section>
  );
}
