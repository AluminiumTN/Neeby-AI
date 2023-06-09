// import SlashCommandBuilder and AskAI
const { SlashCommandBuilder } = require('discord.js');
const { AskManager } = require('../utils/model-managers.js');

// create an instance of the AskAI class
const ask = new AskManager();

// export an object with the data and execute properties
module.exports = {
    // data object for the command
    data: new SlashCommandBuilder()
	.setName('say')  // name of the command
	.setDescription('Отправьте конкретный / длинный ответ, сгенерированный GPT-3!')  // description of the command
	.addStringOption(option =>
		// string option for the command
		option.setName('prompt')  // name of the option
			.setDescription('Введите свой вопрос')  // description of the option
            .setRequired(true)),  // option required

    // execute function for the command
    async execute(interaction) {
        // defer reply until the command finishes executing
        await interaction.deferReply();
        // get input option from the interaction object
        const input = interaction.options.getString('prompt');
        // generate answer from input and prompt
        const output = await ask.generate_answer(input);
        // edit the reply with the generated output
        await interaction.editReply(output);
        console.log('Ответ отправлен!');
    }
};
