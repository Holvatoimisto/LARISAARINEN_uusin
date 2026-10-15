import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";
import { initAnalyticsFromConsent } from "@/lib/analytics";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  useEffect(() => {
    initAnalyticsFromConsent();
  }, []);
  return (
    <>
      <a
        href="#sisalto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Siirry sisältöön
      </a>
      <Header />
      <main id="sisalto">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
      <ScrollToTop />
    </>
  );
}
