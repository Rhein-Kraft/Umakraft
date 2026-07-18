const { fetchMemberList } = require('../member/memberlist');

module.exports = {
  data: {
    name: 'memberlist',
    description: 'Lists active members of a circle.',
    options: [
      {
        name: 'circle_id',
        description: 'Circle identifier or uma.moe circle URL',
        type: 'STRING',
        required: true,
      },
    ],
  },

  async execute({ interaction }) {
    const rawCircleId = interaction.options.getString('circle_id');
    await interaction.deferReply();

    let result;
    try {
      result = await fetchMemberList(rawCircleId);
    } catch (error) {
      return interaction.editReply({
        content: `Failed to fetch member list: ${error.message}`,
        ephemeral: true,
      });
    }

    if (result.success === false) {
      return interaction.editReply({
        content: result.message || 'Unable to retrieve the member list. Please try again later.',
        ephemeral: true,
      });
    }

    const circleName = result.circle && result.circle.name ? `${result.circle.name} (${result.circle.circle_id})` : rawCircleId;
    const members = Array.isArray(result.members) ? result.members : [];

    if (members.length === 0) {
      return interaction.editReply({
        content: `No active members found for circle ${circleName}.`,
        ephemeral: true,
      });
    }

    const topMembers = members.slice(0, 10);
    const memberLines = topMembers.map((member, index) => {
      const name = member.trainer_name || `Viewer ${member.viewer_id}`;
      const latestFans = Array.isArray(member.daily_fans) ? member.daily_fans[member.daily_fans.length - 1] : null;
      const activeText = latestFans !== null && latestFans !== undefined ? `${latestFans.toLocaleString()} fans` : 'fans unavailable';
      return `**${index + 1}.** ${name} — ${activeText}`;
    });

    const embed = {
      title: `Circle Member List — ${circleName}`,
      description: memberLines.join('\n'),
      color: 0x1abc9c,
      fields: [
        {
          name: 'Total Active Members',
          value: `${members.length}`,
          inline: true,
        },
        {
          name: 'Circle ID',
          value: `${result.circle?.circle_id || 'unknown'}`,
          inline: true,
        },
      ],
      footer: {
        text: 'Uma.moe circle member report',
      },
      timestamp: new Date().toISOString(),
    };

    if (members.length > topMembers.length) {
      embed.fields.push({
        name: 'Note',
        value: `Showing first ${topMembers.length} members of ${members.length}.`,
      });
    }

    return interaction.editReply({
      content: `Member list for circle ${circleName}:`,
      embeds: [embed],
    });
  },
};
