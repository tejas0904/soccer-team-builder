import * as Realm from "realm-web";
import { Player } from "../models/Player";
export const toggleBoolean = (prev: boolean) => !prev;

const isValidArrayIndex = (arr: any[], idx: number) => {
  return !(idx < 0 || idx >= arr.length);
};

export function addValueAtIndex(arr: any[], idx: number, value: number) {
  if (!isValidArrayIndex(arr, idx) && idx !== arr.length) {
    throw new Error(`Cannot add value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), value, ...arr.slice(idx)];
}

export function replaceValueAtIndex(arr: any[], idx: any, newValue: number) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot replace value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), newValue, ...arr.slice(idx + 1)];
}

export function updateValueAtIndex(arr: any[], idx: any, updater: any) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot update value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), updater(arr[idx]), ...arr.slice(idx + 1)];
}

export function removeValueAtIndex(arr: any[], idx: any) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot remove value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

export const createObjectId = () => {
  return new Realm.BSON.ObjectId();
};

export const getPlayerId = (player: Player) => {
  if (player.id instanceof Realm.BSON.ObjectId) {
    return player.id.toHexString();
  }
  return player.id;
};

export const isSamePlayer = (player1: Player, player2: Player) => getPlayerId(player1) === getPlayerId(player2);

export const getPlayersIndex = (players: Player[], player: Player) => {
  const idx = players.findIndex((p) => isSamePlayer(p, player));
  return idx >= 0 ? idx : null;
};

// ---------------------

export const getRestValues = (data: any) => {
  const { __typename, ...rest } = data;
  return rest;
};
