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
    alt: "Professional handshake across a desk, symbolizing a successful job offer",
  },
  officeBuildingNight: {
    src: "/images/office-building-night.png",
    alt: "Illuminated corporate office building at night with people working inside",
  },
  reviewingDocuments: {
    src: "/images/reviewing-documents.png",
    alt: "Professional reviewing employment documents and records at a desk",
  },
} as const;

export type SiteImageKey = keyof typeof IMAGES;
