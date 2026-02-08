export default function RepoList({ repos }) {

  if (!repos) return <div>Loading repos...</div>;

  return (
    <div style={{
      background: "#111",
      padding: "20px",
      borderRadius: "10px",
      color: "white"
    }}>
      <h3>Your Repositories</h3>

      {repos.map(r => (
        <div key={r} style={{
          padding: "8px",
          marginBottom: "6px",
          background: "#222",
          borderRadius: "6px"
        }}>
          {r}
        </div>
      ))}
    </div>
  );
}
