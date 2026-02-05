import { useState } from "react";

export default function CommandInput({ onSubmit }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <div className="command-box">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type command..."
      />
      <button onClick={send}>Run</button>
    </div>
  );
}
