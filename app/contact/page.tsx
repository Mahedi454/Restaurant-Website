import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import MapPlaceholder from "@/components/contact/MapPlaceholder";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with iFOODS — questions, reservations, events, or just to say hello. Find our address, phone, hours, and socials.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd Love to Hear From You"
        description="Questions, events, feedback, or just to say hello — someone from the restaurant replies within the day."
        image="/images/gallery-6.svg"
      />
      <section className="bg-cream py-20 sm:py-24" aria-labelledby="contact-form-heading">
        <Container>
          <SectionHeading
            id="contact-form-heading"
            eyebrow="Get in Touch"
            title="Send Us a Message"
            description="Fill in the form and we'll get back to you — or call before service for anything urgent."
          />
          <div className="mt-12 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
            <Reveal delay={0.1} className="flex">
              <div className="w-full flex-1">
                <ContactForm />
              </div>
            </Reveal>
            <Reveal delay={0.18} className="flex">
              <div className="w-full flex-1">
                <ContactInfo />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
      <MapPlaceholder />
    </>
  );
}