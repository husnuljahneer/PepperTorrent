class TORRENT {

  constructor(options) {
    
    if (!options.message) throw new TypeError('Missing argument: message')

    this.message = options.message;

  }
  async start(args) {
    
    const Discord = require('discord.js');
    const TorrentSearchApi = require('torrent-search-api');
    const imdb = require("imdb-api");
    const imob = new imdb.Client({ apiKey: "5e36f0db" })
    TorrentSearchApi.enableProvider('ThePirateBay');
    
    const name = args.join(" ");
    if (!name) {
       const errorEmbed = new Discord.MessageEmbed()
       .setDescription('Hey! I hope you are not stupid\nSearch For Movies, Song or Series!')
       return this.message.channel.send(errorEmbed)

    }

    let movie = await imob.get({ 'name': args.slice(0).join(" ") })
    const torrents = await TorrentSearchApi.search(movie.title, 'All', 1);
    var magnetURI = torrents[0].magnet
    // message.channel'send(magnetURI)
    if(movie.rating == 0 || !torrents){
       const errorEmbed = new Discord.MessageEmbed()
       .setDescription('Hey Dude search for the things Im able to search for! Look, You have these options 1. Movie 2. Song 3. Series. Take it or leave it.')
      return this.message.channel.send(errorEmbed)
    
    }
   
    const torrentEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(movie.title)
    .setAuthor('Click Here to download', 'https://cdn.icon-icons.com/icons2/17/PNG/256/utorrent_torrent_2088.png')
    .setDescription(movie.plot)
    .setThumbnail('https://media.giphy.com/media/3o7rc0qU6m5hneMsuc/giphy.gif')
    .addFields(
      { name: 'Director', value: movie.director , inline: true },
      { name: 'Casts', value: movie.actors , inline: true },
      { name: 'Language', value: movie.languages, inline: true },
      { name: 'Country', value: movie.country , inline: true },
      { name: 'Rating', value: movie.rating , inline: true },
      { name: 'Box Office', value: movie.boxoffice , inline: true },
    )
    .setImage(movie.poster)
    .setTimestamp()
    .setFooter('Made with Love by WarM4chineRoxX#2013');
    this.message.channel.send(torrentEmbed)
    const magnetEmbed = new Discord.MessageEmbed()
    .setDescription(torrents[0].magnet)
    this.message.channel.send(magnetEmbed)
  }
}

module.exports = TORRENT;