import { Resend } from "resend";
import { assertResendConfigured } from "@/lib/email/env";

let client: Resend | null = null;

export function getResendClient(): Resend {
  if (!client) {
    client = new Resend(assertResendConfigured());
  }
  return client;
}
