const $ = (id) => document.getElementById(id);

function render(session) {
  const active = Boolean(session?.active);
  $("idle").hidden = active;
  $("active").hidden = !active;
  if (!active) return;

  $("count").textContent = session.entries.length;
  const list = $("entries");
  list.replaceChildren(
    ...session.entries.map((entry) => {
      const li = document.createElement("li");
      const t = document.createElement("span");
      t.className = "t";
      t.textContent = mrcFormatTime(entry.time);
      li.append(t, entry.comment || "（コメントなし）");
      return li;
    })
  );
  list.scrollTop = list.scrollHeight;
}

// Links straight to the moment on YouTube; other sites get the page URL.
function timestampUrl(url, seconds) {
  try {
    const u = new URL(url);
    if (/(^|\.)youtube\.com$/.test(u.hostname) || u.hostname === "youtu.be") {
      u.searchParams.set("t", `${Math.floor(seconds)}s`);
      return u.toString();
    }
  } catch {}
  return url;
}

function toMarkdown(session, endedAt) {
  const lines = [`# ${session.title || "Media Reaction Capture"}`, ""];
  lines.push(`- 開始: ${new Date(session.startedAt).toLocaleString()}`);
  lines.push(`- 終了: ${endedAt.toLocaleString()}`);
  lines.push(`- 記録数: ${session.entries.length}`);

  // Group consecutive entries by page so a session can span several videos.
  let currentUrl = null;
  for (const entry of session.entries) {
    if (entry.url !== currentUrl) {
      currentUrl = entry.url;
      lines.push("", `## [${entry.title || entry.url}](${entry.url})`, "");
    }
    const time = mrcFormatTime(entry.time);
    const comment = (entry.comment || "（コメントなし）").replace(/\n/g, "  \n  ");
    const link = timestampUrl(entry.url, entry.time);
    lines.push(link === entry.url ? `- **${time}** ${comment}` : `- [**${time}**](${link}) ${comment}`);
  }
  return lines.join("\n") + "\n";
}

function fileName(session) {
  const d = new Date(session.startedAt);
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
  const slug = (session.title || "session").replace(/[\\/:*?"<>|\s]+/g, "_").slice(0, 60);
  return `media-reaction-${slug}-${stamp}.md`;
}

async function getSession() {
  return (await chrome.storage.local.get(MRC_STORAGE_KEY))[MRC_STORAGE_KEY];
}

$("start").addEventListener("click", async () => {
  const session = {
    active: true,
    title: $("title").value.trim(),
    startedAt: new Date().toISOString(),
    entries: [],
  };
  await chrome.storage.local.set({ [MRC_STORAGE_KEY]: session });
});

$("stop").addEventListener("click", async () => {
  const session = await getSession();
  if (!session) return;
  const markdown = toMarkdown(session, new Date());
  await chrome.downloads.download({
    url: "data:text/markdown;charset=utf-8," + encodeURIComponent(markdown),
    filename: fileName(session),
  });
  await chrome.storage.local.remove(MRC_STORAGE_KEY);
});

// Two clicks to discard, so a stray click can't wipe the session.
$("discard").addEventListener("click", async (e) => {
  if (e.target.dataset.armed !== "1") {
    e.target.dataset.armed = "1";
    e.target.textContent = "もう一度クリックで破棄";
    return;
  }
  await chrome.storage.local.remove(MRC_STORAGE_KEY);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[MRC_STORAGE_KEY]) render(changes[MRC_STORAGE_KEY].newValue);
});
getSession().then(render);
