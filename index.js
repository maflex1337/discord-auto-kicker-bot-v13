const { Client, Intents } = require("discord.js");
const config = require("./config.json");


const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
    ],
});


client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
});


client.on("messageCreate", (message) => {
    if (message.content === config.prefix + "ping") {
        message.channel.send(
            `Ping: latency is ${
                Date.now() - message.createdTimestamp
            }ms. API Latency is ${client.ws.ping}ms.`
        );
    }
});


client.on("guildMemberAdd", (member) => {
    if (config.ban) {
        if (member.bannable) {
            member.ban({
                reason: `Automatic ban of ${member.user.tag} (${member.user.id})`,
            });
        } else {
            console.log(
                `Failed to ban member: ${member.user.tag} (${member.user.id})`
            );
        }
    } else {
        if (member.kickable) {
            member.kick(
                `Automatic kick of ${member.user.tag} (${member.user.id})`
            );
        } else {
            console.log(
                `Failed to kick member: ${member.user.tag} (${member.user.id})`
            );
        }
    }
});


client.login(config.token);