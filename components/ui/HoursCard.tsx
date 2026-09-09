import { Clock } from "lucide-react";
import { openingHours } from "@/data/hours";

export default function HoursCard() {
  return (
    <div className="rounded-3xl border border-beige bg-cream-light p-6 shadow-soft sm:p-7">
      <h3 className="flex items-center gap-2.5 font-serif text-xl text-charcoal">
        <span className="flex size-10 items-center justify-center rounded-xl bg-charcoal text-cream-light">
          <Clock size={18} />
        </span>
        Opening Hours
      </h3>
      <ul className="mt-6 space-y-4">
        {openingHours.map((row) => (
          <li key={row.days} className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-charcoal">{row.days}</p>
              {row.note ? (
                <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-terracotta">
                  {row.note}
                </p>
              ) : null}
            </div>
            <p className="shrink-0 text-sm tabular-nums text-stone-dark">
              {row.time}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}