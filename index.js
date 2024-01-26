const StoreMessage = require("./Firebase/StoreMessage.cjs");
const schedule = require("node-schedule");
const moment = require("moment-timezone");
const { DateTime } = require("luxon");
const express = require("express");
const axios = require("axios");
const Summarize = require("./summariser.js");
require("dotenv").config();
const OpenAIapi = "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";
// import OpenAI from "openai";
const OpenAI= require("openai")

const currentTime = DateTime.utc();
let lastMessageTime = currentTime;
// const mebots = require("mebots");
const app = express();
app.use(express.json());

function convertToUTC(indiaDateStr) {
  const indiaDate = moment.tz(indiaDateStr, "DD/MM/YYYY HH:mm", "Asia/Kolkata");
  const utcDate = indiaDate.clone().utc();
  const utcDateStr = utcDate.format("YYYY-MM-DD HH:mm:ss [UTC]");
  return utcDateStr;
}

app.get("/", (req, res) => {
  console.log("hello world");
  res.send("Hello World!");
});

app.post("/receive", async (req, res) => {
  if (req.body.created_at === lastMessageTime) {
    return;
  }
  lastMessageTime = req.body.created_at;

  const text = req.body.text;
  const senderName = req.body.name;
  const system = req.body.system;
  const command = text.split(" ")[0];
  console.log("the command is ", command);
  if (req.body.sender_type === "bot" || req.body.name === "Innerve8") {
    return;
  }
  StoreMessage(req.body);
  if (command[0] !== "/" && system === false) {
    return;
  }
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
          let i = text.indexOf(":") + 1;
          while (i < text.length && text[i] !== ">") {
            time += text[i];
            i++;
          }

          const reminder = `A reminder for ${name}\n` + text.slice(i + 1);
          console.log(time);

          const parsedTimeUTC = convertToUTC(time);
          console.log("parsed time :", parsedTimeUTC);
          schedule.scheduleJob(parsedTimeUTC, () => {
            console.log("sending reminder");
            sendMessage(reminder);
          });
          await sendMessage("Reminder set!");

          break;

        case "/info":
          const searchKey = text.slice(6) + "in about 50 words";
          const op = new OpenAI({
            apiKey: OpenAIapi,
          });
          console.log(searchKey);
          try {
            console.log(req.body);
            const chatCompletion = await op.chat.completions.create({
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: searchKey }],
            });

            console.log("This is what chatGPT says",chatCompletion.choices[0].message);
            sendMessage(chatCompletion.choices[0].message.content);
            res.json({ response: chatCompletion.choices[0].message.content });
            // let feedback =  chatCompletion.choices[0].message.content;
          } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Internal Server Error" });
          }
          break;
        case "/sum":
          const textToSummarize = text.slice(5);
          const summary_persent = 20;
          const summary =
            "Here is your Summary\n" +
            (await Summarize(textToSummarize, summary_persent));
          sendMessage(summary);
          break;
        default:
          sendMessage("I am not programmed to do that yet!");
          console.log("Invalid Command", command);
          break;
      }
      break;

    default:
      break;
  }
  StoreMessage(text);
});

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
  // console.log(typeof process.env.RAPIDAPI_KEY);
  console.log("Listening on port 3000");
});

module.exports = app;
