import { TamboProvider, useTambo } from "@tambo-ai/react";
import { useEffect } from "react";
import RepoList from "./RepoList";

function InnerApp() {

  const tambo = useTambo();

  useEffect(() => {

    /* =================
       TOOL: FETCH REPOS
    ================= */

    tambo.registerTool({
      name: "fetch_repos",
      description: "Get all GitHub repositories",
      run: async () => {
        const res = await fetch("http://localhost:5000/repos");
        return await res.json();
      }
    });

    /* =================
       TOOL: CREATE REPO
    ================= */

    tambo.registerTool({
      name: "create_repo",
      description: "Create new GitHub repository",
      run: async ({ name }) => {

        const res = await fetch("http://localhost:5000/create-repo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name })
        });

        return await res.json();
      }
    });

    /* =================
       TOOL: DELETE REPO
    ================= */

    tambo.registerTool({
      name: "delete_repo",
      description: "Delete GitHub repository",
      run: async ({ name }) => {

        const res = await fetch(
          `http://localhost:5000/delete-repo/${name}`,
          { method: "DELETE" }
        );

        return await res.json();
      }
    });

    /* =================
       UI COMPONENT
    ================= */

    tambo.registerComponent(
      "repo_list_ui",
      RepoList,
      {
        propsDefinition: {
          repos: "array"
        }
      }
    );

  }, []);

  return (
    <div>
      <h2>TalkToGitHub</h2>
      <p>Tambo Generative UI Active</p>
    </div>
  );
}

export default function App() {
  return (
    <TamboProvider apiKey="YOUR_TAMBO_KEY">
      <InnerApp />
    </TamboProvider>
  );
}
