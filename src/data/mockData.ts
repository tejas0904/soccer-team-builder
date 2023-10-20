import { Player, Position } from "../models/Player";

export const mockPlayers: Player[] = [
  {
    id: 1,
    name: "John Doe",
    position: Position.Goalkeeper,
    skillLevels: {
      attack: 80,
      defense: 70,
      agility: 60,
      ballControl: 90,
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    position: Position.Defender,
    skillLevels: {
      attack: 50,
      defense: 60,
      agility: 40,
      ballControl: 95,
    },
  },
  {
    id: 3,
    name: "Mike Johnson",
    position: Position.Midfielder,
    skillLevels: {
      attack: 75,
      defense: 85,
      agility: 90,
      ballControl: 70,
    },
  },
  {
    id: 4,
    name: "Sarah Thompson",
    position: Position.Forward,
    skillLevels: {
      attack: 95,
      defense: 80,
      agility: 85,
      ballControl: 30,
    },
  },
];
