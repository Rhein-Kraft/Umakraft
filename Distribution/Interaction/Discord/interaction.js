const { loadCommands } = require('./commands');

function createDiscordInteraction({ services, logger }) {
  const commands = loadCommands();

  async function handleInteraction(interaction) {
    const commandName = interaction.commandName;
    const command = commands.get(commandName);

    if (interaction.isAutocomplete?.()) {
      if (command?.autocomplete) {
        try {
          return await command.autocomplete({ interaction, services, logger });
        } catch (error) {
          logger?.warn?.('Discord autocomplete error', { command: commandName, error });
          return interaction.respond?.([]);
        }
      }
      return;
    }

    if (!interaction.isCommand?.()) return;

    if (!command) {
      return interaction.reply({
        content: `Unknown command: ${commandName}`,
        ephemeral: true,
      });
    }

    try {
      const response = await command.execute({ interaction, services, logger });
      if (response && typeof response === 'object' && response.content) {
        if (response.ephemeral) {
          return interaction.editReply(response);
        }
        return interaction.editReply(response);
      }
    } catch (error) {
      logger?.error?.('Discord command error', { command: commandName, error });
      if (!interaction.replied && !interaction.deferred) {
        return interaction.reply({
          content: 'An error occurred while processing your command.',
          ephemeral: true,
        });
      }
      return interaction.editReply({
        content: 'An error occurred while processing your command.',
      });
    }
  }

  return {
    handleInteraction,
    getRegisteredCommands: () => Array.from(commands.values()).map((command) => command.data),
  };
}

module.exports = createDiscordInteraction;
