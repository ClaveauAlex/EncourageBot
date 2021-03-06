require('dotenv').config();
const Discord = require("discord.js");
const fetch = require("node-fetch");

const sadWords = ["sad", "depressed", "unhappy", "angry"];

const encouragements = [
    "Cheer up!",
    "Hang in there.",
    "You are a great person / bot!"
];

function getQuote(){
    return fetch("https://zenquotes.io/api/random")
        .then(res => {
            return res.json();
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"];
        });
}

const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    if (msg.author.bot) return;
    if (msg.content === "$inspire") {
        getQuote().then(quote =>{
            msg.channel.send(quote);
        });
    }

    if (sadWords.some(word => msg.content.includes(word))) {
        const encouragement = encouragements[Math.floor(Math.random()*encouragements.length)];
        msg.reply(encouragement);
    }
});
// process.env.TOKEN
client.login(process.env.TOKEN);