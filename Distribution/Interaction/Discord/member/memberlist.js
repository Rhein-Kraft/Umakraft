const { callMiner } = require('../../../../Umamoe/Miner/miner');
const { normalizeCircleId } = require('../commands/circle-utils');

async function fetchMemberList(circleInput){
  const circleId = normalizeCircleId(circleInput);
  const result = await callMiner({
    endpoint: '/api/v4/circles',
    queryParams: { circle_id: circleId }
  });

  if(result.success === false){
    return { success: false, error: result.error, message: result.message, metadata: result.metadata };
  }

  const circleData = result.data;
  if(!circleData || !circleData.members){
    return { success: false, error: 'MEMBERLIST_NO_DATA', message: 'No member data returned from uma.moe' };
  }

  return { success: true, circle: circleData.circle || null, members: circleData.members };
}

module.exports = { fetchMemberList };
