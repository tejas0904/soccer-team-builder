import { Skill } from "./Skill";
import * as Realm from "realm-web";

export enum Position {
  Select = "-Select-",
  Goalie = "Goalie",
  Defence = "Defence",
  Midfield = "Midfield",
  Forward = "Forward",
  AllRounder = "All Rounder"
}

export type Player = {
  id?: Realm.BSON.ObjectId | undefined;
  isAvailable?: boolean;
  name: string;
  email: string;
  phone: string;
  //photo?: TODO think of a strategy
  position: Position;
  skillLevels: Skill;
  comments?: string;
};
