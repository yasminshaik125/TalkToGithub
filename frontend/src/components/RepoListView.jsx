export default function RepoListView({ repos }) {
  return (
    <div className="card">
      <h3>Your Repositories</h3>

      {repos.length === 0 ? (
        <p>No repos found</p>
      ) : (
        <ul>
          {repos.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
