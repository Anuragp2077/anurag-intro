import {
  isWall,
  MAP,
  MAP_WIDTH,
  MAP_HEIGHT,
} from "./map";

const MIN_PLAYER_DISTANCE = 4;
const MIN_ENEMY_DISTANCE = 2;
const ENEMY_COUNT = 5;

const ENEMY_SPEED = 0.45;

const ALERT_DISTANCE = 7;
const ATTACK_DISTANCE = 1.6;

const ATTACK_COOLDOWN = 1.2;
const ATTACK_DAMAGE = 8;

function isValidSpawn(x, y) {
  const radius = 0.22;

  return (
    !isWall(x, y) &&
    !isWall(x + radius, y) &&
    !isWall(x - radius, y) &&
    !isWall(x, y + radius) &&
    !isWall(x, y - radius)
  );
}

function getRandomSpawnPositions(player) {
  const positions = [];
  const candidates = [];

  for (
    let y = 0;
    y < MAP_HEIGHT;
    y++
  ) {
    for (
      let x = 0;
      x < MAP_WIDTH;
      x++
    ) {
      if (MAP[y][x] !== "0") {
        continue;
      }

      const spawnX = x + 0.5;
      const spawnY = y + 0.5;

      if (
        !isValidSpawn(
          spawnX,
          spawnY
        )
      ) {
        continue;
      }

      const distanceFromPlayer =
        Math.hypot(
          spawnX - player.x,
          spawnY - player.y
        );

      if (
        distanceFromPlayer <
        MIN_PLAYER_DISTANCE
      ) {
        continue;
      }

      candidates.push({
        x: spawnX,
        y: spawnY,
      });
    }
  }

  /*
   * Shuffle candidates.
   */
  for (
    let i =
      candidates.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() *
          (i + 1)
      );

    [
      candidates[i],
      candidates[j],
    ] = [
      candidates[j],
      candidates[i],
    ];
  }

  /*
   * Pick sufficiently separated
   * spawn locations.
   */
  for (
    const candidate of candidates
  ) {
    const tooClose =
      positions.some(
        (position) =>
          Math.hypot(
            position.x -
              candidate.x,
            position.y -
              candidate.y
          ) <
          MIN_ENEMY_DISTANCE
      );

    if (tooClose) {
      continue;
    }

    positions.push(candidate);

    if (
      positions.length >=
      ENEMY_COUNT
    ) {
      break;
    }
  }

  return positions;
}

export function createEnemies(
  player
) {
  const spawnPositions =
    getRandomSpawnPositions(
      player
    );

  return spawnPositions.map(
    (position, index) => ({
      id: index + 1,

      x: position.x,
      y: position.y,

      health: 3,
      maxHealth: 3,

      alive: true,

      /*
       * AI state.
       */
      state: "idle",

      /*
       * Time spent in current state.
       */
      stateTimer: 0,

      /*
       * Attack cooldown.
       */
      attackTimer: 0,

      /*
       * Hit feedback.
       */
      hitFlash: 0,

      /*
       * Small movement smoothing.
       */
      lastDirectionX: 0,
      lastDirectionY: 0,

      /*
       * Death feedback.
       *
       * dying becomes true when the
       * final shot lands.
       *
       * deathStartedAt lets the renderer
       * animate the corpse without
       * needing another game-loop state.
       */
      dying: false,
      deathStartedAt: 0,
    })
  );
}

/*
 * Determine whether the enemy has a
 * clear view of the player.
 */
