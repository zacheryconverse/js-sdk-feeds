const stream = require("getstream");
require("dotenv").config({ path: "server/.env" });

const key = process.env.REACT_APP_KEY;
const secret = process.env.REACT_APP_SECRET;
const client = stream.connect(key, secret);

// const zachery = client.feed('user', 'Zachery');

const message = "Post 12";

const addActivity = async () => {
  const zacheryFeed = client.feed("user", "Zachery");
  await zacheryFeed
    .addActivity({
      actor: "Zachery",
      verb: "add",
      object: "picture:11",
      foreign_id: "picture:11",
      time: new Date(),
      text: message,
    })
    .then((res) => console.log(res, "res"))
    .catch((err) => console.log("ERROR", err));
};
addActivity();
