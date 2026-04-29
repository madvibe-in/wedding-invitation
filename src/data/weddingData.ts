import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  Camera,
  CalendarClock,
  Car,
  Clock,
  Flower2,
  Gift,
  GlassWater,
  Heart,
  Mail,
  MapPin,
  Music,
  Navigation,
  Phone,
  Plane,
  Shirt,
  Sparkles,
  Sun,
  Train,
  Users,
  Utensils,
  Wine
} from "lucide-react";

export type Accent = "sage" | "lavender" | "champagne" | "blush" | "plum";

export type EventCard = {
  label: string;
  name: string;
  date: string;
  location: string;
  description: string;
  detail: string;
  Icon: LucideIcon;
  accent: Accent;
  dressCode?: boolean;
};

export type InfoPill = {
  Icon: LucideIcon;
  text: string;
};

export type Person = {
  role: string;
  name: string;
  tagline: string;
  description: string;
  favorites: string[];
  signature: string;
  accent: "blush" | "lavender";
  image: string;
  alt: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type TravelRow = {
  Icon: LucideIcon;
  text: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  detail: string;
  Icon: LucideIcon;
};

export const wedding = {
  couple: "Riya & Arjun",
  brideFirst: "Riya",
  groomFirst: "Arjun",
  brideFull: "Riya Sharma",
  groomFull: "Arjun Mehta",
  date: "February 14, 2027",
  datePill: "14 / 02 / 2027",
  dateLong: "Sunday, the Fourteenth of February, Two Thousand and Twenty-Seven",
  venue: "The Grand Leela Palace",
  city: "Hyderabad",
  venueLine: "The Grand Leela Palace, Hyderabad",
  targetDate: "2027-02-14T17:00:00+05:30",
  rsvpDeadline: "January 1, 2027",
  email: "riyaarjun2027@gmail.com",
  phone: "+919999999999",
  heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600",
  venueImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.298!2d78.4306!3d17.4065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9172a3b5b8c5%3A0x1234567890abcdef!2sThe+Leela+Palace+Hyderabad!5e0!3m2!1sen!2sin!4v1234567890",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=The%20Grand%20Leela%20Palace%20Hyderabad"
} as const;

export const navItems = [
  { label: "Our Story", href: "#story" },
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "Venue", href: "#venue" }
] as const;

export const eventCards: EventCard[] = [
  {
    label: "MEHENDI",
    name: "Mehendi Evening",
    date: "February 12, 6:00 PM",
    location: "Garden Terrace, Leela",
    description: "An evening of henna, laughter, and the warmth of loved ones",
    detail: "Henna artists arrive from 5:30 PM",
    Icon: Flower2,
    accent: "sage"
  },
  {
    label: "SANGEET",
    name: "Sangeet Night",
    date: "February 13, 7:00 PM",
    location: "Grand Ballroom, Leela",
    description: "Dance the night away as two families become one",
    detail: "Dinner and performances through the evening",
    Icon: Music,
    accent: "lavender"
  },
  {
    label: "HALDI",
    name: "Haldi Ceremony",
    date: "February 14, 10:00 AM",
    location: "Poolside Pavilion",
    description: "A golden morning ritual blessed by family and tradition",
    detail: "Pastel Indian daywear recommended",
    Icon: Sun,
    accent: "champagne"
  },
  {
    label: "CEREMONY",
    name: "Wedding Ceremony",
    date: "February 14, 6:30 PM",
    location: "Royal Mandap, Leela",
    description: "The sacred union of two souls under a canopy of marigolds",
    detail: "Please be seated by 6:15 PM",
    Icon: Heart,
    accent: "blush"
  },
  {
    label: "RECEPTION",
    name: "Reception Dinner",
    date: "February 14, 9:00 PM",
    location: "Leela Terrace",
    description: "A night of celebration, stars, and timeless memories",
    detail: "Toast, dinner, and dancing",
    Icon: Sparkles,
    accent: "plum"
  },
  {
    label: "DRESS CODE",
    name: "Dress Code",
    date: "All Events",
    location: "Traditional & Black Tie",
    description: "Ceremony: Traditional Indian formals. Reception: Black tie optional",
    detail: "Ceremony palette and evening palette below",
    Icon: Shirt,
    accent: "sage",
    dressCode: true
  }
];

export const infoPills: InfoPill[] = [
  {
    Icon: CalendarClock,
    text: "RSVP by January 1, 2027"
  },
  {
    Icon: BedDouble,
    text: "Complimentary rooms available for outstation guests"
  }
];

