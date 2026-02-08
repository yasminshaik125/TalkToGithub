console.log("🚀 TTG CONTENT SCRIPT LOADED");

/* =========================
   PREVENT DOUBLE INJECTION
========================= */

if (window.__TTG_LOADED__) {
  console.log("TTG already loaded");
} else {
  window.__TTG_LOADED__ = true;
}

/* =========================
   CREATE COMMAND BAR UI
========================= */

createCommandBar();

/* =========================
   COMMAND BAR FUNCTION
========================= */

function createCommandBar() {

  if (document.getElementById("ttg-wrapper")) return;

  const wrapper = document.createElement("div");
  wrapper.id = "ttg-wrapper";

  wrapper.style.position = "fixed";
  wrapper.style.top = "-3px";
  wrapper.style.left = "40%";
  wrapper.style.transform = "translateX(-50%)";
  wrapper.style.zIndex = "999999";
  wrapper.style.background = "rgba(13,17,23,0.85)";
  wrapper.style.padding = "10px";
  wrapper.style.borderRadius = "16px";
  wrapper.style.border = "1px solid rgba(255,255,255,0.08)";
  wrapper.style.boxShadow = "0 20px 60px rgba(0,0,0,0.7)";
  wrapper.style.backdropFilter = "blur(12px)";
  wrapper.style.transition = "all 0.2s ease";

  const input = document.createElement("input");
  input.id = "ttg-command-bar";
  input.placeholder = "TalkToGitHub";

  input.style.width = "520px";
  input.style.height = "42px";
  input.style.borderRadius = "12px";
  input.style.border = "1px solid #30363d";
  input.style.background = "#0d1117";
  input.style.color = "#c9d1d9";
  input.style.padding = "0 16px";
  input.style.fontSize = "15px";
  input.style.outline = "none";
  input.style.transition = "all 0.2s ease";

  /* Focus glow */
  input.addEventListener("focus", () => {
    input.style.border = "1px solid #58a6ff";
    input.style.boxShadow = "0 0 0 2px rgba(88,166,255,0.3)";
  });

  input.addEventListener("blur", () => {
    input.style.border = "1px solid #30363d";
    input.style.boxShadow = "none";
  });

  /* Hover glow */
  input.addEventListener("mouseenter", () => {
    wrapper.style.boxShadow = "0 25px 80px rgba(88,166,255,0.25)";
  });

  input.addEventListener("mouseleave", () => {
    wrapper.style.boxShadow = "0 20px 60px rgba(0,0,0,0.7)";
  });

  wrapper.appendChild(input);
  document.body.appendChild(wrapper);

  /* =========================
     COMMAND HANDLER
  ========================= */

  input.addEventListener("keydown", async (e) => {

    if (e.key !== "Enter") return;

    const text = input.value.trim();
    if (!text) return;

    input.value = "";

    console.log("➡ Sending to backend:", text);

    showLoading(wrapper);

    try {

      const res = await fetch("http://localhost:5000/tambo-ui", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      if (!res.ok) throw new Error("Backend returned HTML or error");

      const data = await res.json();

      console.log("⬅ Backend response:", data);

      hideLoading(wrapper);

      executeIntent(data);

    } catch (err) {

      hideLoading(wrapper);

      console.log("❌ Backend error:", err);
      showToast("Backend unreachable");

    }

  });
}

/* =========================
   EXECUTE INTENT
========================= */

function executeIntent(data) {

  const username = getUsername();

  if (!username) {
    showToast("GitHub username not found");
    return;
  }

  console.log("🎯 EXEC INTENT:", data);

  switch (data.intent) {

    case "OPEN_PROFILE":
      location.href = `https://github.com/${username}`;
      break;

    case "OPEN_MY_REPOS":
      location.href = `https://github.com/${username}?tab=repositories`;
      break;

    case "OPEN_REPO":
      if (data.repo) {
        location.href = `https://github.com/${username}/${data.repo}`;
      }
      break;

    case "OPEN_ISSUES":
      location.href = location.href + "/issues";
      break;

    case "OPEN_PRS":
      location.href = location.href + "/pulls";
      break;

    default:
      showToast("Command not understood");
  }
}

/* =========================
   GET USERNAME FROM GITHUB
========================= */

function getUsername() {
  const meta = document.querySelector("meta[name='user-login']");
  return meta ? meta.content : null;
}

/* =========================
   LOADING INDICATOR
========================= */

function showLoading(wrapper) {

  if (document.getElementById("ttg-loading")) return;

  const loading = document.createElement("div");
  loading.id = "ttg-loading";
  loading.innerText = "AI thinking…";

  loading.style.color = "#58a6ff";
  loading.style.fontSize = "12px";
  loading.style.marginTop = "6px";
  loading.style.textAlign = "center";

  wrapper.appendChild(loading);
}

function hideLoading(wrapper) {
  const loading = document.getElementById("ttg-loading");
  if (loading) loading.remove();
}

/* =========================
   TOAST NOTIFICATIONS
========================= */

function showToast(text) {

  const toast = document.createElement("div");

  toast.innerText = text;

  toast.style.position = "fixed";
  toast.style.bottom = "40px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#161b22";
  toast.style.color = "#c9d1d9";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "10px";
  toast.style.border = "1px solid #30363d";
  toast.style.boxShadow = "0 10px 40px rgba(0,0,0,0.5)";
  toast.style.zIndex = "999999";

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
