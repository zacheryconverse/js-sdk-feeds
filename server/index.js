const express = require("express");
const stream = require("getstream");
const cors = require("cors");
require("dotenv").config({ path: "server/.env" });
// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const key = process.env.REACT_APP_KEY;
const secret = process.env.REACT_APP_SECRET;
const serverClient = stream.connect(key, secret);
// const client = stream.connect(
//   key,
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWmFjaGVyeSJ9.9glCoYuMkrEjPgH76kJFpyYu2UU6IOrxVZObh4sckf0",
//   1121858
// );

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.post("/token", async (req, res) => {
  const { userID } = req.body;
  const token = serverClient.createUserToken(userID);
  try {
    res.status(200).send(token);
  } catch (err) {
    res.status(500).send("Server Error: ", err);
  }
});

app.patch("/update", async (req, res) => {
  try {
    const { activity, updateText } = req.body;

    const update = await serverClient.activityPartialUpdate({
      id: activity.id,
      set: { text: updateText },
    });

    res.status(200).send(update);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/updatePopularity", async (req, res) => {
  const { activity } = req.body;
  const update = serverClient.activityPartialUpdate({
    id: activity.id,
    set: { popularity: activity.popularity + 1 },
  })
  try {
    res.status(200).send(update);
  } catch (err) {
    res.status(500).send("Server Error: ", err);
  }
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
