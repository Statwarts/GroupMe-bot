const express = require("express");
const axios = require("axios");
const mebots = require("mebots");
const app = express();
app.use(express.json());

let bot = new mebots.Bot("Innerve8", process.env.BOT_TOKEN);

app.post("/receive", async (req, res) => {
  if (req.body.text === "/ping") {
    sendMessage("Pong!");
    console.log("Ponged!");
  }
  if (
    req.body.text.includes("has joined the group") &&
    req.body.system === true
  ) {
    const name = req.body.text.split(" has joined the group")[0];
    sendMessage(`Welcome to the group! ${name}`);
  }
  if (
    req.body.text.includes("has left the group") &&
    req.body.system === true
  ) {
    const name = req.body.text.split(" has left the group")[0];
    sendMessage(`Goodbye! ${name}`);
  }
  console.log(req.body.text, " by ", req.body.name);
});

function sendMessage(text) {
  axios.post("https://api.groupme.com/v3/bots/post", {
    method: "post",
    Headers: {
      "Content-Type": "application/json",
    },
    bot_id: process.env.BOT_TOKEN,
    text: text,
  });
}
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
