const StoreMessage = require("./Firebase/StoreMessage.cjs");

// let StoreMessage;
// (async () => {
//   StoreMessage = await import("./Firebase/StoreMessage.cjs");})();

const express = require("express");
const axios = require("axios");
// const mebots = require("mebots");
const app = express();
app.use(express.json());

// let bot = new mebots.Bot("Innerve8", process.env.BOT_TOKEN);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
/*
/sum:
    summarises your unread texts
    usage : /sum
/roast:
    roasts your friend like you do
    >> /roast <name>
/rem:
    make reminders for your friends
    >> /rem <name>-<time in DD/MM/YY/HH:MM> <reminder>
/info:
    search anything with power of bing!!!
    >> /info <search keywords>

*/

app.post("/receive", async (req, res) => {
  if (req.body.text === "/ping") {
    sendMessage("Pong!");
    console.log("Ponged!");
  }
  if (req.body.text === "/help") {
    const helpMessage = 
`/sum:
      summarises your unread texts
      >> /sum

/roast:
      roasts your friend like you do
      >> /roast <name>

/rem:
      make reminders for your friends
      >> /rem <name>:<time in DD/MM/YY/HH:MM> <reminder>

/info:
      search anything with power of bing!!!
      >> /info <search keywords>`;
    sendMessage(helpMessage);
  }
  if (
    req.body.text.includes("has joined the group") &&
    req.body.system === true
  ) {
    const name = req.body.text.split(" has joined the group")[0];
    sendMessage(`Welcome to the group!, hello ${name}`);
  }
  if (
    req.body.text.includes("has left the group") &&
    req.body.system === true
  ) {
    const name = req.body.text.split(" has left the group")[0];
    sendMessage(`Goodbye! ${name}`);
  }

  console.log(req.body.text, " by ", req.body.name);
  StoreMessage(req.body);
});

// function sendMessage(text) {
//   axios.post("https://api.groupme.com/v3/bots/post", {
//     method: "post",
//     Headers: {
//       "Content-Type": "application/json",
//     },
//     bot_id: process.env.BOT_TOKEN,
//     text: text,
//   });
// }
async function sendMessage(text) {
  try {
    await axios.post(
      "https://api.groupme.com/v3/bots/post",
      {
        text: text,
        method: "post",
        bot_id: process.env.BOT_TOKEN,
      },
      {
        Headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending message:", error.message);
  }
}

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

module.exports = app;
