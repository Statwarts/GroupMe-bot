const StoreMessage = require("./Firebase/StoreMessage.cjs");
const schedule = require("node-schedule");
const { parse } = require("date-fns");
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

app.post("/receive", async (req, res) => {
  const text = req.body.text;
  const senderName = req.body.name;
  const system = req.body.system;
  const command = text.split(" ")[0];
  console.log("the command is ",command);

  switch (system) {
    case true:
      if (text.includes("has joined the group")) {
        const name = text.split(" has joined the group")[0];
        sendMessage(`Welcome to the group! ${name}`);
      }
      if (text.includes("has left the group")) {
        const name = text.split(" has left the group")[0];
        sendMessage(`Goodbye! ${name}`);
      }
      break;

    case false:
      switch (command) {
        case "/help":
          const helpMessage = `/sum:
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
          console.log("Helped!");
          break;

        case "/ping":
          await sendMessage("Pong!");
          console.log("Ponged!");
          break;

        case "/rem":
          let time = "";

          const name = text.slice(5, text.indexOf(":"));
          const colonIndex = text.indexOf(":") + 1;
          let i = colonIndex + 1;
          while (i < text.length && text[i] !== ">") {
            time += text[i];
            i++;
          }

          const reminder = `A reminder for ${name}\n` + text.slice(i + 1);
          console.log(reminder);
          const scheduledTime = parse(time, "dd/MM/yyyy HH:mm", new Date(), {
            addSuffix: true,
          });
          console.log(scheduledTime);
          if (scheduledTime === "Invalid Date") {
            await sendMessage("Invalid Date");
            break;
          }
          schedule.scheduleJob(scheduledTime, () => {
            sendMessage(reminder);
          });
          await sendMessage("Reminder set!");

          break;

        case "/info":
          const searchKey = text.slice(6);
          // Implement search logic here
          break;

        default:
            sendMessage("Invalid Command");
            console.log("Invalid Command",command);
          break;
      }
      break;

    default:
      break;
  }
});

//   if (req.body.text === "/ping") {
//     sendMessage("Pong!");
//     console.log("Ponged!");
//   }
//   if (
//     req.body.text.includes("has joined the group") &&
//     req.body.system === true
//   ) {
//     const name = req.body.text.split(" has joined the group")[0];
//     sendMessage(`Welcome to the group! ${name}`);
//   }
//   if (
//     req.body.text.includes("has left the group") &&
//     req.body.system === true
//   ) {
//     const name = req.body.text.split(" has left the group")[0];
//     sendMessage(`Goodbye! ${name}`);
//   }
//   console.log(req.body.text, " by ", req.body.name);
//   StoreMessage(req.body);
// });

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
