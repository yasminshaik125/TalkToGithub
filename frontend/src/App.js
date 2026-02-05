import "./App.css";

import Header from "./components/Header";
import CommandInput from "./components/CommandInput";
import RepoListView from "./components/RepoListView";
import CreateRepoForm from "./components/CreateRepoForm";
import DeleteRepoConfirmation from "./components/DeleteRepoConfirmation";

function App() {

  const demoRepos = ["wallet-api", "chat-app", "todo-ui"];

  const handleCommand = (cmd) => {
    console.log("Command:", cmd);
  };

  const handleCreate = (name) => {
    console.log("Create repo:", name);
  };

  const handleDelete = (name) => {
    console.log("Delete repo:", name);
  };

  return (
    <div className="app-container">
      <Header />
      <CommandInput onSubmit={handleCommand} />

      <RepoListView repos={demoRepos} />
      <CreateRepoForm onCreate={handleCreate} />
      <DeleteRepoConfirmation repo="wallet-api" onDelete={handleDelete} />
    </div>
  );
}

export default App;
