import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import {
  footerMenuLinks,
  footerQuickLinks,
  mainNavigation,
} from "@/data/navigation";
import { siteConfig } from "@/data/site";
import NewsletterForm from "@/components/layout/NewsletterForm";
import Container from "@/components/ui/Container";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
} from "@/components/ui/SocialIcons";

const socialLinks = [
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.socials.facebook, Icon: FacebookIcon },
  { label: "X (Twitter)", href: siteConfig.socials.twitter, Icon: XIcon },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream-light">
      <Container className="pt-16 sm:pt-20">
        <div className="grid gap-12 pb-16 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-tight">
                i<span className="text-terracotta-light">FOODS</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-light/60">
              {siteConfig.description}
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-cream-light/15 text-cream-light/70 transition-colors duration-300 hover:border-terracotta-light hover:text-terracotta-light"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-light/50">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {footerQuickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-light/75 transition-colors hover:text-terracotta-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-light/50">
              The Menu
            </h3>
            <ul className="mt-5 space-y-3">
              {footerMenuLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-light/75 transition-colors hover:text-terracotta-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & hours */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-light/50">
              Visit Us
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-cream-light/75">
              <li className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-terracotta-light" />
                <span>{siteConfig.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 transition-colors hover:text-terracotta-light"
                >
                  <Phone size={17} className="shrink-0 text-terracotta-light" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-terracotta-light"
                >
                  <Mail size={17} className="shrink-0 text-terracotta-light" />
                  {siteConfig.email}
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream-light/50">
                <Clock size={14} className="text-terracotta-light" />
                Opening Hours
              </h4>
              <ul className="mt-3 space-y-1.5 text-sm text-cream-light/75">
                {siteConfig.hours.map((slot) => (
                  <li key={slot.days} className="flex justify-between gap-4">
                    <span>{slot.days}</span>
                    <span className="text-cream-light/50">{slot.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-cream-light/10 py-12 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div className="max-w-md">
            <h3 className="text-lg text-cream-light">Stay in the loop</h3>
            <p className="mt-2 text-sm text-cream-light/60">
              Seasonal menus, private events and exclusive offers — straight to
              your inbox.
            </p>
          </div>
          <div className="mt-6 sm:mt-0 sm:w-full sm:max-w-sm">
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream-light/10 py-8 sm:flex-row">
          <p className="text-sm text-cream-light/50">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {mainNavigation.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-cream-light/50 transition-colors hover:text-cream-light"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}