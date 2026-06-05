import { getOrganizationSchema } from "@/lib/seo/organization-schema";

export function SiteJsonLd() {
  const organization = getOrganizationSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  );
}