export const people: Person[] = [
  {
    role: "Bride",
    name: "Riya Sharma",
    tagline: "The Dreamer",
    description:
      "Riya brings poetry to the ordinary and warmth to every room she enters. She believes the best evenings end with sunset skies, family stories, and one more cup of chai.",
    favorites: ["Sunsets", "Poetry", "Chai"],
    signature: "Riya",
    accent: "blush",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800",
    alt: "Bride in elegant traditional attire with soft natural light"
  },
  {
    role: "Groom",
    name: "Arjun Mehta",
    tagline: "The Adventurer",
    description:
      "Arjun is happiest chasing mountain roads, collecting old songs, and making everyone feel included. His calm humor has been Riya's favorite place to return to since 2021.",
    favorites: ["Mountains", "Music", "Coffee"],
    signature: "Arjun",
    accent: "lavender",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    alt: "Groom portrait in a tailored suit with a warm smile"
  }
];

export const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    alt: "Couple embracing in a romantic outdoor wedding setting"
  },
  {
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600",
    alt: "Wedding couple walking through soft natural light"
  },
  {
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600",
    alt: "Elegant bridal details with flowers"
  },
  {
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600",
    alt: "Couple holding hands during a wedding celebration"
  },
  {
    src: "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=600",
    alt: "Bride and groom in a softly lit portrait"
  },
  {
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
    alt: "Wedding couple laughing together outdoors"
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600",
    alt: "Romantic wedding couple portrait near a ceremony arch"
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
    alt: "Wedding reception table with candles and florals"
  },
  {
    src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600",
    alt: "Bride and groom walking through a garden path"
  },
  {
    src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600",
    alt: "Wedding celebration details with soft champagne tones"
  },
  {
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600",
    alt: "Outdoor wedding ceremony surrounded by guests"
  },
  {
    src: "https://images.unsplash.com/photo-1444171595173-93f25b4b6bc9?w=600",
    alt: "Wedding couple in a cinematic landscape portrait"
  }
];

export const weddingDayTimeline: ScheduleItem[] = [
  {
    time: "10:00",
    title: "Haldi Blessings",
    detail: "A golden morning with family rituals at the poolside pavilion.",
    Icon: Sun
  },
  {
    time: "15:30",
    title: "Guest Welcome",
    detail: "Tea, coolers, and family greetings in the royal lawns.",
    Icon: Users
  },
  {
    time: "17:00",
    title: "Ceremony",
    detail: "The sacred vows begin under the floral mandap.",
    Icon: Heart
  },
  {
    time: "18:30",
    title: "Portraits",
    detail: "Family photographs and couple portraits near the garden arches.",
    Icon: Camera
  },
  {
    time: "19:30",
    title: "Wedding Dinner",
    detail: "A seated vegetarian dinner curated for both families.",
    Icon: Utensils
  }
];

export const receptionTimeline: ScheduleItem[] = [
  {
    time: "20:30",
    title: "Reception Opens",
    detail: "Cocktails, mocktails, and warm welcomes on the terrace.",
    Icon: GlassWater
  },
  {
    time: "21:00",
    title: "Grand Entry",
    detail: "Riya and Arjun arrive for blessings, greetings, and photos.",
    Icon: Sparkles
  },
  {
    time: "21:30",
    title: "Toast & Dinner",
    detail: "Family toasts followed by dinner service.",
    Icon: Wine
  },
  {
    time: "22:30",
    title: "Music & Dance",
    detail: "The dance floor opens for an evening celebration.",
    Icon: Music
  },
  {
    time: "23:30",
    title: "Farewell Favors",
    detail: "Sweet boxes and thank-you favors for every guest.",
    Icon: Gift
  }
];

export const travelRows: TravelRow[] = [
  {
    Icon: Car,
    text: "Valet parking available"
  },
  {
    Icon: Plane,
    text: "30 min from Rajiv Gandhi International Airport"
  },
  {
    Icon: Train,
    text: "15 min from Hyderabad Deccan Station"
  }
];

export const venueAddress = [
  "The Grand Leela Palace",
  "Banjara Hills, Hyderabad",
  "Telangana 500034, India"
] as const;

export const footerLinks = [
  {
    label: "Instagram",
    href: "#",
    kind: "instagram"
  },
  {
    label: "Email Riya and Arjun",
    href: `mailto:${wedding.email}`,
    Icon: Mail
  },
  {
    label: "Call Riya and Arjun",
    href: `tel:${wedding.phone}`,
    Icon: Phone
  }
] as const;

export const venueIcons = {
  Clock,
  MapPin,
  Navigation
};
