async function createTeam(teamName, division, managerUid) {
  await firebase.firestore().collection('pce_teams').add({
    name: teamName,
    division,
    managerUid,
    players: [],
    stats: {
      wins: 0,
      losses: 0,
      draws: 0,
      goalsFor: 0,
      goalsAgainst: 0
    },
    trophies: []
  });
} 
async function addPlayerToTeam(teamId, playerUid) {
  const teamRef = firebase.firestore().collection('pce_teams').doc(teamId);
  await teamRef.update({
    players: firebase.firestore.FieldValue.arrayUnion(playerUid)
  });
} 
async function updateTeamStats(teamId, statsUpdate) {
  const teamRef = firebase.firestore().collection('pce_teams').doc(teamId);
  await teamRef.update({
    stats: statsUpdate
  });
}