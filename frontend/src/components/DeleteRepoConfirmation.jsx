export default function DeleteRepoConfirmation({ repo, onDelete }) {
  return (
    <div className="card danger">
      <h3>Delete Repo</h3>
      <p>Are you sure you want to delete <b>{repo}</b>?</p>

      <button onClick={() => onDelete(repo)}>
        Yes Delete
      </button>
    </div>
  );
}
