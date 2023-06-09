// import SlashCommandBuilder, EmbedBuilder, and ImageAI classes
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ImageManager } = require('../utils/model-managers.js');

// create an instance of the ImageAI class
const image = new ImageManager();

// export an object with the data and execute properties
module.exports = {
    // data object for the command
    data: new SlashCommandBuilder()
	    .setName('image') // name of the command
	    .setDescription('Отправьте изображение, сгенерированное искусственным интеллектом DALL-E!') // description of the command
	    .addStringOption(option => // string option for the command
		    option.setName('prompt') // name of the option
			    .setDescription('Запрос на создание изображения из') // description of the option
			    .setRequired(true)), // option as required

    // execute function for the command
    async execute(interaction) {
        // defer the reply so that it can be edited later
        await interaction.deferReply();
        // get the 'prompt' option from the interaction object
        const input = interaction.options.getString('prompt');
        // generate an image from the prompt
        const output = await image.generate_image(input);
        // edit the reply with the embed of the generated image
        await interaction.editReply({ embeds: [this.embedImage(input, output)] });
        console.log('Image sent!');
    },

    // function to create an embed object with the generated image
    embedImage(title, url) {
        return new EmbedBuilder()
        .setColor(0x19C37D) // color of the embed
        .setTitle(title.toUpperCase()) // title of the embed
        .setAuthor({ // author of the embed
          name: 'OpenAI',
          iconURL: 'https://openai.com/content/images/2022/05/openai-avatar.png',
          url: 'https://openai.com'
        }) 
        .setImage(url) // image of the embed
        .setFooter({ text: 'Изображение, созданное искусственным интеллектом DALL·E'}); // set the footer of the embed
    }
};
