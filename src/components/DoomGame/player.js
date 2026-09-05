import { isWall } from "./map";

export const PLAYER_SPEED = 2.8;
export const ROTATION_SPEED = 2.4;

export function createPlayer(start) {
  return {
    x: start.x,
    y: start.y,
    angle: start.angle,
    health: 100,
    ammo: 24,
    score: 0,
  };
}

export function movePlayer(
  player,
  direction,
  deltaTime
) {
  const distance =
    direction *
    PLAYER_SPEED *
    deltaTime;

  const nextX =
    player.x +
    Math.cos(player.angle) *
      distance;

  const nextY =
    player.y +
    Math.sin(player.angle) *
      distance;

  const radius = 0.18;

  if (
    !isWall(
      nextX + radius,
      player.y
    ) &&
    !isWall(
      nextX - radius,
      player.y
    )
  ) {
    player.x = nextX;
  }

  if (
    !isWall(
      player.x,
      nextY + radius
    ) &&
    !isWall(
      player.x,
      nextY - radius
    )
  ) {
    player.y = nextY;
  }
}

export function rotatePlayer(
  player,
  direction,
  deltaTime
) {
  player.angle +=
    direction *
    ROTATION_SPEED *
    deltaTime;
}