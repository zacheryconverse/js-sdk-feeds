import { useRef } from "react";

export default function FileUploader({ onFileSelect }) {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    onFileSelect(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={(e) => fileInput.current && fileInput.current.click()}>send</button>
    </div>
  );
}
