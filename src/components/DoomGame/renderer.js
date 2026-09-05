import {
  MAP,
  MAP_WIDTH,
  MAP_HEIGHT,
} from "./map";

const FOV = Math.PI / 3;
const MAX_DEPTH = 20;

const DEATH_DURATION = 0.42;

/*
 * =========================================================
 * ANGLE
 * =========================================================
 */

function normalizeAngle(angle) {
  while (angle > Math.PI) {
    angle -= Math.PI * 2;
  }

  while (angle < -Math.PI) {
    angle += Math.PI * 2;
  }

  return angle;
}

/*
 * =========================================================
 * RAYCAST
 * =========================================================
 */

function castRay(
  player,
  rayAngle
) {
  const directionX =
    Math.cos(rayAngle);

  const directionY =
    Math.sin(rayAngle);

  let distance = 0;

  while (
    distance <
    MAX_DEPTH
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
      return MAX_DEPTH;
    }

    if (
      MAP[mapY][mapX] === "1"
    ) {
      return distance;
    }
  }

  return MAX_DEPTH;
}

/*
 * =========================================================
 * ENEMY DEATH EFFECT
 * =========================================================
 */

function drawEnemyDeath(
  ctx,
  width,
  height,
  player,
  enemy,
  depthBuffer
) {
  if (
    !enemy.dying ||
    !enemy.deathStartedAt
  ) {
    return;
  }

  const elapsed =
    (
      performance.now() -
      enemy.deathStartedAt
    ) / 1000;

  const progress =
    Math.max(
      0,
      Math.min(
        1,
        elapsed /
          DEATH_DURATION
      )
    );

  /*
   * Smooth easing.
   */
  const eased =
    1 -
    Math.pow(
      1 - progress,
      3
    );

  const dx =
    enemy.x - player.x;

  const dy =
    enemy.y - player.y;

  const distance =
    Math.hypot(dx, dy);

  if (distance <= 0.1) {
    return;
  }

  const angleToEnemy =
    Math.atan2(dy, dx);

  const relativeAngle =
    normalizeAngle(
      angleToEnemy -
        player.angle
    );

  if (
    Math.abs(relativeAngle) >
    FOV / 2 + 0.25
  ) {
    return;
  }

  const correctedDistance =
    distance *
    Math.cos(relativeAngle);

  if (
    correctedDistance <= 0
  ) {
    return;
  }

  /*
   * Make sure the death effect is
   * still behind walls.
   */

  const screenX =
    width / 2 +
    (
      relativeAngle /
        (FOV / 2)
    ) *
      (width / 2);

  const centerColumn =
    Math.max(
      0,
      Math.min(
        depthBuffer.length - 1,
        Math.floor(screenX)
      )
    );

  if (
    correctedDistance >
    depthBuffer[centerColumn]
  ) {
    return;
  }

  const originalHeight =
    Math.min(
      height * 1.2,
      height /
        correctedDistance *
        0.95
    );

  const originalWidth =
    originalHeight *
    0.48;

  /*
   * Collapse downward and slightly
   * shrink as the enemy dies.
   */

  const scale =
    1 -
    eased * 0.55;

  const enemyHeight =
    originalHeight *
    scale;

  const enemyWidth =
    originalWidth *
    scale;

  const fallOffset =
    originalHeight *
    0.32 *
    eased;

  const top =
    height / 2 -
    enemyHeight * 0.5 +
    fallOffset;

  const left =
    screenX -
    enemyWidth * 0.5;

  const right =
    screenX +
    enemyWidth * 0.5;

  const startColumn =
    Math.max(
      0,
      Math.floor(left)
    );

  const endColumn =
    Math.min(
      width - 1,
      Math.ceil(right)
    );

  /*
   * Fade toward the end.
   */

  const opacity =
    Math.max(
      0,
      1 -
        progress *
          0.85
    );

  ctx.save();

  ctx.globalAlpha =
    opacity;

  /*
   * Slight sideways collapse.
   */
  const tilt =
    eased * 0.16;

  /*
   * Draw each visible column.
   */

  for (
    let x = startColumn;
    x <= endColumn;
    x++
  ) {
    if (
      correctedDistance >
      depthBuffer[x]
    ) {
      continue;
    }

    const normalized =
      (x - left) /
      Math.max(
        1,
        right - left
      );

    const centerDistance =
      Math.abs(
        normalized - 0.5
      );

    /*
     * Apply a small rotation-like
     * horizontal distortion.
     */
    const tiltOffset =
      (
        normalized -
        0.5
      ) *
      originalHeight *
      tilt;

    const columnX =
      screenX +
      (
        x -
        screenX
      ) +
      tiltOffset;

    /*
     * Head
     */

    const headRadius =
      enemyWidth * 0.27;

    const headCenterX =
      columnX;

    const headCenterY =
      top +
      enemyHeight * 0.22;

    if (
      centerDistance <
      0.27
    ) {
      ctx.beginPath();

      ctx.arc(
        headCenterX,
        headCenterY,
        headRadius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        progress < 0.22
          ? "#ffffff"
          : "#777777";

      ctx.fill();
    }

    /*
     * Body
     */

    const bodyTop =
      top +
      enemyHeight * 0.36;

    const bodyBottom =
      top +
      enemyHeight * 0.82;

    const bodyWidth =
      enemyWidth * 0.72;

    if (
      Math.abs(
        x - screenX
      ) <
      bodyWidth / 2
    ) {
      const bodyGradient =
        ctx.createLinearGradient(
          screenX -
            bodyWidth / 2,
          0,
          screenX +
            bodyWidth / 2,
          0
        );

      bodyGradient.addColorStop(
        0,
        "#444444"
      );

      bodyGradient.addColorStop(
        0.5,
        progress < 0.18
          ? "#ffffff"
          : "#858585"
      );

      bodyGradient.addColorStop(
        1,
        "#3c3c3c"
      );

      ctx.fillStyle =
        bodyGradient;

      ctx.fillRect(
        columnX -
          bodyWidth / 2,
        bodyTop,
        bodyWidth,
        bodyBottom -
          bodyTop
      );
    }

    /*
     * Arms.
     */

    const armWidth =
      enemyWidth * 0.17;

    const armTop =
      bodyTop +
      enemyHeight * 0.04;

    const armHeight =
      enemyHeight * 0.28;

    ctx.fillStyle =
      "#5d5d5d";

    if (
      x >=
        screenX -
          bodyWidth / 2 -
          armWidth &&
      x <=
        screenX -
          bodyWidth / 2
    ) {
      ctx.fillRect(
        columnX -
          bodyWidth / 2 -
          armWidth,
        armTop,
        armWidth,
        armHeight
      );
    }

    if (
      x >=
        screenX +
          bodyWidth / 2 &&
      x <=
        screenX +
          bodyWidth / 2 +
          armWidth
    ) {
      ctx.fillRect(
        columnX +
          bodyWidth / 2,
        armTop,
        armWidth,
        armHeight
      );
    }

    /*
     * Legs.
     */

    const legTop =
      bodyBottom;

    const legBottom =
      top +
      enemyHeight * 1.02;

    const legWidth =
      enemyWidth * 0.24;

    ctx.fillStyle =
      "#494949";

    if (
      Math.abs(
        x -
          (
            screenX -
            enemyWidth *
              0.16
          )
      ) <
      legWidth / 2
    ) {
      ctx.fillRect(
        columnX -
          enemyWidth *
            0.16 -
          legWidth / 2,
        legTop,
        legWidth,
        legBottom -
          legTop
      );
    }

    if (
      Math.abs(
        x -
          (
            screenX +
            enemyWidth *
              0.16
          )
      ) <
      legWidth / 2
    ) {
      ctx.fillRect(
        columnX +
          enemyWidth *
            0.16 -
          legWidth / 2,
        legTop,
        legWidth,
        legBottom -
          legTop
      );
    }
  }

  /*
   * Death burst.
   *
   * Appears near the beginning and
   * expands outward before fading.
   */

  if (
    progress < 0.7
  ) {
    const burstProgress =
      Math.min(
        1,
        progress / 0.7
      );

    const burstRadius =
      originalWidth *
      (
        0.15 +
        burstProgress *
          0.7
      );

    const burstAlpha =
      (
        1 -
        burstProgress
      ) *
      0.55;

    ctx.globalAlpha =
      burstAlpha;

    /*
     * Orange glow.
     */

    const glow =
      ctx.createRadialGradient(
        screenX,
        top +
          enemyHeight *
            0.45,
        0,
        screenX,
        top +
          enemyHeight *
            0.45,
        burstRadius *
          1.8
      );

    glow.addColorStop(
      0,
      "rgba(255,255,255,0.9)"
    );

    glow.addColorStop(
      0.25,
      "rgba(255,112,66,0.7)"
    );

    glow.addColorStop(
      1,
      "rgba(255,112,66,0)"
    );

    ctx.fillStyle =
      glow;

    ctx.beginPath();

    ctx.arc(
      screenX,
      top +
        enemyHeight *
          0.45,
      burstRadius * 1.8,
      0,
      Math.PI * 2
    );

    ctx.fill();

    /*
     * Small particles.
     */

    ctx.globalAlpha =
      (
        1 -
        burstProgress
      ) *
      0.9;

    ctx.fillStyle =
      "#ff7042";

    const particleCount =
      8;

    for (
      let i = 0;
      i < particleCount;
      i++
    ) {
      const angle =
        (
          Math.PI * 2 *
          i
        ) /
        particleCount;

      const distanceOffset =
        burstRadius *
        (
          0.7 +
          (
            i % 3
          ) *
            0.18
        );

      const particleX =
        screenX +
        Math.cos(angle) *
          distanceOffset;

      const particleY =
        top +
        enemyHeight *
          0.45 +
        Math.sin(angle) *
          distanceOffset;

      const size =
        Math.max(
          1,
          originalWidth *
            0.025
        );

      ctx.fillRect(
        particleX -
          size / 2,
        particleY -
          size / 2,
        size,
        size
      );
    }
  }

  ctx.restore();
}

/*
 * =========================================================
 * ENEMY
 * =========================================================
 */

function drawEnemy(
  ctx,
  width,
  height,
  player,
  enemy,
  depthBuffer
) {
  const dx =
    enemy.x - player.x;

  const dy =
    enemy.y - player.y;

  const distance =
    Math.hypot(dx, dy);

  if (distance <= 0.1) {
    return;
  }

  const angleToEnemy =
    Math.atan2(dy, dx);

  const relativeAngle =
    normalizeAngle(
      angleToEnemy -
        player.angle
    );

  if (
    Math.abs(relativeAngle) >
    FOV / 2 + 0.25
  ) {
    return;
  }

  const correctedDistance =
    distance *
    Math.cos(relativeAngle);

  if (
    correctedDistance <= 0
  ) {
    return;
  }

  const screenX =
    width / 2 +
    (
      relativeAngle /
        (FOV / 2)
    ) *
      (width / 2);

  const enemyHeight =
    Math.min(
      height * 1.2,
      height /
        correctedDistance *
        0.95
    );

  const enemyWidth =
    enemyHeight * 0.48;

  const top =
    height / 2 -
    enemyHeight * 0.5;

  const left =
    screenX -
    enemyWidth * 0.5;

  const right =
    screenX +
    enemyWidth * 0.5;

  const startColumn =
    Math.max(
      0,
      Math.floor(left)
    );

  const endColumn =
    Math.min(
      width - 1,
      Math.ceil(right)
    );

  /*
   * Don't draw enemies behind walls.
   */

  for (
    let x = startColumn;
    x <= endColumn;
    x++
  ) {
    if (
      correctedDistance >
      depthBuffer[x]
    ) {
      continue;
    }

    const normalized =
      (x - left) /
      Math.max(
        1,
        right - left
      );

    const centerDistance =
      Math.abs(
        normalized - 0.5
      );

    /*
     * Head
     */

    const headRadius =
      enemyWidth * 0.27;

    const headCenterX =
      screenX;

    const headCenterY =
      top +
      enemyHeight * 0.22;

    if (
      centerDistance <
      0.27
    ) {
      ctx.beginPath();

      ctx.arc(
        headCenterX,
        headCenterY,
        headRadius,
        0,
        Math.PI * 2
      );

      if (
        enemy.hitFlash > 0
      ) {
        ctx.fillStyle =
          "#ffffff";
      } else {
        const headGradient =
          ctx.createLinearGradient(
            0,
            headCenterY -
              headRadius,
            0,
            headCenterY +
              headRadius
          );

        headGradient.addColorStop(
          0,
          "#dddddd"
        );

        headGradient.addColorStop(
          1,
          "#777777"
        );

        ctx.fillStyle =
          headGradient;
      }

      ctx.fill();
    }

    /*
     * Body
     */

    const bodyTop =
      top +
      enemyHeight * 0.36;

    const bodyBottom =
      top +
      enemyHeight * 0.82;

    const bodyWidth =
      enemyWidth * 0.72;

    if (
      Math.abs(
        x - screenX
      ) <
      bodyWidth / 2
    ) {
      if (
        enemy.hitFlash > 0
      ) {
        ctx.fillStyle =
          "#ffffff";
      } else {
        const bodyGradient =
          ctx.createLinearGradient(
            screenX -
              bodyWidth / 2,
            0,
            screenX +
              bodyWidth / 2,
            0
          );

        bodyGradient.addColorStop(
          0,
          "#555555"
        );

        bodyGradient.addColorStop(
          0.5,
          "#9b9b9b"
        );

        bodyGradient.addColorStop(
          1,
          "#4b4b4b"
        );

        ctx.fillStyle =
          bodyGradient;
      }

      ctx.fillRect(
        screenX -
          bodyWidth / 2,
        bodyTop,
        bodyWidth,
        bodyBottom -
          bodyTop
      );
    }

    /*
     * Arms
     */

    const armWidth =
      enemyWidth * 0.17;

    const armTop =
      bodyTop +
      enemyHeight * 0.04;

    const armHeight =
      enemyHeight * 0.28;

    ctx.fillStyle =
      enemy.hitFlash > 0
        ? "#ffffff"
        : "#707070";

    if (
      x >=
        screenX -
          bodyWidth / 2 -
          armWidth &&
      x <=
        screenX -
          bodyWidth / 2
    ) {
      ctx.fillRect(
        screenX -
          bodyWidth / 2 -
          armWidth,
        armTop,
        armWidth,
        armHeight
      );
    }

    if (
      x >=
        screenX +
          bodyWidth / 2 &&
      x <=
        screenX +
          bodyWidth / 2 +
          armWidth
    ) {
      ctx.fillRect(
        screenX +
          bodyWidth / 2,
        armTop,
        armWidth,
        armHeight
      );
    }

    /*
     * Legs
     */

    const legTop =
      bodyBottom;

    const legBottom =
      top +
      enemyHeight * 1.02;

    const legWidth =
      enemyWidth * 0.24;

    ctx.fillStyle =
      enemy.hitFlash > 0
        ? "#ffffff"
        : "#565656";

    if (
      Math.abs(
        x -
          (
            screenX -
            enemyWidth *
              0.16
          )
      ) <
      legWidth / 2
    ) {
      ctx.fillRect(
        screenX -
          enemyWidth *
            0.16 -
          legWidth / 2,
        legTop,
        legWidth,
        legBottom -
          legTop
      );
    }

    if (
      Math.abs(
        x -
          (
            screenX +
            enemyWidth *
              0.16
          )
      ) <
      legWidth / 2
    ) {
      ctx.fillRect(
        screenX +
          enemyWidth *
            0.16 -
          legWidth / 2,
        legTop,
        legWidth,
        legBottom -
          legTop
      );
    }
  }

  /*
   * Enemy eyes
   */

  if (
    correctedDistance <
    8
  ) {
    const eyeY =
      top +
      enemyHeight * 0.22;

    const eyeOffset =
      enemyWidth * 0.1;

    ctx.fillStyle =
      "#ff7042";

    ctx.fillRect(
      screenX -
        eyeOffset -
        2,
      eyeY - 1,
      3,
      2
    );

    ctx.fillRect(
      screenX +
        eyeOffset -
        1,
      eyeY - 1,
      3,
      2
    );
  }

  /*
   * Enemy state indicator
   */

  if (
    enemy.state === "alert"
  ) {
    ctx.strokeStyle =
      "rgba(255,112,66,0.8)";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.arc(
      screenX,
      top - 4,
      4,
      0,
      Math.PI * 2
    );

    ctx.stroke();
  }

  if (
    enemy.state === "attack"
  ) {
    ctx.strokeStyle =
      "rgba(255,112,66,0.9)";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.arc(
      screenX,
      top - 5,
      6,
      0,
      Math.PI * 2
    );

    ctx.stroke();
  }

  /*
   * Enemy health bar
   */

  const barWidth =
    enemyWidth * 1.1;

  const barHeight = 4;

  const barX =
    screenX -
    barWidth / 2;

  const barY =
    top - 10;

  ctx.fillStyle =
    "rgba(0,0,0,0.7)";

  ctx.fillRect(
    barX,
    barY,
    barWidth,
    barHeight
  );

  ctx.fillStyle =
    "#ff7042";

  ctx.fillRect(
    barX,
    barY,
    barWidth *
      (
        enemy.health /
        enemy.maxHealth
      ),
    barHeight
  );
}

/*
 * =========================================================
 * CROSSHAIR
 * =========================================================
 */

function drawCrosshair(
  ctx,
  width,
  height,
  hitMarker
) {
  const centerX =
    width / 2;

  const centerY =
    height / 2;

  ctx.save();

  ctx.strokeStyle =
    hitMarker
      ? "#ffffff"
      : "rgba(255,255,255,0.82)";

  ctx.lineWidth =
    hitMarker ? 2 : 1;

  ctx.beginPath();

  ctx.moveTo(
    centerX - 10,
    centerY
  );

  ctx.lineTo(
    centerX - 3,
    centerY
  );

  ctx.moveTo(
    centerX + 3,
    centerY
  );

  ctx.lineTo(
    centerX + 10,
    centerY
  );

  ctx.moveTo(
    centerX,
    centerY - 10
  );

  ctx.lineTo(
    centerX,
    centerY - 3
  );

  ctx.moveTo(
    centerX,
    centerY + 3
  );

  ctx.lineTo(
    centerX,
    centerY + 10
  );

  ctx.stroke();

  if (hitMarker) {
    ctx.strokeStyle =
      "#ffffff";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(
      centerX - 14,
      centerY - 14
    );

    ctx.lineTo(
      centerX - 5,
      centerY - 5
    );

    ctx.moveTo(
      centerX + 14,
      centerY - 14
    );

    ctx.lineTo(
      centerX + 5,
      centerY - 5
    );

    ctx.moveTo(
      centerX - 14,
      centerY + 14
    );

    ctx.lineTo(
      centerX - 5,
      centerY + 5
    );

    ctx.moveTo(
      centerX + 14,
      centerY + 14
    );

    ctx.lineTo(
      centerX + 5,
      centerY + 5
    );

    ctx.stroke();

    ctx.fillStyle =
      "rgba(255,255,255,0.12)";

    ctx.beginPath();

    ctx.arc(
      centerX,
      centerY,
      22,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  ctx.restore();
}

/*
 * =========================================================
 * WEAPON
 * =========================================================
 */

function drawWeapon(
  ctx,
  width,
  height,
  muzzleFlash,
  recoil
) {
  const recoilOffset =
    recoil * 24;

  const centerX =
    width / 2;

  const baseY =
    height +
    recoilOffset;

  ctx.save();

  ctx.fillStyle =
    "rgba(0,0,0,0.58)";

  ctx.fillRect(
    centerX - 82,
    baseY - 136,
    164,
    152
  );

  const bodyGradient =
    ctx.createLinearGradient(
      centerX - 60,
      0,
      centerX + 60,
      0
    );

  bodyGradient.addColorStop(
    0,
    "#171717"
  );

  bodyGradient.addColorStop(
    0.5,
    "#353535"
  );

  bodyGradient.addColorStop(
    1,
    "#151515"
  );

  ctx.fillStyle =
    bodyGradient;

  ctx.beginPath();

  ctx.moveTo(
    centerX - 58,
    baseY - 105
  );

  ctx.lineTo(
    centerX + 58,
    baseY - 105
  );

  ctx.lineTo(
    centerX + 45,
    baseY - 20
  );

  ctx.lineTo(
    centerX + 22,
    baseY - 5
  );

  ctx.lineTo(
    centerX - 22,
    baseY - 5
  );

  ctx.lineTo(
    centerX - 45,
    baseY - 20
  );

  ctx.closePath();

  ctx.fill();

  ctx.fillStyle =
    "#494949";

  ctx.fillRect(
    centerX - 35,
    baseY - 125,
    70,
    30
  );

  ctx.fillStyle =
    "rgba(255,255,255,0.08)";

  ctx.fillRect(
    centerX - 30,
    baseY - 121,
    60,
    4
  );

  ctx.fillStyle =
    "#111111";

  ctx.fillRect(
    centerX - 13,
    baseY - 150,
    26,
    45
  );

  ctx.fillStyle =
    "#3e3e3e";

  ctx.fillRect(
    centerX - 9,
    baseY - 147,
    18,
    5
  );

  ctx.fillStyle =
    "#1b1b1b";

  ctx.beginPath();

  ctx.moveTo(
    centerX - 18,
    baseY - 25
  );

  ctx.lineTo(
    centerX + 18,
    baseY - 25
  );

  ctx.lineTo(
    centerX + 13,
    baseY + 18
  );

  ctx.lineTo(
    centerX - 13,
    baseY + 18
  );

  ctx.closePath();

  ctx.fill();

  ctx.fillStyle =
    "#ff7042";

  ctx.fillRect(
    centerX - 4,
    baseY - 118,
    8,
    18
  );

  ctx.fillStyle =
    "rgba(255,112,66,0.15)";

  ctx.fillRect(
    centerX - 9,
    baseY - 123,
    18,
    28
  );

  if (muzzleFlash) {
    const flashX =
      centerX;

    const flashY =
      baseY - 164;

    ctx.save();

    const glow =
      ctx.createRadialGradient(
        flashX,
        flashY,
        0,
        flashX,
        flashY,
        70
      );

    glow.addColorStop(
      0,
      "rgba(255,255,255,0.75)"
    );

    glow.addColorStop(
      0.25,
      "rgba(255,170,80,0.4)"
    );

    glow.addColorStop(
      1,
      "rgba(255,112,66,0)"
    );

    ctx.fillStyle =
      glow;

    ctx.fillRect(
      flashX - 80,
      flashY - 80,
      160,
      160
    );

    ctx.globalAlpha = 0.95;

    ctx.fillStyle =
      "#ffffff";

    ctx.beginPath();

    ctx.moveTo(
      flashX,
      flashY - 48
    );

    ctx.lineTo(
      flashX + 14,
      flashY - 13
    );

    ctx.lineTo(
      flashX + 42,
      flashY
    );

    ctx.lineTo(
      flashX + 13,
      flashY + 11
    );

    ctx.lineTo(
      flashX,
      flashY + 36
    );

    ctx.lineTo(
      flashX - 13,
      flashY + 11
    );

    ctx.lineTo(
      flashX - 42,
      flashY
    );

    ctx.lineTo(
      flashX - 14,
      flashY - 13
    );

    ctx.closePath();

    ctx.fill();

    ctx.globalAlpha = 0.5;

    ctx.fillStyle =
      "#ff7042";

    ctx.beginPath();

    ctx.arc(
      flashX,
      flashY,
      28,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();
  }

  ctx.restore();
}

/*
 * =========================================================
 * DAMAGE FLASH
 * =========================================================
 */

function drawDamageFlash(
  ctx,
  width,
  height
) {
  const gradient =
    ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(
        width,
        height
      ) * 0.2,
      width / 2,
      height / 2,
      Math.max(
        width,
        height
      ) * 0.75
    );

  gradient.addColorStop(
    0,
    "rgba(255,0,0,0)"
  );

  gradient.addColorStop(
    0.55,
    "rgba(180,0,0,0.05)"
  );

  gradient.addColorStop(
    0.82,
    "rgba(180,0,0,0.18)"
  );

  gradient.addColorStop(
    1,
    "rgba(180,0,0,0.55)"
  );

  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );

  ctx.fillStyle =
    "rgba(255,30,30,0.07)";

  ctx.fillRect(
    0,
    0,
    width,
    height
  );

  ctx.strokeStyle =
    "rgba(255,50,50,0.5)";

  ctx.lineWidth = 2;

  const inset = 16;

  ctx.beginPath();

  ctx.moveTo(
    inset,
    inset + 28
  );

  ctx.lineTo(
    inset,
    inset
  );

  ctx.lineTo(
    inset + 28,
    inset
  );

  ctx.moveTo(
    width - inset - 28,
    inset
  );

  ctx.lineTo(
    width - inset,
    inset
  );

  ctx.lineTo(
    width - inset,
    inset + 28
  );

  ctx.stroke();
}

/*
 * =========================================================
 * RENDER
 * =========================================================
 */

export function renderScene(
  ctx,
  width,
  height,
  player,
  enemies = [],
  muzzleFlash = false,
  hitMarker = false,
  damageFlash = false,
  recoil = 0
) {
  /*
   * Sky
   */

  ctx.fillStyle =
    "#151515";

  ctx.fillRect(
    0,
    0,
    width,
    height / 2
  );

  /*
   * Floor
   */

  ctx.fillStyle =
    "#090909";

  ctx.fillRect(
    0,
    height / 2,
    width,
    height / 2
  );

  const depthBuffer =
    new Array(
      Math.ceil(width)
    );

  /*
   * =======================================================
   * WALLS
   * =======================================================
   */

  for (
    let x = 0;
    x < width;
    x++
  ) {
    const cameraX =
      x / width - 0.5;

    const rayAngle =
      player.angle +
      cameraX * FOV;

    const rawDistance =
      castRay(
        player,
        rayAngle
      );

    const correctedDistance =
      rawDistance *
      Math.cos(
        rayAngle -
          player.angle
      );

    depthBuffer[
      Math.floor(x)
    ] =
      correctedDistance;

    const wallHeight =
      Math.min(
        height * 1.5,
        height /
          Math.max(
            0.05,
            correctedDistance
          )
      );

    const wallTop =
      height / 2 -
      wallHeight / 2;

    const brightness =
      Math.max(
        20,
        145 -
          correctedDistance *
            7
      );

    ctx.fillStyle =
      `rgb(${brightness}, ${brightness}, ${brightness})`;

    ctx.fillRect(
      x,
      wallTop,
      1,
      wallHeight
    );

    if (
      correctedDistance <
      2.2
    ) {
      ctx.fillStyle =
        "rgba(255,112,66,0.045)";

      ctx.fillRect(
        x,
        wallTop,
        1,
        wallHeight
      );
    }
  }

  /*
   * =======================================================
   * ENEMIES
   * =======================================================
   */

  const visibleEnemies =
    enemies
      .filter(
        (enemy) =>
          enemy.alive ||
          enemy.dying
      )
      .sort(
        (a, b) => {
          const distanceA =
            Math.hypot(
              a.x - player.x,
              a.y - player.y
            );

          const distanceB =
            Math.hypot(
              b.x - player.x,
              b.y - player.y
            );

          return (
            distanceB -
            distanceA
          );
        }
      );

  for (
    const enemy of visibleEnemies
  ) {
    if (
      enemy.dying
    ) {
      drawEnemyDeath(
        ctx,
        width,
        height,
        player,
        enemy,
        depthBuffer
      );

      continue;
    }

    drawEnemy(
      ctx,
      width,
      height,
      player,
      enemy,
      depthBuffer
    );
  }

  /*
   * =======================================================
   * WEAPON
   * =======================================================
   */

  drawWeapon(
    ctx,
    width,
    height,
    muzzleFlash,
    recoil
  );

  /*
   * =======================================================
   * CROSSHAIR
   * =======================================================
   */

  drawCrosshair(
    ctx,
    width,
    height,
    hitMarker
  );

  /*
   * =======================================================
   * DAMAGE
   * =======================================================
   */

  if (damageFlash) {
    drawDamageFlash(
      ctx,
      width,
      height
    );
  }

  /*
   * =======================================================
   * SCANLINES
   * =======================================================
   */

  ctx.fillStyle =
    "rgba(255,255,255,0.018)";

  for (
    let y = 0;
    y < height;
    y += 4
  ) {
    ctx.fillRect(
      0,
      y,
      width,
      1
    );
  }

  /*
   * =======================================================
   * VIGNETTE
   * =======================================================
   */

  const vignette =
    ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(
        width,
        height
      ) * 0.3,
      width / 2,
      height / 2,
      Math.max(
        width,
        height
      ) * 0.8
    );

  vignette.addColorStop(
    0,
    "rgba(0,0,0,0)"
  );

  vignette.addColorStop(
    1,
    "rgba(0,0,0,0.42)"
  );

  ctx.fillStyle =
    vignette;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );
}