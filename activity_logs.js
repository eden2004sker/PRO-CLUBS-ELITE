await db.collection("pce_activity_logs").add({
  userId: user.uid,
  action: "Signed contract with FC Elite",
  type: "contract",
  timestamp: new Date(),
  details: {
    teamId: "team_fc_elite",
    contractId: "contract_001"
  }
});