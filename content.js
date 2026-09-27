// Intercepts Space while a session is active: pauses the media on the page,
// shows a comment box, and stores { timestamp, comment } in the session.
(() => {
  let sessionActive = false;
  let overlayHost = null;
  let overlayKeydown = null;

  chrome.storage.local.get(MRC_STORAGE_KEY, (data) => {
    sessionActive = Boolean(data[MRC_STORAGE_KEY]?.active);
  });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes[MRC_STORAGE_KEY]) {
      sessionActive = Boolean(changes[MRC_STORAGE_KEY].newValue?.active);
      if (!sessionActive) closeOverlay(false);
    }
  });

  function isEditable(el) {
    if (!el) return false;
    const tag = el.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
  }

  // Prefer media that is currently playing, then the largest visible video.
  function findMedia() {
    const all = [...document.querySelectorAll("video, audio")];
    const playing = all.find((m) => !m.paused && !m.ended);
    if (playing) return playing;
    const area = (m) => {
      const r = m.getBoundingClientRect();
      return r.width * r.height;
    };
    const visible = all.filter((m) => m.tagName === "AUDIO" || area(m) > 0);
    visible.sort((a, b) => area(b) - area(a));
    return visible[0] || null;
  }

  function isSpace(e) {
    return e.code === "Space" || e.key === " ";
  }

  function onKey(e) {
    // Keep page shortcuts (YouTube's k/j/f/m etc.) from firing while typing in the overlay.
    if (overlayHost && e.composedPath().includes(overlayHost)) {
      if (e.type === "keydown") overlayKeydown(e);
      e.stopImmediatePropagation();
      return;
    }
    if (!sessionActive || !isSpace(e) || e.ctrlKey || e.metaKey || e.altKey) return;
    if (isEditable(document.activeElement) || isEditable(e.target)) return;
    const media = findMedia();
    if (!media) return;

    e.preventDefault();
    e.stopImmediatePropagation();
    if (e.type === "keydown" && !e.repeat && !overlayHost) openOverlay(media);
  }

  // Registered at document_start in the capture phase so we run before the page's handlers.
  for (const type of ["keydown", "keypress", "keyup"]) {
    window.addEventListener(type, onKey, true);
  }

  function openOverlay(media) {
    const wasPlaying = !media.paused && !media.ended;
    media.pause();
    const time = media.currentTime;

    overlayHost = document.createElement("div");
    const root = overlayHost.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        /* Creator Transformation Railcar palette (dark) */
        .box {
          position: fixed; left: 50%; bottom: 12%; transform: translateX(-50%);
          z-index: 2147483647; width: min(480px, calc(100vw - 32px));
          background: #0f172a; color: #f8fafc; padding: 14px;
          border: 1px solid #7c3aed; border-radius: 0.75rem;
          box-shadow: 0 8px 32px rgba(0,0,0,.45);
          font: 14px/1.4 "Inter", system-ui, -apple-system, "Hiragino Sans", sans-serif;
        }
        .time { font-weight: 600; color: #a78bfa; margin-bottom: 8px; }
        textarea {
          box-sizing: border-box; width: 100%; min-height: 72px; resize: vertical;
          background: #1e293b; color: inherit; border: 1px solid #334155; border-radius: 0.5rem;
          padding: 8px; font: inherit;
        }
        textarea:focus { outline: 2px solid #7c3aed; outline-offset: 0; border-color: transparent; }
        .hint { margin-top: 6px; font-size: 12px; color: #94a3b8; }
      </style>
      <div class="box" role="dialog">
        <div class="time"></div>
        <textarea></textarea>
        <div class="hint"></div>
      </div>`;
    root.querySelector(".box").setAttribute("aria-label", mrcT("overlayLabel"));
    root.querySelector("textarea").placeholder = mrcT("overlayPlaceholder");
    root.querySelector(".hint").textContent = mrcT("overlayHint");
    root.querySelector(".time").textContent = `⏸ ${mrcFormatTime(time)}`;
    const textarea = root.querySelector("textarea");

    overlayKeydown = (e) => {
      if (e.isComposing) return; // don't submit while an IME is converting
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        saveEntry(time, textarea.value.trim());
        closeOverlay(wasPlaying, media);
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeOverlay(wasPlaying, media);
      }
    };

    // In fullscreen only descendants of the fullscreen element are visible.
    const fs = document.fullscreenElement;
    const parent = fs && !(fs instanceof HTMLMediaElement) ? fs : document.documentElement;
    parent.appendChild(overlayHost);
    textarea.focus();
  }

  function closeOverlay(resume, media) {
    if (!overlayHost) return;
    overlayHost.remove();
    overlayHost = null;
    overlayKeydown = null;
    if (resume && media) media.play().catch(() => {});
  }

  function saveEntry(time, comment) {
    chrome.storage.local.get(MRC_STORAGE_KEY, (data) => {
      const session = data[MRC_STORAGE_KEY];
      if (!session?.active) return;
      session.entries.push({
        time,
        comment,
        url: location.href,
        title: document.title,
        capturedAt: new Date().toISOString(),
      });
      chrome.storage.local.set({ [MRC_STORAGE_KEY]: session });
    });
  }
})();
