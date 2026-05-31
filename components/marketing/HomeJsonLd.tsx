import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

export function HomeJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    sameAs: [],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do employment background checks verify work history?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most employers use a third-party screener who contacts HR, payroll, or a staffing agency listed on your application. Contract and agency placements are often verified through the agency, not the client company.",
        },
      },
      {
        "@type": "Question",
        name: "How can I prepare for an employment verification check?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Align your resume dates with official records, document contract and agency roles clearly, brief your references, and gather supporting paperwork before screening begins.",
        },
      },
      {
        "@type": "Question",
        name: "Does BackgroundReady help with employment gaps?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide guides, templates, and coaching to help you explain gaps honestly and keep your timeline consistent across applications and verification forms.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
