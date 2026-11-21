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
  soft: "#ECFDF5",
};

type ChecklistDeliveryEmailProps = {
  downloadUrl: string;
  siteUrl: string;
  unsubscribeUrl?: string;
};

export function ChecklistDeliveryEmail({
  downloadUrl,
  siteUrl,
  unsubscribeUrl,
}: ChecklistDeliveryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Your free Background Check Readiness Checklist is ready to download
      </Preview>
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
                lineHeight: "1.3",
                margin: "10px 0 0",
              }}
            >
              Your free checklist is ready
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
              Thanks for requesting the Background Check Readiness Checklist.
              This 6-page guide helps you organize your employment history, spot
              potential discrepancies, and prepare calmly before screening
              starts.
            </Text>
            <Text
              style={{
                color: colors.muted,
                fontSize: "15px",
                lineHeight: "1.6",
                margin: "0 0 28px",
              }}
            >
              Download the PDF below and work through it at your own pace. If
              you have questions about your situation, just reply to this email.
            </Text>

            <Button
              href={downloadUrl}
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
              Download Your Free Checklist
            </Button>

            <Text
              style={{
                color: colors.muted,
                fontSize: "13px",
                lineHeight: "1.5",
                margin: "20px 0 0",
              }}
            >
              If the button doesn&apos;t work, copy and paste this link:
              <br />
              <Link href={downloadUrl} style={{ color: colors.emeraldDark }}>
                {downloadUrl}
              </Link>
            </Text>
          </Section>

          <Hr style={{ borderColor: colors.border, margin: "0" }} />

          <Section style={{ backgroundColor: colors.soft, padding: "24px 32px" }}>
            <Text
              style={{
                color: colors.navy,
                fontSize: "14px",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              Explore more guidance at{" "}
              <Link href={siteUrl} style={{ color: colors.emeraldDark }}>
                BackgroundReady.com
              </Link>
              .
            </Text>
            {unsubscribeUrl ? (
              <Text
                style={{
                  color: colors.muted,
                  fontSize: "12px",
                  lineHeight: "1.5",
                  margin: "16px 0 0",
                }}
              >
                Prefer fewer emails?{" "}
                <Link href={unsubscribeUrl} style={{ color: colors.muted }}>
                  Unsubscribe
                </Link>
                .
              </Text>
            ) : null}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ChecklistDeliveryEmail;
