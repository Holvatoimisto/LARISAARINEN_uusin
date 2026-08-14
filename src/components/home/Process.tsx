import { sellingProcess } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Myyntiprosessi — kompakti vuorotteleva timeline:
 * keskiviiva (desktop) / vasen viiva (mobiili), jokaisen vaiheen
 * kohdalla pieni pyöreä numero-node. Vaiheet vuorottelevat:
 * 01/03/05 media vasemmalla + teksti oikealla,
 * 02/04/06 teksti vasemmalla + media oikealla.
 * Tekstit asettuvat aina keskiviivaa kohti.
 *
 * Kompaktius: media max 400 px leveä, 4:3-rajaus desktopilla
 * (16:10 mobiilissa), copy 2–4 riviä, riviväli 56 px.
 * Finaalivaiheen 06 kättelykuva vahvistaa visuaalisesti kaupanteon,
 * luottamuksen ja henkilökohtaisen jälkiseurannan teemaa.
 * Vaiheen 03 median paikalla on kanavapaneeli: kuusi
 * markkinointikanavan logo-assetsia 3×2-gridissä reunasta
 * reunaan, ei nimitekstejä.
 */
type StepVisual =
  | { kind: "image"; src: string; alt: string; pos?: string }
  | { kind: "panel"; tone: "light" | "navy" }
  | { kind: "channels" };

const stepVisuals: StepVisual[] = [
  { kind: "image", src: "/assets/lari-studio-1100.webp", alt: "Lari Saarinen" },
  {
    kind: "image",
    src: "/assets/lari-landscape-1280.webp",
    alt: "Lari Saarinen Zansenin toimistolla",
  },
  { kind: "channels" },
  {
    kind: "image",
    src: "/assets/alue-aerial-1600.webp",
    alt: "Ilmakuva helsinkiläisestä asuinalueesta",
  },
  {
    kind: "image",
    src: "/assets/lari-neuvottelu.jpg",
    alt: "Lari Saarinen puhelimessa",
    // Pystykuva (4:5) 4:3-rajauskehyksessä: painotetaan yläosaa,
    // jotta kasvot ja puhelin pysyvät näkyvissä.
    pos: "object-[center_15%]",
  },
  {
    kind: "image",
    src: "/assets/kaupanteko-kattely.webp",
    alt: "Onnistuneen asuntokaupan osapuolet kättelevät",
  },
];

/**
 * Markkinointikanavat vaiheen 03 paneeliin — pelkät logot
 * 3×2-gridissä, ei nimitekstejä. Logot ovat prosessoituja
 * "tile"-versioita (public/assets/logos/): yhtenäinen valkoinen
 * tausta ja app-icon-koko jokaiselle + saturaatio himmennetty
 * (0.55), jotta paneeli pysyy koheesiivisena muun osion kanssa.
 */
const channels = [
  { name: "Oikotie", src: "/assets/logos/oikotie.jpg" },
  { name: "Etuovi", src: "/assets/logos/etuovi.jpg" },
  { name: "Facebook", src: "/assets/logos/facebook.jpg" },
  { name: "Instagram", src: "/assets/logos/instagram.jpg" },
  { name: "LinkedIn", src: "/assets/logos/linkedin.jpg" },
  { name: "Google", src: "/assets/logos/google.jpg" },
] as const;

const mediaFrame =
  "w-full rounded-2xl border shadow-[0_14px_36px_-24px_hsl(208_66%_12%/0.3)]";

export default function Process() {
  return (
    <section className="section-standard bg-secondary/40" aria-labelledby="prosessi-otsikko">
      <div className="container-site">
        <div className="max-w-2xl">
          <h2
            id="prosessi-otsikko"
            className="text-balance font-display text-3xl font-bold leading-[1.15] sm:text-4xl"
          >
            Näin asuntosi myynti etenee
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Kuusi selkeää vaihetta. Tiedät aina, missä mennään ja mitä seuraavaksi tapahtuu.
          </p>
        </div>

        <ol className="relative mt-10 md:mt-12">
          {/* Timeline-viiva: mobiilissa vasemmalla nodien kohdalla, md+ keskellä. */}
          <span
            aria-hidden
            className="absolute bottom-2 left-[19px] top-2 w-px bg-primary/15 md:left-1/2"
          />

          {sellingProcess.map((s, i) => {
            const num = String(s.step).padStart(2, "0");
            const finale = s.step === 6;
            const visual = stepVisuals[i];
            const mediaLeft = i % 2 === 0;
            return (
              <li
                key={s.step}
                className="relative mt-10 first:mt-0 md:mt-14 md:grid md:grid-cols-2 md:items-center md:gap-x-14 lg:gap-x-20"
              >
                {/* Node timeline-viivalla */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border font-display text-sm font-bold md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
                    finale
                      ? "border-[hsl(38_44%_61%/0.5)] bg-[hsl(208_66%_12%)] text-[hsl(38_44%_61%)]"
                      : "border-border bg-card text-primary/80",
                  )}
                >
                  {num}
                </span>

                {/* Tekstipuoli — asettuu keskiviivaa kohti */}
                <div
                  className={cn(
                    "pl-14 md:pl-0",
                    mediaLeft ? "md:order-2" : "md:order-1 md:text-right",
                  )}
                >
                  <h3 className="font-sans text-lg font-medium leading-snug tracking-[-0.01em] md:text-xl">
                    {s.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 max-w-md text-sm leading-relaxed text-muted-foreground",
                      !mediaLeft && "md:ml-auto",
                    )}
                  >
                    {s.text}
                  </p>
                </div>

                {/* Mediapuoli — kuva tai kanavapaneeli */}
                <div
                  className={cn(
                    "ml-14 mt-5 w-full md:ml-0 md:mt-0 md:max-w-[320px] lg:max-w-[400px]",
                    mediaLeft ? "md:order-1 md:justify-self-end" : "md:order-2 md:justify-self-start",
                  )}
                >
                  {visual.kind === "image" ? (
                    <img
                      src={visual.src}
                      alt={visual.alt}
                      loading="lazy"
                      className={cn(
                        mediaFrame,
                        "aspect-[16/10] border-border/70 object-cover md:aspect-[4/3]",
                        visual.pos,
                      )}
                    />
                  ) : visual.kind === "channels" ? (
                    <div
                      className={cn(
                        mediaFrame,
                        "aspect-[16/10] overflow-hidden border-border/70 bg-white md:aspect-[4/3]",
                      )}
                    >
                      <ul className="grid h-full grid-cols-3 grid-rows-2">
                        {channels.map((c) => (
                          <li key={c.name}>
                            <img
                              src={c.src}
                              alt={c.name}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div
                      aria-hidden
                      className={cn(
                        mediaFrame,
                        "flex aspect-[16/10] items-center justify-center md:aspect-[4/3]",
                        visual.tone === "navy"
                          ? "border-white/10 bg-[linear-gradient(150deg,rgb(23_53_80)_0%,rgb(11_31_51)_55%,rgb(7_21_34)_100%)]"
                          : "border-border/70 bg-card",
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-7xl font-bold",
                          visual.tone === "navy"
                            ? "text-[hsl(38_44%_61%/0.3)]"
                            : "text-primary/[0.08]",
                        )}
                      >
                        {num}
                      </span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
