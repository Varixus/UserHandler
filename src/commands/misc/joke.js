const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'joke',
    description: 'Tells you a joke.',

    callback: async (client, interaction) => {
        const jokeStorage = [
            `What did the Buddhist say to the hot dog vendor? "Make me one with everything."`,
            `What do you call a fake noodle? An impasta.`,
            `Why can't you explain puns to kleptomaniacs? Because they always take things literally.`,
            `Why did the hipster burn his mouth? He drank the coffee before it was cool.`,
            `Why did the nurse need a red pen? In case she needed to draw blood.`,
            `Why don't calculus majors throw house parties? Because they don't want their guests to drink and derive.`,
            `Want to hear a construction joke? Oh never mind, I'm still working on that one.`,
            `Why don't scientists trust atoms? Because they make up everything.`,
            `I poured root beer in a square glass. Now I just have beer.`,
            `What did the bald man exclaim when he received a comb for a present? Thanks—I'll never part with it.`,
            `Rest in peace, boiling water. You will be mist.`,
            `Have you heard about the new restaurant called Karma? There's no menu: You get what you deserve.`,
            `How does a rabbi make coffee? Hebrews it.`,
            `What's red and moves up and down? A tomato in an elevator.`,
            `What do you call a parade of rabbits hopping backwards? A receding hare-line.`,
            `What is Forrest Gump's password? 1Forrest1.`,
            `Why do French people eat snails? They don't like fast food.`,
            `What sits at the bottom of the sea and twitches? A nervous wreck.`,
            `A woman in labor suddenly shouted, "Shouldn't! Wouldn't! Couldn't! Didn't! Can't!"\n"Don't worry," the doctor said. "Those are just contractions."`,
            `Why can't male ants sink? They're buoy-ant.`
        ]

        const randomNumber = Math.floor(Math.random() * 20);

        const embed = new EmbedBuilder()
            .setColor('#2F3136')
            .setDescription(jokeStorage[randomNumber]);

        await interaction.reply({
            embeds: [embed]
        });
    }
}