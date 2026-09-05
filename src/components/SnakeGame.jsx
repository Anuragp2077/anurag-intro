import { useCallback, useEffect, useRef, useState } from "react";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  W: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  S: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  A: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
  D: { x: 1, y: 0 },
};

function createFood(snake) {
  const available = [];

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const occupied = snake.some(
        (segment) =>
          segment.x === x && segment.y === y
      );

      if (!occupied) {
        available.push({ x, y });
      }
    }
  }

  if (available.length === 0) {
    return null;
  }

  return available[
    Math.floor(Math.random() * available.length)
  ];
}

function getStoredHighScore() {
  const saved = localStorage.getItem("snake-high-score");
  return saved ? Number(saved) : 0;
}

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(() =>
    createFood(INITIAL_SNAKE)
  );
  const [direction, setDirection] = useState({
    x: 1,
    y: 0,
  });
  const [nextDirection, setNextDirection] = useState({
    x: 1,
    y: 0,
  });

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    getStoredHighScore
  );

  const [gameState, setGameState] = useState("ready");

  const directionRef = useRef({
    x: 1,
    y: 0,
  });

  const nextDirectionRef = useRef({
    x: 1,
    y: 0,
  });

  const gameStateRef = useRef("ready");

  const startGame = useCallback(() => {
    const initialSnake = [...INITIAL_SNAKE];

    setSnake(initialSnake);
    setFood(createFood(initialSnake));

    const initialDirection = {
      x: 1,
      y: 0,
    };

    setDirection(initialDirection);
    setNextDirection(initialDirection);

    directionRef.current = initialDirection;
    nextDirectionRef.current = initialDirection;

    setScore(0);

    gameStateRef.current = "playing";
    setGameState("playing");
  }, []);

  const endGame = useCallback(() => {
    gameStateRef.current = "gameover";
    setGameState("gameover");

    setHighScore((currentHighScore) => {
      if (score > currentHighScore) {
        localStorage.setItem(
          "snake-high-score",
          String(score)
        );

        return score;
      }

      return currentHighScore;
    });
  }, [score]);

  const changeDirection = useCallback(
    (newDirection) => {
      const current = directionRef.current;

      const isOpposite =
        current.x + newDirection.x === 0 &&
        current.y + newDirection.y === 0;

      if (isOpposite) {
        return;
      }

      nextDirectionRef.current = newDirection;
      setNextDirection(newDirection);
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      const newDirection =
        DIRECTIONS[event.key];

      if (!newDirection) {
        if (
          (event.key === " " ||
            event.key === "Enter") &&
          gameStateRef.current !== "playing"
        ) {
          startGame();
        }

        return;
      }

      event.preventDefault();

      if (gameStateRef.current === "ready") {
        startGame();
        return;
      }

      if (gameStateRef.current === "gameover") {
        startGame();
        return;
      }

      changeDirection(newDirection);
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [changeDirection, startGame]);

  useEffect(() => {
    if (gameState !== "playing") {
      return undefined;
    }

    const speed = Math.max(
      75,
      150 - score * 4
    );

    const interval = setInterval(() => {
      setSnake((currentSnake) => {
        const currentDirection =
          nextDirectionRef.current;

        directionRef.current =
          currentDirection;

        setDirection(currentDirection);

        const head = currentSnake[0];

        const newHead = {
          x: head.x + currentDirection.x,
          y: head.y + currentDirection.y,
        };

        // Wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y < 0 ||
          newHead.y >= BOARD_SIZE
        ) {
          endGame();
          return currentSnake;
        }

        const eatingFood =
          food &&
          newHead.x === food.x &&
          newHead.y === food.y;

        const bodyToCheck = eatingFood
          ? currentSnake
          : currentSnake.slice(0, -1);

        const hitBody = bodyToCheck.some(
          (segment) =>
            segment.x === newHead.x &&
            segment.y === newHead.y
        );

        if (hitBody) {
          endGame();
          return currentSnake;
        }

        const newSnake = [
          newHead,
          ...currentSnake,
        ];

        if (eatingFood) {
          const nextFood =
            createFood(newSnake);

          setFood(nextFood);

          setScore((currentScore) => {
            const newScore =
              currentScore + 1;

            setHighScore(
              (currentHighScore) => {
                if (
                  newScore >
                  currentHighScore
                ) {
                  localStorage.setItem(
                    "snake-high-score",
                    String(newScore)
                  );

                  return newScore;
                }

                return currentHighScore;
              }
            );

            return newScore;
          });

          return newSnake;
        }

        newSnake.pop();

        return newSnake;
      });
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [endGame, food, gameState, score]);

  const getCellClass = (x, y) => {
    const snakeIndex = snake.findIndex(
      (segment) =>
        segment.x === x && segment.y === y
    );

    if (snakeIndex === 0) {
      return `
        bg-orange-500
        shadow-[0_0_12px_rgba(249,115,22,0.65)]
      `;
    }

    if (snakeIndex > 0) {
      return `
        bg-orange-400/70
        dark:bg-orange-400/70
      `;
    }

    if (
      food &&
      food.x === x &&
      food.y === y
    ) {
      return `
        rounded-full
        bg-black
        dark:bg-white
        shadow-[0_0_14px_rgba(255,255,255,0.35)]
      `;
    }

    return "";
  };

  return (
    <div className="w-full">
      {/* Game header */}
      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-black/10
          p-5
          dark:border-white/10
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-7
          sm:py-5
        "
      >
        <div>
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-black/35
              dark:text-white/30
            "
          >
            Snake
          </p>

          <h3
            className="
              mt-1
              text-xl
              font-medium
              tracking-[-0.04em]
            "
          >
            Eat. Grow. Don't crash.
          </h3>
        </div>

        <div className="flex gap-6">
          <div>
            <span
              className="
                block
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-black/30
                dark:text-white/25
              "
            >
              Score
            </span>

            <span className="mt-1 block text-lg font-medium">
              {score}
            </span>
          </div>

          <div>
            <span
              className="
                block
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-black/30
                dark:text-white/25
              "
            >
              Best
            </span>

            <span className="mt-1 block text-lg font-medium">
              {highScore}
            </span>
          </div>
        </div>
      </div>

      {/* Game area */}
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          gap-7
          p-5
          sm:p-8
          md:p-10
        "
      >
        {/* Board */}
        <div
          className="
            relative
            aspect-square
            w-full
            max-w-[500px]
            overflow-hidden
            border
            border-black/10
            bg-white
            p-1
            shadow-inner
            dark:border-white/10
            dark:bg-[#080808]
          "
        >
          <div
            className="
              grid
              h-full
              w-full
            "
            style={{
              gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({
              length: BOARD_SIZE * BOARD_SIZE,
            }).map((_, index) => {
              const x =
                index % BOARD_SIZE;

              const y =
                Math.floor(
                  index / BOARD_SIZE
                );

              const cellClass =
                getCellClass(x, y);

              return (
                <div
                  key={`${x}-${y}`}
                  className={`
                    border
                    border-black/[0.025]
                    dark:border-white/[0.025]
                    ${cellClass}
                  `}
                />
              );
            })}
          </div>

          {/* Ready overlay */}
          {gameState === "ready" && (
            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-white/70
                backdrop-blur-sm
                dark:bg-black/70
              "
            >
              <div className="text-center">
                <div className="text-4xl">
                  🐍
                </div>

                <p
                  className="
                    mt-4
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-black/40
                    dark:text-white/40
                  "
                >
                  Ready?
                </p>

                <button
                  type="button"
                  onClick={startGame}
                  className="
                    mt-4
                    rounded-full
                    bg-orange-500
                    px-6
                    py-3
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-white
                    transition-all
                    hover:bg-orange-600
                    active:scale-95
                  "
                >
                  Start Game
                </button>
              </div>
            </div>
          )}

          {/* Game over overlay */}
          {gameState === "gameover" && (
            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-white/75
                backdrop-blur-sm
                dark:bg-black/75
              "
            >
              <div className="text-center">
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-orange-500
                  "
                >
                  Game Over
                </p>

                <p
                  className="
                    mt-3
                    text-4xl
                    font-medium
                    tracking-[-0.06em]
                  "
                >
                  {score}
                </p>

                <p
                  className="
                    mt-2
                    text-xs
                    text-black/40
                    dark:text-white/35
                  "
                >
                  Final score
                </p>

                <button
                  type="button"
                  onClick={startGame}
                  className="
                    mt-5
                    rounded-full
                    border
                    border-orange-500
                    px-6
                    py-3
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-orange-500
                    transition-all
                    hover:bg-orange-500
                    hover:text-white
                    active:scale-95
                  "
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4">
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-black/30
              dark:text-white/25
            "
          >
            Arrow keys / WASD
          </p>

          <div className="grid grid-cols-3 gap-1">
            <div />

            <button
              type="button"
              onClick={() =>
                changeDirection({
                  x: 0,
                  y: -1,
                })
              }
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-lg
                border
                border-black/10
                bg-white
                text-sm
                transition-all
                active:scale-90
                dark:border-white/10
                dark:bg-[#111]
              "
              aria-label="Move up"
            >
              ↑
            </button>

            <div />

            <button
              type="button"
              onClick={() =>
                changeDirection({
                  x: -1,
                  y: 0,
                })
              }
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-lg
                border
                border-black/10
                bg-white
                text-sm
                transition-all
                active:scale-90
                dark:border-white/10
                dark:bg-[#111]
              "
              aria-label="Move left"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() =>
                changeDirection({
                  x: 0,
                  y: 1,
                })
              }
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-lg
                border
                border-black/10
                bg-white
                text-sm
                transition-all
                active:scale-90
                dark:border-white/10
                dark:bg-[#111]
              "
              aria-label="Move down"
            >
              ↓
            </button>

            <button
              type="button"
              onClick={() =>
                changeDirection({
                  x: 1,
                  y: 0,
                })
              }
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-lg
                border
                border-black/10
                bg-white
                text-sm
                transition-all
                active:scale-90
                dark:border-white/10
                dark:bg-[#111]
              "
              aria-label="Move right"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SnakeGame;