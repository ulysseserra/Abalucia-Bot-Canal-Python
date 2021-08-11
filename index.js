const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos

client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("806968460369985616");
  let channel = await client.channels.cache.get("806968461401391148");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === ':pika:');
  if (guild != member.guild) {
    return console.log("Nossas boas-vindas ao Discord da DevAprender!");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`${emoji} Boas-vindas ${emoji}`)
      .setImage("https://i.gifer.com/9WsF.gif")
      .setDescription(`**${member.user}**, Bem-vindo(a) ao Servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
      .addFild('Canais', 'Siga as regras do Servidor <#806977330898796545>')
      .addFild('Cargos', 'Você pode ganhar o cargo: <@&874361381804212235>')
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter('ID do usuário' + member.user.id)
      .setTimestamp();

    channel.send(embed);
  }
});


client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

   const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token