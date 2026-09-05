import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { PLAYER_START } from "./map";

import {
  createPlayer,
  movePlayer,
  rotatePlayer,
} from "./player";

import {
  createEnemies,
  updateEnemies,
  damageEnemy,
} from "./enemies";

import { shootEnemy } from "./combat";

import { renderScene } from "./renderer";

import {
  playGunshot,
  playEnemyHit,
  playEnemyDeath,
  playPlayerDamage,
  playVictory,
  playGameOver,
  playEmptyWeapon,
  setSoundVolume,
} from "./sound";

function DoomGame() {
  const canvasRef = useRef(null);

  const playerRef = useRef(
    createPlayer(PLAYER_START)
  );

  const enemiesRef = useRef(
    createEnemies(playerRef.current)
  );

  const keysRef = useRef({});

  const gameOverRef = useRef(false);
  const victoryRef = useRef(false);

  const muzzleFlashUntilRef = useRef(0);
  const hitMarkerUntilRef = useRef(0);
  const damageFlashUntilRef = useRef(0);
  const recoilUntilRef = useRef(0);

  const previousHealthRef = useRef(100);

  const victorySoundPlayedRef = useRef(false);
  const gameOverSoundPlayedRef = useRef(false);

  const [gameOver, setGameOver] =
    useState(false);

  const [victory, setVictory] =
    useState(false);

  const [score, setScore] =
    useState(0);

  const [health, setHealth] =
    useState(100);

  const [ammo, setAmmo] =
    useState(24);

  const [volume, setVolume] =
    useState(0.35);

  const shoot = useCallback(() => {
    const player =
      playerRef.current;

    if (
      gameOverRef.current ||
      victoryRef.current
    ) {
      return;
    }

    if (player.ammo <= 0) {
      playEmptyWeapon();
      return;
    }

    player.ammo -= 1;

    setAmmo(player.ammo);

    const now =
      performance.now();

    muzzleFlashUntilRef.current =
      now + 90;

    recoilUntilRef.current =
      now + 110;

    playGunshot();

    const result =
      shootEnemy(
        player,
        enemiesRef.current
      );

    if (!result) {
      return;
    }

    hitMarkerUntilRef.current =
      now + 140;

    const killed =
      damageEnemy(
        result.enemy,
        1
      );

    if (!killed) {
      playEnemyHit();
      return;
    }

    playEnemyDeath();

    player.score += 100;

    setScore(player.score);

    const remainingEnemies =
      enemiesRef.current.filter(
        (enemy) => enemy.alive
      );

    if (
      remainingEnemies.length === 0
    ) {
      victoryRef.current = true;

      setVictory(true);

      if (
        !victorySoundPlayedRef.current
      ) {
        victorySoundPlayedRef.current =
          true;

        playVictory();
      }
    }
  }, []);

  useEffect(() => {
    gameOverRef.current =
      gameOver;
  }, [gameOver]);

  useEffect(() => {
    victoryRef.current =
      victory;
  }, [victory]);

  useEffect(() => {
    setSoundVolume(volume);
  }, [volume]);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    const keys =
      keysRef.current;

    const handleKeyDown =
      (event) => {
        const key =
          event.key.toLowerCase();

        keys[key] = true;

        if (
          [
            "w",
            "a",
            "s",
            "d",
            "arrowup",
            "arrowdown",
            "arrowleft",
            "arrowright",
            " ",
          ].includes(key)
        ) {
          event.preventDefault();
        }

        if (
          key === " " ||
          key === "f"
        ) {
          shoot();
        }
      };

    const handleKeyUp =
      (event) => {
        keys[
          event.key.toLowerCase()
        ] = false;
      };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "keyup",
      handleKeyUp
    );

    let animationFrame;

    let previousTime =
      performance.now();

    const resizeCanvas =
      () => {
        const rect =
          canvas.getBoundingClientRect();

        const dpr =
          window.devicePixelRatio ||
          1;

        canvas.width =
          rect.width * dpr;

        canvas.height =
          rect.height * dpr;

        ctx.setTransform(
          dpr,
          0,
          0,
          dpr,
          0,
          0
        );
      };

    resizeCanvas();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    const loop =
      (currentTime) => {
        const deltaTime =
          Math.min(
            (
              currentTime -
              previousTime
            ) / 1000,
            0.05
          );

        previousTime =
          currentTime;

        const player =
          playerRef.current;

        if (
          !gameOverRef.current &&
          !victoryRef.current
        ) {
          if (keys.w) {
            movePlayer(
              player,
              1,
              deltaTime
            );
          }

          if (keys.s) {
            movePlayer(
              player,
              -1,
              deltaTime
            );
          }

          if (keys.a) {
            rotatePlayer(
              player,
              -1,
              deltaTime
            );
          }

          if (keys.d) {
            rotatePlayer(
              player,
              1,
              deltaTime
            );
          }

          if (keys.arrowleft) {
            rotatePlayer(
              player,
              -1,
              deltaTime
            );
          }

          if (keys.arrowright) {
            rotatePlayer(
              player,
              1,
              deltaTime
            );
          }

          const previousHealth =
            previousHealthRef.current;

          updateEnemies(
            enemiesRef.current,
            player,
            deltaTime
          );

          if (
            player.health <
            previousHealth
          ) {
            damageFlashUntilRef.current =
              performance.now() + 220;

            playPlayerDamage();
          }

          previousHealthRef.current =
            player.health;

          if (
            player.health <= 0
          ) {
            player.health = 0;

            setHealth(0);

            gameOverRef.current =
              true;

            setGameOver(true);

            if (
              !gameOverSoundPlayedRef.current
            ) {
              gameOverSoundPlayedRef.current =
                true;

              playGameOver();
            }
          }

          setHealth(
            Math.max(
              0,
              Math.round(
                player.health
              )
            )
          );
        }

        const muzzleFlash =
          currentTime <
          muzzleFlashUntilRef.current;

        const hitMarker =
          currentTime <
          hitMarkerUntilRef.current;

        const damageFlash =
          currentTime <
          damageFlashUntilRef.current;

        const recoil =
          Math.max(
            0,
            recoilUntilRef.current -
              currentTime
          ) / 110;

        const rect =
          canvas.getBoundingClientRect();

        renderScene(
          ctx,
          rect.width,
          rect.height,
          player,
          enemiesRef.current,
          muzzleFlash,
          hitMarker,
          damageFlash,
          recoil
        );

        animationFrame =
          requestAnimationFrame(
            loop
          );
      };

    animationFrame =
      requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "keyup",
        handleKeyUp
      );

      window.removeEventListener(
        "resize",
        resizeCanvas
      );
    };
  }, [shoot]);

  const restart = () => {
    const newPlayer =
      createPlayer(
        PLAYER_START
      );

    playerRef.current =
      newPlayer;

    enemiesRef.current =
      createEnemies(
        newPlayer
      );

    keysRef.current = {};

    gameOverRef.current =
      false;

    victoryRef.current =
      false;

    muzzleFlashUntilRef.current =
      0;

    hitMarkerUntilRef.current =
      0;

    damageFlashUntilRef.current =
      0;

    recoilUntilRef.current =
      0;

    previousHealthRef.current =
      100;

    victorySoundPlayedRef.current =
      false;

    gameOverSoundPlayedRef.current =
      false;

    setScore(0);
    setHealth(100);
    setAmmo(24);
    setGameOver(false);
    setVictory(false);
  };

  const handleVolumeChange =
    (event) => {
      const nextVolume =
        Number(event.target.value);

      setVolume(nextVolume);
      setSoundVolume(nextVolume);
    };

  const remaining =
    enemiesRef.current.filter(
      (enemy) => enemy.alive
    ).length;

  const healthPercent =
    Math.max(
      0,
      Math.min(100, health)
    );

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}

      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-orange-500">
            FPS Experiment
          </p>

          <p className="mt-1 text-[10px] text-black/40 dark:text-white/35">
            A tiny raycasting experiment
          </p>
        </div>

        <div className="text-right text-[8px] uppercase tracking-[0.15em] text-black/30 dark:text-white/25">
          WASD / Arrows · SPACE / F
        </div>
      </div>

      {/* Game */}

      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-black shadow-[0_25px_80px_rgba(0,0,0,0.18)] dark:border-white/10">
        <canvas
          ref={canvasRef}
          className="block aspect-video w-full"
        />

        {/* HUD */}

        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="h-px bg-white/10" />

          <div className="flex items-end justify-between bg-black/80 px-4 py-3 font-mono backdrop-blur-md sm:px-6 sm:py-4">
            {/* Health */}

            <div className="min-w-[90px] sm:min-w-[130px]">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-[7px] uppercase tracking-[0.2em] text-white/40">
                  Health
                </p>

                <p className="text-[7px] text-white/30">
                  {healthPercent}%
                </p>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-orange-500 transition-[width] duration-200"
                  style={{
                    width: `${healthPercent}%`,
                  }}
                />
              </div>

              <p
                className={`mt-1 text-xl font-bold leading-none sm:text-2xl ${
                  health <= 25
                    ? "text-red-400"
                    : "text-orange-400"
                }`}
              >
                {health}
              </p>
            </div>

            {/* Score */}

            <div className="text-center">
              <p className="text-[7px] uppercase tracking-[0.25em] text-white/35">
                Score
              </p>

              <p className="mt-1 text-xl font-bold leading-none tracking-wider text-white sm:text-2xl">
                {String(score).padStart(4, "0")}
              </p>
            </div>

            {/* Ammo */}

            <div className="min-w-[90px] text-right sm:min-w-[130px]">
              <p className="text-[7px] uppercase tracking-[0.2em] text-white/40">
                Ammo
              </p>

              <p
                className={`mt-1 text-xl font-bold leading-none sm:text-2xl ${
                  ammo <= 5
                    ? "text-red-400"
                    : "text-orange-400"
                }`}
              >
                {String(ammo).padStart(2, "0")}
              </p>

              <p className="mt-1 text-[7px] uppercase tracking-[0.18em] text-white/25">
                Magazine
              </p>
            </div>
          </div>
        </div>

        {/* Hostile Counter */}

        <div className="pointer-events-none absolute left-4 top-4">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 font-mono backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />

            <span className="text-[8px] uppercase tracking-[0.16em] text-white/45">
              Hostiles
            </span>

            <span className="text-[9px] font-bold text-white">
              {String(remaining).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Status */}

        <div className="pointer-events-none absolute right-4 top-4">
          <div className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 font-mono text-[7px] uppercase tracking-[0.16em] text-white/30 backdrop-blur-md">
            {victory
              ? "Mission Complete"
              : gameOver
                ? "System Failure"
                : "Combat Active"}
          </div>
        </div>

        {/* Game Over */}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 px-4 text-center backdrop-blur-md">
            <p className="text-[9px] uppercase tracking-[0.3em] text-orange-500">
              System Failure
            </p>

            <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              GAME OVER
            </h3>

            <div className="mt-4 flex gap-8 font-mono">
              <div>
                <p className="text-[7px] uppercase tracking-widest text-white/30">
                  Score
                </p>

                <p className="mt-1 text-lg font-bold text-white">
                  {score}
                </p>
              </div>

              <div>
                <p className="text-[7px] uppercase tracking-widest text-white/30">
                  Hostiles
                </p>

                <p className="mt-1 text-lg font-bold text-orange-400">
                  {remaining}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={restart}
              className="pointer-events-auto mt-6 rounded-full border border-orange-500/40 px-5 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-orange-400 transition-all duration-200 hover:bg-orange-500 hover:text-white active:scale-95"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Victory */}

        {victory && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 px-4 text-center backdrop-blur-md">
            <p className="text-[9px] uppercase tracking-[0.3em] text-orange-500">
              All hostiles eliminated
            </p>

            <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              YOU WIN
            </h3>

            <div className="mt-4">
              <p className="text-[7px] uppercase tracking-widest text-white/30">
                Final Score
              </p>

              <p className="mt-1 font-mono text-2xl font-bold text-orange-400">
                {String(score).padStart(4, "0")}
              </p>
            </div>

            <button
              type="button"
              onClick={restart}
              className="pointer-events-auto mt-6 rounded-full border border-orange-500/40 px-5 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-orange-400 transition-all duration-200 hover:bg-orange-500 hover:text-white active:scale-95"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Controls */}

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-[8px] uppercase tracking-[0.15em] text-black/25 dark:text-white/20">
        <span>
          W / S — Move
        </span>

        <span>
          A / D — Turn
        </span>

        <span>
          Space / F — Shoot
        </span>

        <label className="flex items-center gap-2">
          <span>
            SFX
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={
              handleVolumeChange
            }
            className="h-1 w-16 cursor-pointer accent-orange-500"
            aria-label="DOOM sound effects volume"
          />
        </label>
      </div>
    </div>
  );
}

export default DoomGame;