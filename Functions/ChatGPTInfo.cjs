const OpenAI = require("openai");
const ChatGPTInfo = async (searchKey) => {
  const OpenAIapi = "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";
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

    console.log("This is what chatGPT says", chatCompletion.choices[0].message);
    return chatCompletion.choices[0].message.content;
  } catch (e) {
    console.error(e);
    // res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = ChatGPTInfo;
