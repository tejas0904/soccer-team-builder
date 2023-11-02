import { Player } from "../models/Player";
import { Team } from "../models/Team";

export function generateBalancedTeams(players: Player[], numTeams: number): Team[] {
  // Create an array of teams
  const teams: Team[] = Array.from({ length: numTeams }, (_, i) => ({
    name: `Team ${i + 1}`,
    players: [],
  }));

  // Sort players by skill level in descending order
  players.sort((a, b) => calculateAverageSkillLevel(b) - calculateAverageSkillLevel(a));

  // Initialize variables to keep track of team index
  let currentTeamIndex = 0;
  let currentTeam = teams[currentTeamIndex];

  // Distribute players to teams
  players.forEach((player) => {
    currentTeam.players.push(player);
    currentTeamIndex = (currentTeamIndex + 1) % numTeams;
    currentTeam = teams[currentTeamIndex];
  });

  return teams;
}

// Helper function to calculate the average skill level of a player
function calculateAverageSkillLevel(player: Player): number {
  const skillLevels = Object.values(player.skillLevels);
  const sum = skillLevels.reduce((acc, skill) => acc + skill, 0);
  return sum / skillLevels.length;
}

// export default function generateTeams(players: Player[], numTeams: number): Team[] {
//   // Sort the players by overall skill level in descending order
//   players.sort((a, b) => calculateOverallSkillLevel(b) - calculateOverallSkillLevel(a));

//   // Create an array to hold the players for each position
//   const positionPlayers: Player[][] = [];

//   // Initialize the positionPlayers array
//   for (let i = 0; i < Object.keys(Position).length / 2; i++) {
//     positionPlayers[i] = [];
//   }

//   // Assign players to their respective position arrays
//   players.forEach((player: any) => {
//     positionPlayers[player.position].push(player);
//   });

//   // Create the specified number of teams
//   const teams: Team[] = [];
//   for (let i = 0; i < numTeams; i++) {
//     teams.push({
//       name: `Team ${i + 1}`,
//       players: [],
//     });
//   }

//   // Assign players to teams based on position and overall skill level
//   positionPlayers.forEach((positionPlayer) => {
//     const numPlayersPerTeam = Math.floor(positionPlayer.length / numTeams);
//     let currentTeamIndex = 0;

//     // Assign an equal number of players for the position to each team
//     for (let i = 0; i < numPlayersPerTeam * numTeams; i++) {
//       const player = positionPlayer[i];
//       const currentTeam = teams[currentTeamIndex];
//       currentTeam.players.push(player);

//       // Move to the next team
//       currentTeamIndex = (currentTeamIndex + 1) % numTeams;
//     }
//   });

//   return teams;
// }

// function calculateOverallSkillLevel(player: Player): number {
//   const { ballControl, attack, defence, agility, speed } = player.skillLevels;
//   return (ballControl + attack + defence + agility + speed) / 5;
// }

// const players: Player[] = [
//   {
//     name: "Player 1",
//     position: Position.Goalkeeper,
//     skillLevels: {
//       ballControl: 6,
//       attack: 2,
//       defence: 8,
//       agility: 7,
//       speed: 5,
//     },
//   },
//   {
//     name: "Player 2",
//     position: Position.Defence,
//     skillLevels: {
//       ballControl: 5,
//       attack: 3,
//       defence: 9,
//       agility: 6,
//       otherTraits: 4,
//     },
//   },
//   {
//     name: "Player 3",
//     position: Position.Defence,
//     skillLevels: {
//       ballControl: 4,
//       attack: 2,
//       defence: 8,
//       agility: 6,
//       otherTraits: 3,
//     },
//   },
//   {
//     name: "Player 4",
//     position: Position.Midfield,
//     skillLevels: {
//       ballControl: 7,
//       attack: 6,
//       defence: 5,
//       agility: 8,
//       otherTraits: 4,
//     },
//   },
//   {
//     name: "Player 5",
//     position: Position.Midfield,
//     skillLevels: {
//       ballControl: 8,
//       attack: 7,
//       defence: 4,
//       agility: 9,
//       otherTraits: 5,
//     },
//   },
//   {
//     name: "Player 6",
//     position: Position.Forward,
//     skillLevels: {
//       ballControl: 9,
//       attack: 9,
//       defence: 3,
//       agility: 8,
//       otherTraits: 5,
//     },
//   },
// ];

// const numTeams = 2;
// const teams = generateTeams(players, numTeams);

// console.log(`Generated ${numTeams} teams:`);
// teams.forEach((team) => {
//   console.log(`${team.name}:`);
//   team.players.forEach((player) => {
//     console.log(`  - ${player.name} (Position: ${Position[player.position]}, Skill Levels: ${JSON.stringify(player.skillLevels)})`);
//   });
// });
