const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
require("dotenv").config();
const app = express();
const TelegramBot = require('node-telegram-bot-api');
const User = require('./models/User');


var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json()); 

app.use(
  express.urlencoded({ extended: true })
); 


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});



async function sendTeleram()
{
  const token = process.env.TELEGRAM_BOT_TOKEN;

  // Create a bot that uses 'polling' to fetch new updates
  const bot = new TelegramBot(token, {polling: true});
  let mobile = '';

  bot.on("message" , (msg)=>{
    if(msg.text=="/start")
    {
      bot.sendMessage(msg.chat.id, 'هل يمكننا الوصول الى رقم هاتفك لمساعدتك ؟', requestPhoneKeyboard);
    }
    
  })
  

bot.onText("إلغاء" , (msg)=>{
  bot.sendMessage(msg.chat.id,' من فضلك. لتأكيد حسابك يرجى مشاركة رقم هاتفك', requestPhoneKeyboard);
})

  const requestPhoneKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "إرسال رقم هاتفى",
                request_contact: true,
                one_time_keyboard: true
            }],
            ["إلغاء"]
        ]
    }
};
  
bot.on('message' , async(msg)=>{
  if(msg.text != "/start"){
    if(msg.contact){
      if(msg.contact.user_id == msg.chat.id)
      {
        if(msg.contact.phone_number && msg.contact.phone_number != "")
        {
          let phone = msg.contact.phone_number.replace('+', "");
          mobile=phone;
          const user = await User.findOne({mobile:phone});
          if(user)
          {
            bot.sendMessage(msg.chat.id , `مرحبا ${msg.chat.first_name}`);
            setTimeout(() => {
               bot.sendMessage(msg.chat.id, `كيف يمكننى مساعدتك الان ؟`, {
              'reply_markup': { 
                  'keyboard': [['الحصول على رمز التأكيد الخاص بي'],['رمز إعادة تعيين كلمة السر']],
                  resize_keyboard: true,
                  one_time_keyboard: true,
                  force_reply: true,
              }
          });
            }, 300);
           
          }else
          {
            bot.sendMessage(msg.chat.id, 'عفوا,رقم الهاتف هذا غير مرتبط بأي حساب لدينا.', requestPhoneKeyboard);
          }
        }

      }else
      {
        bot.sendMessage(msg.chat.id, 'عفوا, يجب عليك استخدام الرقم المسجل على تليجرام.', requestPhoneKeyboard);
      }
    }else if(msg.text == "الحصول على رمز التأكيد الخاص بي")
    {
      const user = await User.findOne({mobile:mobile});
      if(user)
      {
        bot.sendMessage(msg.chat.id , 'رمز تفعيل أدودلز الخاص بحسابك هو : ')
      setTimeout(() => {
        bot.sendMessage(msg.chat.id , `${user.otp}`)
      }, 300);  

        setTimeout(() => {
          bot.sendMessage(msg.chat.id , "يمكنك تفعيل حسابك الأن وتنفيذ المهمات وكسب النقاط وتبديلها بكوبونات🥳")
        }, 2000);
      }
    }else if(msg.text == 'رمز إعادة تعيين كلمة السر'){
      const user = await User.findOne({mobile:mobile});
      if(user)
      {
        bot.sendMessage(msg.chat.id , 'رمز إعادة تعيين كلمة السر الخاص بك هو : ')
      setTimeout(() => {
        bot.sendMessage(msg.chat.id , `${user.otp}`)
      }, 200);  
      }
    }
    else
    {
      bot.sendMessage(msg.chat.id,' من فضلك. لتأكيد حسابك يرجى مشاركة رقم هاتفك', requestPhoneKeyboard);
    }
  }

})

}
sendTeleram();



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
