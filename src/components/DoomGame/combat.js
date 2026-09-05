import {
  MAP,
  MAP_WIDTH,
  MAP_HEIGHT,
} from "./map";

const MAX_SHOOT_DISTANCE = 20;
const SHOOT_ANGLE = 0.09;

function normalizeAngle(angle) {
  while (angle > Math.PI) {
    angle -= Math.PI * 2;
  }

  while (angle < -Math.PI) {
    angle += Math.PI * 2;
  }

  return angle;
}

function castBulletRay(
  player,
  targetDistance
) {
  const directionX =
    Math.cos(player.angle);

  const directionY =
    Math.sin(player.angle);

  let distance = 0;

  while (
    distance <
    targetDistance
  ) {
    distance += 0.02;

    const rayX =
      player.x +
      directionX *
        distance;

    const rayY =
      player.y +
      directionY *
        distance;

    const mapX =
      Math.floor(rayX);

    const mapY =
      Math.floor(rayY);

    if (
      mapX < 0 ||
      mapX >= MAP_WIDTH ||
      mapY < 0 ||
      mapY >= MAP_HEIGHT
    ) {
      return false;
    }

    if (
      MAP[mapY][mapX] === "1"
    ) {
      return false;
    }
  }

  return true;
}

export function shootEnemy(
  player,
  enemies
) {
  let closestEnemy = null;

  let closestDistance =
    MAX_SHOOT_DISTANCE;

  let closestAngle = 0;

  for (
    const enemy of enemies
  ) {
    if (
      !enemy.alive
    ) {
      continue;
    }

    const dx =
      enemy.x - player.x;

    const dy =
      enemy.y - player.y;

    const distance =
      Math.hypot(
        dx,
        dy
      );

    if (
      distance >
      MAX_SHOOT_DISTANCE
    ) {
      continue;
    }

    const enemyAngle =
      Math.atan2(
        dy,
        dx
      );

    const angle =
      normalizeAngle(
        enemyAngle -
          player.angle
      );

    if (
      Math.abs(angle) >
      SHOOT_ANGLE
    ) {
      continue;
    }

    if (
      distance <
      closestDistance
    ) {
      closestEnemy =
        enemy;

      closestDistance =
        distance;

      closestAngle =
        angle;
    }
  }

  if (!closestEnemy) {
    return null;
  }

  const clearShot =
    castBulletRay(
      player,
      closestDistance
    );

  if (!clearShot) {
    return null;
  }

  return {
    enemy: closestEnemy,

    distance:
      closestDistance,

    angle:
      closestAngle,

    impactX:
      closestEnemy.x,

    impactY:
      closestEnemy.y,

    accuracy:
      Math.max(
        0,
        1 -
          Math.abs(
            closestAngle
          ) /
            SHOOT_ANGLE
      ),
  };
}