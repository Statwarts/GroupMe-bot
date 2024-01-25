const axios = require("axios");

const Summarize = async (textToSummarize) => {
    const axios = require('axios');

    const options = {
      method: 'POST',
      url: 'https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RapidAPIKey,
        'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
      },
      data: {
        language: 'english',
        summary_percent: 10,
        text: textToSummarize
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

module.exports = Summarize;
