import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("GITHUB TOKEN:", process.env.GITHUB_TOKEN ? "LOADED" : "MISSING");

/* =========================
   GITHUB CLIENT
========================= */

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json"
  }
});
app.post("/tambo-ui", async (req, res) => {

  const { text } = req.body;

  console.log("========== NEW REQUEST ==========");
  console.log("RAW TEXT:", text);

  if (!text) {
    console.log("❌ NO TEXT");
    return res.json({ intent: "UNKNOWN" });
  }

  const lower = text.toLowerCase();
  console.log("LOWER:", lower);

  /* PROFILE */
  if (
    lower.includes("profile") ||
    lower.includes("account") ||
    lower.includes("github page") ||
    lower.includes("my page")
  ) {
    console.log("✅ MATCH PROFILE");
    return res.json({ intent: "OPEN_PROFILE" });
  }

  /* REPOS */
  if (
    lower.includes("repo") ||
    lower.includes("repositories")
  ) {

    if (lower.includes("open repo")) {

      const words = lower.split(" ");
      const index = words.indexOf("repo");

      const repoName = words[index + 1];

      console.log("✅ MATCH OPEN REPO:", repoName);

      return res.json({
        intent: "OPEN_REPO",
        repo: repoName
      });
    }

    console.log("✅ MATCH MY REPOS");

    return res.json({ intent: "OPEN_MY_REPOS" });
  }

  console.log("❌ NO MATCH");

  return res.json({ intent: "UNKNOWN" });

});




/* =========================
   LIST REPOS
========================= */

app.get("/repos", async (req, res) => {
  try {
    const response = await github.get("/user/repos");
    const repos = response.data.map(r => r.name);
    res.json(repos);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch repos" });
  }
});

/* =========================
   CREATE REPO
========================= */

app.post("/create-repo", async (req, res) => {
  try {
    const { name, isPrivate = false } = req.body;

    const response = await github.post("/user/repos", {
      name,
      private: isPrivate
    });

    res.json({
      success: true,
      url: response.data.html_url
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      success: false,
      error: "Create repo failed"
    });
  }
});

/* =========================
   DELETE REPO
========================= */

app.delete("/delete-repo/:name", async (req, res) => {
  try {
    const repoName = req.params.name;

    const user = await github.get("/user");
    const username = user.data.login;

    await github.delete(`/repos/${username}/${repoName}`);

    res.json({ success: true });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Delete failed" });
  }
});

/* =========================
   HEALTH
========================= */

app.get("/", (req, res) => {
  res.send("Backend running");
});

/* =========================
   START SERVER
========================= */

app.listen(5000, () => {
  console.log("Backend running http://localhost:5000");
});
