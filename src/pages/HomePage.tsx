import { site } from "@/data/site";
// import { homeFaqs } from "@/data/faqs"; // FAQ piilotettu väliaikaisesti
import { useSeo, personSchema, websiteSchema, localBusinessSchema } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import MiksiLariSection from "@/components/home/MiksiLariSection";
import ReviewsSection from "@/components/Reviews";
// import SellingApproach from "@/components/home/SellingApproach"; // piilotettu väliaikaisesti
import ServicePaths from "@/components/home/ServicePaths";
import Process from "@/components/home/Process";
import ListingsTeaser from "@/components/home/ListingsTeaser";
// import FaqSection from "@/components/FaqSection"; // piilotettu väliaikaisesti
import CtaSection from "@/components/CtaSection";

/**
 * Etusivu — osiot auditoidun flow'n mukaan:
 * 1 Hero · 2 Miksi Lari? · 3 Arvostelut · 4 Myyntitapa · 5 Palvelupolut ·
 * 6 Kohteet-teaser · 7 Prosessi · 8 Loppu-CTA.
 * (FAQ-osio piilotettu väliaikaisesti — säilyy kommenttina alla.)
 * Osiorytmit vaihtelevat (compact/standard/emotional) ja rakenteet rikkovat
 * aiemman eyebrow+H2+kortit-kaavan (B-08).
 */
export default function HomePage() {
  useSeo({
    title: `${site.name} | Asuntojen myynti pääkaupunkiseudulla · ${site.company}`,
    description:
      "Henkilökohtaista ja aktiivista asuntojen myyntiä pääkaupunkiseudulla. Google-arvosana 5,0/5. Välittämisestä välittämistä. Varaa maksuton arviokäynti.",
    path: "/",
    image: "/assets/og-image.jpg",
    jsonLd: [personSchema, websiteSchema, localBusinessSchema],
  });

  return (
    <>
      <Hero />
      <div id="esittelyvideo">
        <MiksiLariSection />
      </div>
      <ReviewsSection />
      {/* "Näin kotisi myynti rakennetaan" -osio piilotettu väliaikaisesti.
          Komponentti säilyy käytössä myyntisivulla (AsunnonMyyntiPage). */}
      {/* <SellingApproach /> */}
      <ServicePaths />
      <ListingsTeaser />
      <Process />
      {/* FAQ-osio ("Usein kysytyt kysymykset") piilotettu väliaikaisesti.
          Komponentti ja data säilyvät — palautettavissa ottamalla kommentti pois. */}
      {/* <FaqSection faqs={homeFaqs} /> */}
      <CtaSection
        variant="full"
        title="Tavataanko kohteellasi?"
        text="Kerro tilanteesi. Saat perustellun hinta-arvion ja selkeän ehdotuksen myyntisuunnitelmaksi, ilman sitoumuksia."
      />
    </>
  );
}
