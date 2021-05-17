import { useState } from "react";
import axios from "axios";

export default function EditActivity({ activeFeed, activity, getActivities }) {
  const [updateText, setUpdateText] = useState("");

  const editActivity = async (e) => {
    e.preventDefault();
    console.log("edit");
    if (updateText) {
      try {
        await axios.post("http://localhost:8000/update", {
          activity,
          updateText,
        });

        setUpdateText("");
        getActivities();
      } catch (err) {
        console.log("Error updating activity", err);
      }
    } else console.log("Edit text empty");
  };

  return activity.actor.id === activeFeed.userId ? (
    <div>
      <form onSubmit={editActivity}>
        <input
          onChange={(e) => setUpdateText(e.target.value)}
          value={updateText}
          placeholder="edit"
        />
        <button style={{ width: "3rem" }}>Edit</button>
      </form>
    </div>
  ) : null;
}
