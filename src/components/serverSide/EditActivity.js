import { useState } from "react";
import axios from "axios";

export default function EditActivity({ activeFeed, activity, getActivities }) {
  const [updateText, setUpdateText] = useState("");

  const editActivity = async (e) => {
    e.preventDefault();
    if (updateText) {
      try {
        await axios.patch("http://localhost:8000/update", {
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

  return activity.actor.id === activeFeed.client.userId && activeFeed.id !== `notification:${activeFeed.client.userId}` ? (
    <div>
      <form onSubmit={editActivity}>
        <input
          onChange={(e) => setUpdateText(e.target.value)}
          value={updateText}
          placeholder="edit activity text"
        />
        <button style={{ width: "3rem" }}>Edit</button>
      </form>
    </div>
  ) : null;
}
