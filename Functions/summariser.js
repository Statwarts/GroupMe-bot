const axios = require("axios");


const Summarize = async (textToSummarize,summary_percent) => {
    const axios = require('axios');
    // console.log(textToSummarize);
    const options = {
      method: 'POST',
      url: 'https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '15b80fdf3emsh5acd32eeb76f5e6p1a0c6ajsn3f1562d9701a',
        'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
      },
      data: {
        language: 'english',
        summary_percent: 30,
        text: textToSummarize
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data.summary;
    } catch (error) {
        console.error(error);
    }
};

module.exports = Summarize;
