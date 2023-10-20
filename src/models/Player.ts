import { Skill } from "./Skill";

export enum Position {
  Goalkeeper = "Goalkeeper",
  Defender = "Defender",
  Midfielder = "Midfielder",
  Forward = "Forwardpo",
}

export type Player = {
  id: number;
  name: string;
  position: Position;
  skillLevels: Skill;
};
