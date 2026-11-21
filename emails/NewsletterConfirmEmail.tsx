import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";
import { SITE_NAME } from "@/lib/constants";

const colors = {
  navy: "#0B1120",
  emerald: "#34D399",
  emeraldDark: "#059669",
  white: "#FFFFFF",
  muted: "#64748B",
  border: "#E2E8F0",
};

type NewsletterConfirmEmailProps = {
  confirmUrl: string;
  siteUrl: string;
};

export function NewsletterConfirmEmail({
  confirmUrl,
  siteUrl,
}: NewsletterConfirmEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your BackgroundReady newsletter subscription</Preview>
      <Body
        style={{
          backgroundColor: "#F8FAFC",
          fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
          margin: 0,
          padding: "24px 12px",
        }}
      >
        <Container
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: "16px",
            margin: "0 auto",
            maxWidth: "560px",
            overflow: "hidden",
          }}
        >
          <Section
            style={{
              backgroundColor: colors.navy,
              padding: "28px 32px",
            }}
          >
            <Text
              style={{
                color: colors.emerald,
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              {SITE_NAME}
            </Text>
            <Heading
              style={{
                color: colors.white,
                fontSize: "24px",
                fontWeight: 700,
                margin: "10px 0 0",
              }}
            >
              Confirm your subscription
            </Heading>
          </Section>

          <Section style={{ padding: "32px" }}>
            <Text
              style={{
                color: colors.navy,
                fontSize: "16px",
                lineHeight: "1.6",
                margin: "0 0 16px",
              }}
            >
              One quick step: confirm your email to receive practical tips about
              employment verification, background screening, and protecting your
              work history.
            </Text>
            <Text
              style={{
                color: colors.muted,
                fontSize: "15px",
                lineHeight: "1.6",
                margin: "0 0 28px",
              }}
            >
              We only send occasional, useful updates. You can unsubscribe at
              any time.
            </Text>
            <Button
              href={confirmUrl}
              style={{
                backgroundColor: colors.emeraldDark,
                borderRadius: "12px",
                color: colors.white,
                display: "inline-block",
                fontSize: "16px",
                fontWeight: 700,
                padding: "14px 22px",
                textDecoration: "none",
              }}
            >
              Confirm Subscription
            </Button>
            <Text
              style={{
                color: colors.muted,
                fontSize: "13px",
                lineHeight: "1.5",
                margin: "20px 0 0",
              }}
            >
              Or open this link:{" "}
              <Link href={confirmUrl} style={{ color: colors.emeraldDark }}>
                {confirmUrl}
              </Link>
            </Text>
          </Section>

          <Hr style={{ borderColor: colors.border, margin: "0" }} />

          <Section style={{ padding: "24px 32px" }}>
            <Text
              style={{
                color: colors.muted,
                fontSize: "12px",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              If you didn&apos;t request this, you can ignore this email. Visit{" "}
              <Link href={siteUrl} style={{ color: colors.emeraldDark }}>
                BackgroundReady.com
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default NewsletterConfirmEmail;
