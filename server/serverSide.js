const stream = require("getstream");
require("dotenv").config({ path: "server/.env" });

const key = process.env.REACT_APP_KEY;
const secret = process.env.REACT_APP_SECRET;
const client = stream.connect(key, secret);

// const zachery = client.feed('user', 'Zachery');

const message = 'Post 11';

const addActivity = async () => {
  const zacheryFeed = client.feed("user", "Zachery");
  const activity = await zacheryFeed.addActivity({
    verb: "add",
    object: "picture:11",
    foreign_id: "picture:11",
    time: new Date(),
    text: message,
  });
  // console.log(zacheryFeed, 'zachery');
  console.log(activity)
}
addActivity();

