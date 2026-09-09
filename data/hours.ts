export interface OpeningHoursRow {
  days: string;
  time: string;
  note?: string;
}

export const openingHours: OpeningHoursRow[] = [
  { days: "Monday – Thursday", time: "11:00 AM – 10:00 PM" },
  { days: "Friday – Saturday", time: "11:00 AM – 11:30 PM", note: "Weekend specials" },
  { days: "Sunday", time: "12:00 PM – 10:00 PM" },
];