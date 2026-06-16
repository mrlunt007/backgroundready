/** Site imagery — paths under /public/images */

export const IMAGES = {
  officeAtrium: {
    src: "/images/office-atrium.png",
    alt: "Modern office building atrium viewed from above, with professionals working inside",
  },
  officeCollaboration: {
    src: "/images/office-collaboration.png",
    alt: "Team of professionals collaborating at a bright modern office desk",
  },
  handshakeOffer: {
    src: "/images/handshake-offer.png",
    alt: "Professional handshake across a desk after completing hiring paperwork",
  },
  handshakeOutdoor: {
    src: "/images/handshake-outdoor.png",
    alt: "Firm professional handshake between two people in business attire outdoors",
  },
  officeBuildingNight: {
    src: "/images/office-building-night.png",
    alt: "Illuminated corporate office building at night with people working inside",
  },
  reviewingDocuments: {
    src: "/images/reviewing-documents.png",
    alt: "Professional reviewing employment documents and records at a desk",
  },
  laptopWorking: {
    src: "/images/laptop-working.png",
    alt: "Person typing on a laptop while organizing job search materials at a desk",
  },
  laptopConfused: {
    src: "/images/laptop-confused.png",
    alt: "Job seeker looking frustrated and confused while reviewing information on a laptop",
  },
} as const;

export const VIDEOS = {
  typingOnLaptop: {
    src: "/videos/typing-vid.mp4",
    alt: "Close-up of hands typing on a laptop keyboard while working",
  },
} as const;

export type SiteImageKey = keyof typeof IMAGES;
export type SiteVideoKey = keyof typeof VIDEOS;
