export const MAP = [
  "111111111111",
  "100000000001",
  "100011110001",
  "100010000001",
  "100010111101",
  "100000100001",
  "101110101101",
  "100000000001",
  "100111110001",
  "100000000001",
  "111111111111",
];

export const MAP_WIDTH = MAP[0].length;
export const MAP_HEIGHT = MAP.length;

export const PLAYER_START = {
  x: 2.5,
  y: 2.5,
  angle: 0,
};

export function isWall(x, y) {
  const mapX = Math.floor(x);
  const mapY = Math.floor(y);

  if (
    mapX < 0 ||
    mapX >= MAP_WIDTH ||
    mapY < 0 ||
    mapY >= MAP_HEIGHT
  ) {
    return true;
  }

  return MAP[mapY][mapX] === "1";
}