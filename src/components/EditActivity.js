import { useState } from "react";

export default function EditActivity({ activeFeed, activity, client }) {
  const [updateText, setUpdateText] = useState("");

  const editActivity = async (e) => {
    e.preventDefault();

    if (updateText) {
      try {
        const update = await activeFeed.client.activityPartialUpdate({
          id: activity.id,
          set: { text: updateText },
        });

        setUpdateText("");
        console.log(update);
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
      </form>
      <button style={{ width: "3rem" }}>Edit</button>
    </div>
  ) : null;
}
