function showOverlay(ui, data) {

  const overlay = document.createElement("div");
  overlay.className = "ttg-overlay";

  overlay.innerHTML = `
    <h3>${ui.title || ""}</h3>
    <p>${ui.description || ""}</p>
    ${ui.primaryAction ? `<button id="ttg-primary">${ui.primaryAction}</button>` : ""}
  `;

  document.body.appendChild(overlay);

  if (ui.primaryAction) {
    document.getElementById("ttg-primary").onclick = () => {
      executeOverlayAction(data);
      overlay.remove();
    };
  }

  setTimeout(() => {
    overlay.remove();
  }, 8000);
}

function executeOverlayAction(data) {

  if (data.intent === "CREATE_REPO") {

    fetch("http://localhost:5000/create-repo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: data.repo || "ai-created-repo" })
    }).then(() => {
      alert("Repo Created!");
    });
  }

  if (data.intent === "DELETE_REPO") {

    fetch("http://localhost:5000/delete-repo/" + data.repo, {
      method: "DELETE"
    }).then(() => {
      alert("Repo Deleted!");
    });
  }
}
