export type Vertical = {
  id: string;
  name: string;
  shortName: string;
  status: "live" | "pipeline";
  friction: string;
  detail: string;
};

export const VERTICALS: Vertical[] = [
  {
    id: "childcare",
    name: "Preschools & Childcare",
    shortName: "Childcare",
    status: "live",
    friction: "Staff ratios, call-outs, and break rules — tracked on paper and prayer.",
    detail:
      "Oliver keeps every classroom in ratio, tracks call-outs, and enforces break rules across multiple sites — from one screen. Live at Bright Beginnings Preschool, Charlottesville, VA.",
  },
  {
    id: "restaurants",
    name: "Restaurants & Cafés",
    shortName: "Restaurants",
    status: "pipeline",
    friction: "Shift swaps in group texts. Prep lists on the office door.",
    detail: "In the workshop.",
  },
  {
    id: "auto",
    name: "Auto Repair",
    shortName: "Auto Repair",
    status: "pipeline",
    friction: "Bay scheduling and parts tracking spread across three notebooks.",
    detail: "In the workshop.",
  },
  {
    id: "landscaping",
    name: "Landscaping",
    shortName: "Landscaping",
    status: "pipeline",
    friction: "Crew routes and weather calls made by 6 a.m. phone tree.",
    detail: "In the workshop.",
  },
  {
    id: "cleaning",
    name: "Cleaning Services",
    shortName: "Cleaning",
    status: "pipeline",
    friction: "Who's at which site, with which keys, on which day.",
    detail: "In the workshop.",
  },
  {
    id: "salons",
    name: "Salons",
    shortName: "Salons",
    status: "pipeline",
    friction: "Chair schedules, walk-ins, and product counts that never match.",
    detail: "In the workshop.",
  },
  {
    id: "tutoring",
    name: "Tutoring",
    shortName: "Tutoring",
    status: "pipeline",
    friction: "Session scheduling and parent updates eating the evening.",
    detail: "In the workshop.",
  },
  {
    id: "retail",
    name: "Boutique Retail",
    shortName: "Retail",
    status: "pipeline",
    friction: "Inventory in one system, orders in another, neither correct.",
    detail: "In the workshop.",
  },
  {
    id: "trades",
    name: "Trades",
    shortName: "Trades",
    status: "pipeline",
    friction: "Quotes, jobs, and invoices living in a truck cab.",
    detail: "In the workshop.",
  },
  {
    id: "petcare",
    name: "Pet Care",
    shortName: "Pet Care",
    status: "pipeline",
    friction: "Bookings, vaccination records, and feeding notes on index cards.",
    detail: "In the workshop.",
  },
];
