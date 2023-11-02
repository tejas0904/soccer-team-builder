import { Player, Position } from "../models/Player";
import * as Realm from "realm-web";

function generateMockObjectId(): Realm.BSON.ObjectId {
  const hexString = "123456789012345678901234";
  return new Realm.BSON.ObjectId(hexString);
}

export const mockPlayers: Player[] = [
  {
    id: generateMockObjectId(),
    email: "test@test.com",
    phone: "2211231230",
    name: "John Doe",
    position: Position.Goalie,
    skillLevels: {
      attack: 80,
      defence: 70,
      agility: 60,
      ballControl: 90,
      speed: 50,
    },
  },
  {
    id: generateMockObjectId(),
    email: "test@test.com",
    phone: "2211231230",
    name: "Jane Smith",
    position: Position.Defence,
    skillLevels: {
      attack: 50,
      defence: 60,
      agility: 40,
      ballControl: 95,
      speed: 50,
    },
  },
  {
    id: generateMockObjectId(),
    email: "test@test.com",
    phone: "2211231230",
    name: "Mike Johnson",
    position: Position.Midfield,
    skillLevels: {
      attack: 75,
      defence: 85,
      agility: 90,
      ballControl: 70,
      speed: 50,
    },
  },
  {
    id: generateMockObjectId(),
    email: "test@test.com",
    phone: "2211231230",
    name: "Sarah Thompson",
    position: Position.Forward,
    skillLevels: {
      attack: 95,
      defence: 80,
      agility: 85,
      ballControl: 30,
      speed: 50,
    },
  },
];
