enum Position {
  Goalkeeper,
  Defender,
  Midfielder,
  Forward,
}

interface Player {
  name: string;
  position: Position;
  skillLevels: {
    ballControl: number;
    attack: number;
    defense: number;
    agility: number;
    otherTraits: number;
  };
}

interface Team {
  name: string;
  players: Player[];
}

function generateTeams(players: Player[], numTeams: number): Team[] {
  // Sort the players by overall skill level in descending order
  players.sort((a, b) => calculateOverallSkillLevel(b) - calculateOverallSkillLevel(a));

  // Create an array to hold the players for each position
  const positionPlayers: Player[][] = [];

  // Initialize the positionPlayers array
  for (let i = 0; i < Object.keys(Position).length / 2; i++) {
    positionPlayers[i] = [];
  }

  // Assign players to their respective position arrays
  players.forEach((player) => {
    positionPlayers[player.position].push(player);
  });

  // Create the specified number of teams
  const teams: Team[] = [];
  for (let i = 0; i < numTeams; i++) {
    teams.push({
      name: `Team ${i + 1}`,
      players: [],
    });
  }

  // Assign players to teams based on position and overall skill level
  positionPlayers.forEach((positionPlayer) => {
    const numPlayersPerTeam = Math.floor(positionPlayer.length / numTeams);
    let currentTeamIndex = 0;

    // Assign an equal number of players for the position to each team
    for (let i = 0; i < numPlayersPerTeam * numTeams; i++) {
      const player = positionPlayer[i];
      const currentTeam = teams[currentTeamIndex];
      currentTeam.players.push(player);

      // Move to the next team
      currentTeamIndex = (currentTeamIndex + 1) % numTeams;
    }
  });

  return teams;
}

function calculateOverallSkillLevel(player: Player): number {
  const { ballControl, attack, defense, agility, otherTraits } = player.skillLevels;
  return (ballControl + attack + defense + agility + otherTraits) / 5;
}

const players: Player[] = [
  {
    name: "Player 1",
    position: Position.Goalkeeper,
    skillLevels: {
      ballControl: 6,
      attack: 2,
      defense: 8,
      agility: 7,
      otherTraits: 5,
    },
  },
  {
    name: "Player 2",
    position: Position.Defender,
    skillLevels: {
      ballControl: 5,
      attack: 3,
      defense: 9,
      agility: 6,
      otherTraits: 4,
    },
  },
  {
    name: "Player 3",
    position: Position.Defender,
    skillLevels: {
      ballControl: 4,
      attack: 2,
      defense: 8,
      agility: 6,
      otherTraits: 3,
    },
  },
  {
    name: "Player 4",
    position: Position.Midfielder,
    skillLevels: {
      ballControl: 7,
      attack: 6,
      defense: 5,
      agility: 8,
      otherTraits: 4,
    },
  },
  {
    name: "Player 5",
    position: Position.Midfielder,
    skillLevels: {
      ballControl: 8,
      attack: 7,
      defense: 4,
      agility: 9,
      otherTraits: 5,
    },
  },
  {
    name: "Player 6",
    position: Position.Forward,
    skillLevels: {
      ballControl: 9,
      attack: 9,
      defense: 3,
      agility: 8,
      otherTraits: 5,
    },
  },
];

const numTeams = 2;
const teams = generateTeams(players, numTeams);

console.log(`Generated ${numTeams} teams:`);
teams.forEach((team) => {
  console.log(`${team.name}:`);
  team.players.forEach((player) => {
    console.log(`  - ${player.name} (Position: ${Position[player.position]}, Skill Levels: ${JSON.stringify(player.skillLevels)})`);
  });
});
