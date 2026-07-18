/**
 * Distribution Retriever
 * Fetches approved deliverables from the Miner pipeline based on request type.
 */
const { callMiner } = require('../../Umamoe/Miner/miner');

async function fetchApprovedDeliverable(request) {
  if (!request || !request.type) return null;

  const { type, trainerId, circleId, fanCount, userId, targetDiscordId, metadata } = request;

  try {
    switch (type) {
      case 'profile':
        return callMiner({
          endpoint: '/v4/user/profile/{account_id}',
          pathParams: { account_id: trainerId },
        });

      case 'circle':
        return callMiner({
          endpoint: '/v4/circles',
          queryParams: { circle_id: circleId },
        });

      case 'fan_gain':
        return callMiner({
          endpoint: '/v4/rankings/gains',
          queryParams: { viewer_id: trainerId },
        });

      case 'link':
        // Synthetic product — links Discord user to trainer ID
        return {
          success: true,
          data: {
            type: 'link',
            trainerId,
            discordId: targetDiscordId,
            discordName: metadata?.targetDiscordName || 'Unknown',
            linkedAt: new Date().toISOString(),
          },
        };

      case 'set_fans':
        return {
          success: true,
          data: {
            type: 'set_fans',
            fanCount,
            userId,
            recordedAt: new Date().toISOString(),
          },
        };

      default:
        return null;
    }
  } catch (err) {
    console.error(`[retriever] fetchApprovedDeliverable failed for type=${type}:`, err.message);
    return null;
  }
}

module.exports = { fetchApprovedDeliverable };
