import { Mail, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { siteConfig } from "@/data/site";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
} from "@/components/ui/SocialIcons";

const details = [
  {
    Icon: MapPin,
    label: "Address",
    value: siteConfig.address,
    href: undefined as string | undefined,
  },
  { Icon: Phone, label: "Phone", value: siteConfig.phone, href: "tel:+15550123456" },
  { Icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
];

const socials = [
  { name: "Instagram", href: siteConfig.socials.instagram, Icon: InstagramIcon },
  { name: "Facebook", href: siteConfig.socials.facebook, Icon: FacebookIcon },
  { name: "X (Twitter)", href: siteConfig.socials.twitter, Icon: XIcon },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <div className="rounded-3xl border border-beige bg-cream-light p-6 shadow-soft sm:p-7">
          <h3 className="font-serif text-xl text-charcoal">Contact Information</h3>
          <ul className="mt-5 space-y-5">
            {details.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-charcoal text-cream-light">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-stone">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-1 block text-sm font-medium text-charcoal underline-offset-4 transition-colors hover:text-terracotta hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-charcoal">
                      {value}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="rounded-3xl border border-beige bg-cream-light p-6 shadow-soft sm:p-7">
          <h3 className="font-serif text-xl text-charcoal">Follow Along</h3>
          <p className="mt-2 text-sm text-stone-dark">
            Behind-the-pass photos, menu drops, and the occasional good-humored
            rant about croutons.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-charcoal/15 px-4 text-sm font-medium text-charcoal transition-all duration-300 hover:border-terracotta hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream-light"
              >
                <Icon size={15} />
                {name}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}