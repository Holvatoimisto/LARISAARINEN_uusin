import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

/**
 * "Miksi Lari?" — siisti kaksipalstainen editoriaalinen luottamusosio.
 * Vasemmalla otsikko, johdanto ja CTA; oikealla muotokuva. Kuvan alla
 * vasemmalla Zansen-kumppanuusmaininta ja oikealla (sm+) KiLAT-
 * tutkintonimike; mobiilissa koko KiLAT-kredentiaali kuvan alla.
 * Muotokuvalla itsellään ei overlay-merkkejä, korttia tai kehystä.
 */
export default function MiksiLariSection() {
  return (
    <section className="bg-secondary/40 pt-16 pb-12 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24" aria-labelledby="miksi-lari-otsikko">
      <div className="container-site">
        <Reveal>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16 xl:gap-20">
            {/* Vasen palsta — sisältö */}
            <div>
              <p className="eyebrow mb-1">Miksi valita minut?</p>
              <h2
                id="miksi-lari-otsikko"
                className="mt-2 text-balance font-display text-[1.7rem] font-bold leading-[1.12] sm:text-[1.95rem] lg:text-[2.1rem]"
              >
                Myy asuntosi vaivattomasti kanssani.
              </h2>
              <p className="mt-4 max-w-lg text-pretty text-[0.95rem] leading-[1.55] text-muted-foreground sm:text-base">
                Minulle tärkeintä on, että kotisi myynti etenee huolellisesti ja tiedät koko ajan,
                missä mennään. KiLAT-koulutus ja monipuolinen taustani tukevat käytännönläheistä ja
                tavoitteellista työotettani.
              </p>
              <p className="mt-3 max-w-lg text-pretty text-[0.95rem] leading-[1.55] text-muted-foreground sm:text-base">
                Pidän sinut ajan tasalla prosessin joka vaiheessa ja teen työni kelloon katsomatta —
                siksi avointen asiakaspalautteideni keskiarvo on 5/5. Ennen välitysuraa olen
                työskennellyt logistiikan, sisustamisen, rakentamisen ja huippuravintoloiden parissa,
                ja tämä kokemus näkyy käytännön osaamisena kohteesi arvioinnista aina kaupantekoon.
              </p>

              <Link
                to="/minusta"
                className="group mt-6 inline-flex h-[52px] items-center justify-center gap-2 rounded-[0.875rem] border border-primary/25 px-7 text-[0.92rem] font-medium tracking-[-0.005em] text-primary transition-colors hover:border-primary/45 hover:bg-primary/5 focus-visible:outline-2 active:translate-y-px"
              >
                Tutustu toimintatapaani
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Oikea palsta — muotokuva + kuvan alapuoliset kredentiaalit */}
            <div className="mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end">
              <div className="relative overflow-hidden rounded-xl border border-border/60">
                <img
                  src="/assets/lari-hero-1400.webp"
                  srcSet="/assets/lari-hero-800.webp 800w, /assets/lari-hero-1400.webp 1400w, /assets/lari-hero-2000.webp 2000w"
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  alt="Lari Saarinen hymyilee Zansen Real Estaten kyltin edessä"
                  className="aspect-[3/2] w-full object-cover object-[62%_center]"
                  loading="lazy"
                />
              </div>

              {/* Kuvan alla: Zansen-logo vasemmalle, KiLAT-tutkintonimike
                  oikealle (sm+). Logo-asset on valkoinen, joten se
                  tumennetaan filtterillä vaalealle taustalle. */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <img
                  src="/assets/logo-zansen.png"
                  alt="Zansen Real Estate"
                  loading="lazy"
                  className="h-6 w-auto brightness-0 opacity-75"
                />
                <p className="hidden text-right text-[0.75rem] leading-snug text-muted-foreground sm:block">
                  Kiinteistönvälitysalan ammattitutkinto
                </p>
              </div>

              {/* Mobiili: koko kredentiaali kompaktisti kuvan alla, ei overlaytä */}
              <div className="mt-4 text-right sm:hidden">
                <span className="ml-auto block h-px w-7 bg-accent" aria-hidden="true" />
                <p className="mt-2 text-[0.59375rem] font-medium tracking-[0.08em] text-primary/70">
                  PÄTEVYYS
                </p>
                <p className="mt-1 font-display text-[1.25rem] font-bold leading-none text-primary">
                  KiLAT
                </p>
                <p className="mt-1.5 text-[0.75rem] leading-snug text-muted-foreground">
                  Kiinteistönvälitysalan ammattitutkinto
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
