const axios = require("axios");

const Summarize = async (textToSummarize) => {
  const options = {
    method: "POST",
    url: "https://text-analysis12.p.rapidapi.com/language-detection/api/v1.1",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RapidAPIKEY,
      "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com",
    },
    data: {
      text: textToSummarize,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = Summarize;
