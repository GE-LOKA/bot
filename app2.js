const { Highrise, Events, Players, Emotes } = require("highrise.sdk.dev");

const config = require("./config")

const bot = new Highrise({
  Events: [
    Events.Messages,
    Events.Joins,
    Events.Leaves,
    Events.DirectMessages,
    Events.Emotes

  ],
  AutoFetchMessages: true, 
  Cache: true 
});

require("colors");

bot.on('ready', (session) => {
  
  console.log("[READY] Bot is ready!".blue);

  console.log(session.room_info.room_name);

  
  bot.move.walk(17, 2, 4, "FrontRight");
});




bot.on("messageCreate", (user_id, data, message) => {
  console.log(`[DIRECT MESSAGE]: ${user_id}:${data.id} - ${message}`);
});


bot.on("playerEmote", (sender, receiver, emote) => {
  console.log('${sender.username} performed an emote on ${receiver.username}"${emote}"');
  

})

bot.on('playerJoin', (user) => {
  console.log(`${user.username} joined the room!`);

  if (user.username === "Wegza") {
      // رسالة ترحيب خاصة لـ Wegza
      bot.message.send(`👑 أهلًا يا ملك ${user.username}! 🌟`);
  } else if (user.username === "H_BAHR") {
      // رسالة ترحيب خاصة لـ H_BAHR
      bot.message.send(`💙 أخويا بحر الطرش نورت، يحب! 🌊`);
  } else {
      // مصفوفة تحتوي على ترحيبات عشوائية
      const randomGreetings = [
          `❤️ منور الدنيا @${user.username}!`,
          `🌟 أهلًا وسهلًا @${user.username}! نورت الغرفة.`,
          `💫 يا هلا بـ @${user.username}! سعدنا بوجودك.`,
          `✨ مرحبًا @${user.username}! أتمنى لك وقتًا ممتعًا.`,
          `🎉 أهلاً بـ @${user.username}! نورت المكان.`,
          `🔥 وجودك شعلة يا @${user.username}!`
      ];

      // اختيار رسالة عشوائية من المصفوفة
      const randomIndex = Math.floor(Math.random() * randomGreetings.length);
      bot.message.send(randomGreetings[randomIndex]);
  }
});





bot.on('playerLeave', (user) => {
  console.log(`[PLAYER LEFT]: ${user.username}:${user.id}`);

});


process.on('unhandledRejection', async (err, promise) => {
  console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
  console.error(promise);
});


bot.login(config.token, config.room);