function hasLineOfSight(
  enemy,
  player
) {
  const dx =
    player.x - enemy.x;

  const dy =
    player.y - enemy.y;

  const distance =
    Math.hypot(dx, dy);

  if (distance <= 0) {
    return true;
  }

  const directionX =
    dx / distance;

  const directionY =
    dy / distance;

  let travelled = 0;

  while (
    travelled < distance
  ) {
    travelled += 0.04;

    const checkX =
      enemy.x +
      directionX *
        travelled;

    const checkY =
      enemy.y +
      directionY *
        travelled;

    const mapX =
      Math.floor(checkX);

    const mapY =
      Math.floor(checkY);

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

function canMoveTo(
  x,
  y,
  radius = 0.22
) {
  return (
    !isWall(
      x + radius,
      y
    ) &&
    !isWall(
      x - radius,
      y
    ) &&
    !isWall(
      x,
      y + radius
    ) &&
    !isWall(
      x,
      y - radius
    )
  );
}

/*
 * Move an enemy toward the player
 * while respecting walls.
 */
function moveEnemy(
  enemy,
  player,
  deltaTime
) {
  const dx =
    player.x - enemy.x;

  const dy =
    player.y - enemy.y;

  const distance =
    Math.hypot(dx, dy);

  if (distance <= 0.01) {
    return;
  }

  const directionX =
    dx / distance;

  const directionY =
    dy / distance;

  enemy.lastDirectionX =
    directionX;

  enemy.lastDirectionY =
    directionY;

  const movement =
    ENEMY_SPEED *
    deltaTime;

  const nextX =
    enemy.x +
    directionX *
      movement;

  const nextY =
    enemy.y +
    directionY *
      movement;

  /*
   * X and Y are checked separately
   * so enemies can slide around
   * corners instead of getting stuck.
   */
  if (
    canMoveTo(
      nextX,
      enemy.y
    )
  ) {
    enemy.x = nextX;
  }

  if (
    canMoveTo(
      enemy.x,
      nextY
    )
  ) {
    enemy.y = nextY;
  }
}

function setState(
  enemy,
  state
) {
  if (
    enemy.state === state
  ) {
    return;
  }

  enemy.state =
    state;

  enemy.stateTimer = 0;
}

export function updateEnemies(
  enemies,
  player,
  deltaTime
) {
  for (
    const enemy of enemies
  ) {
    if (!enemy.alive) {
      continue;
    }

    enemy.stateTimer +=
      deltaTime;

    enemy.attackTimer =
      Math.max(
        0,
        enemy.attackTimer -
          deltaTime
      );

    enemy.hitFlash =
      Math.max(
        0,
        enemy.hitFlash -
          deltaTime
      );

    const dx =
      player.x - enemy.x;

    const dy =
      player.y - enemy.y;

    const distance =
      Math.hypot(
        dx,
        dy
      );

    const canSeePlayer =
      hasLineOfSight(
        enemy,
        player
      );

    /*
     * =========================
     * IDLE
     * =========================
     */
    if (
      enemy.state === "idle"
    ) {
      if (
        canSeePlayer &&
        distance <=
          ALERT_DISTANCE
      ) {
        setState(
          enemy,
          "alert"
        );
      }

      continue;
    }

    /*
     * =========================
     * ALERT
     * =========================
     */
    if (
      enemy.state === "alert"
    ) {
      if (
        !canSeePlayer ||
        distance >
          ALERT_DISTANCE *
            1.25
      ) {
        setState(
          enemy,
          "idle"
        );

        continue;
      }

      if (
        enemy.stateTimer >
        0.18
      ) {
        setState(
          enemy,
          "chase"
        );
      }

      continue;
    }

    /*
     * =========================
     * CHASE
     * =========================
     */
    if (
      enemy.state === "chase"
    ) {
      if (
        distance <=
          ATTACK_DISTANCE &&
        canSeePlayer
      ) {
        setState(
          enemy,
          "attack"
        );

        continue;
      }

      if (
        !canSeePlayer
      ) {
        if (
          enemy.stateTimer >
          1.0
        ) {
          setState(
            enemy,
            "idle"
          );
        }

        continue;
      }

      moveEnemy(
        enemy,
        player,
        deltaTime
      );

      enemy.stateTimer = 0;

      continue;
    }

    /*
     * =========================
     * ATTACK
     * =========================
     */
    if (
      enemy.state === "attack"
    ) {
      if (
        distance >
          ATTACK_DISTANCE
      ) {
        setState(
          enemy,
          "chase"
        );

        continue;
      }

      if (
        !canSeePlayer
      ) {
        setState(
          enemy,
          "chase"
        );

        continue;
      }

      if (
        enemy.attackTimer <= 0
      ) {
        enemy.attackTimer =
          ATTACK_COOLDOWN;

        player.health -=
          ATTACK_DAMAGE;
      }

      continue;
    }
  }
}

export function damageEnemy(
  enemy,
  damage = 1
) {
  if (!enemy.alive) {
    return false;
  }

  enemy.health -=
    damage;

  /*
   * Stronger hit reaction.
   */
  enemy.hitFlash =
    0.14;

  /*
   * Getting shot immediately
   * alerts the enemy.
   */
  if (
    enemy.state === "idle"
  ) {
    setState(
      enemy,
      "chase"
    );
  }

  /*
   * Enemy survives.
   */
  if (
    enemy.health > 0
  ) {
    return false;
  }

  /*
   * Final hit.
   *
   * Keep the enemy object around
   * temporarily so the renderer can
   * display the death animation.
   */
  enemy.health = 0;

  enemy.alive = false;

  enemy.dying = true;

  enemy.deathStartedAt =
    performance.now();

  enemy.state =
    "dead";

  return true;
}