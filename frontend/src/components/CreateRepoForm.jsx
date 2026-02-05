import { useState } from "react";

export default function CreateRepoForm({ onCreate }) {
  const [name, setName] = useState("");

  return (
    <div className="card">
      <h3>Create Repository</h3>

      <input
        placeholder="Repo name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={() => onCreate(name)}>
        Create
      </button>
    </div>
  );
}
