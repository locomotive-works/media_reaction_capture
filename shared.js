// Shared between the content script and the popup.
const MRC_STORAGE_KEY = "mrcSession";

function mrcFormatTime(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

function mrcT(key, substitutions) {
  return chrome.i18n.getMessage(key, substitutions);
}
