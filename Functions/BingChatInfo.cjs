
async function BingChatAPI(message) {
  try {
    // Dynamically import the module
    const { BingChat } = await import('bing-chat');
    console.log("bing working");
    const api = new BingChat({
      cookie: '1KGEQcLONqgY7_lyApKxinAPveXhUZSzOCh509t1a9KuTiFTP_jxwWy-x1eQ4W8y9eoU3St6sbglmPauQmlQzsuUUZCcuyEWuLKeqLmxFElB9k663BjMCEy6gA3BJTi-ewg_KHCx3CpOyKkgSVpSfIm9FiY4UD8upKXcWIZy3oEu7MJUMaYD95IrV5LvZEvCFriz03pwO0aKSYhTNn_f0OQ'
    })
  
    const res = await api.sendMessage(message,{
      variant: 'Precise'
    });

    console.log(res)
    return res.text;
    // async function setup() {
    //   const api = new BingChat({
    //     cookie: process.env.BING_COOKIE
    //   })
    //   const res = await api.sendMessage('You are a information bot, answer every thing in about 50 words, dont do anything other than searching, no roasts', 'Hi', 'en-US')
    //   console.log(res.text)
    // }
    // setup();
  
    // async function BingChatInfo(message) {
      
    // }
    // BingChatInfo(message);

    
  } catch (error) {
    console.error('Error:', error);
  }
}





  module.exports = BingChatAPI;