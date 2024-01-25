const axios = require("axios");

const min = (a,b) => {
    return a<b?a:b;
}

const Summarize = async (textToSummarize,summary_percent) => {
    const axios = require('axios');
    console.log(textToSummarize);
    const options = {
      method: 'POST',
      url: 'https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
      },
      data: {
        language: 'english',
        summary_percent: min(50,summary_percent),
        text: textToSummarize
      }
    };
    
    try {
        const response = await axios.request(options);
        return response.data.summary;
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

module.exports = Summarize;
