const POPUP_DISMISS_KEY = "br_checklist_popup_dismissed_until";
const CHECKLIST_DONE_KEY = "br_checklist_requested";

export function markChecklistRequested(): void {
  try {
    window.localStorage.setItem(CHECKLIST_DONE_KEY, "1");
  } catch {
    // ignore
  }
}

export function hasChecklistRequested(): boolean {
  try {
    return window.localStorage.getItem(CHECKLIST_DONE_KEY) === "1";
  } catch {
    return false;
  }
}

export function dismissChecklistPopup(days = 7): void {
  try {
    const until = Date.now() + days * 24 * 60 * 60 * 1000;
    window.localStorage.setItem(POPUP_DISMISS_KEY, String(until));
  } catch {
    // ignore
  }
}

export function isChecklistPopupDismissed(): boolean {
  try {
    const raw = window.localStorage.getItem(POPUP_DISMISS_KEY);
    if (!raw) return false;
    const until = Number(raw);
    if (Number.isNaN(until)) return false;
    if (until > Date.now()) return true;
    window.localStorage.removeItem(POPUP_DISMISS_KEY);
    return false;
  } catch {
    return false;
  }
}
