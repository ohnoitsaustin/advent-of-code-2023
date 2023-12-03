"use client";

import { useMemo, useState } from "react"

import testInput1 from './test-input-1.txt';
import puzzleInput from './puzzle-input.txt';

const parseLines = (lines: string[]) => {
  const games = lines.map((line) => {
    const lineParts = line.split(":");
    const index = parseInt(lineParts[0].replace("Game ", ""));
    const rounds = lineParts[1]?.trim().split(";").map((round) => {
      const draws = round.trim().split(",").map((draw) => {
        const drawParts = draw.trim().split(" ");
        return {
          color: drawParts[1],
          number: parseInt(drawParts[0])
        }
      });
      return draws;
    });

    return {
      index,
      rounds
    }
  });
  
  return games;
};

export default function One() {
  const [input, setInput] = useState<string>("");

  const answer1 = useMemo(() => {
    const maxRed = 12,
          maxGreen = 13,
          maxBlue = 14;

    const games = parseLines(input.split("\n"));
    const validGames = games.filter((game) => {
      return game.rounds?.every((round) => {
        const redDraw = round.find((draw) => draw.color === "red")?.number ?? 0;
        const blueDraw = round.find((draw) => draw.color === "blue")?.number ?? 0;
        const greenDraw = round.find((draw) => draw.color === "green")?.number ?? 0;

        return redDraw <= maxRed && blueDraw <= maxBlue && greenDraw <= maxGreen;
      });
    });

    console.log(validGames);

    return validGames.reduce((acc, game) => {
      return acc + game.index;
    }, 0);
  }, [input]);

  const answer2 = useMemo(() => {
    const games = parseLines(input.split("\n"));

    return games.reduce((acc, game) => {
      let maxRed = 0,
          maxGreen = 0,
          maxBlue = 0;
      game.rounds.forEach((round) => {
        const redDraw = round.find((draw) => draw.color === "red")?.number ?? 0;
        const blueDraw = round.find((draw) => draw.color === "blue")?.number ?? 0;
        const greenDraw = round.find((draw) => draw.color === "green")?.number ?? 0;

        maxRed = Math.max(maxRed, redDraw);
        maxBlue = Math.max(maxBlue, blueDraw);
        maxGreen = Math.max(maxGreen, greenDraw);
      });

      return acc + (maxRed * maxBlue * maxGreen);
    }, 0);
  }, [input]);


  const loadTestInput = () => {
    setInput(testInput1);
  }
  const loadPuzzleInput = () => {
    setInput(puzzleInput);
  }

  return (
    <div className="h-full ">
      <div className="w-4/5 mx-auto">
        <h1 className="mt-8 ">Day two</h1>

        <div className="flex flex-row mt-8">
          <textarea
            className="w-1/2 h-96 mr-8 p-2" placeholder="Puzzle input"
            value={input} onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <div className="w-1/2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={loadTestInput}>Load test input</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={loadPuzzleInput}>Load puzzle input</button>

            <div className="mt-8">
              <h2>Part one</h2>
              <p className="mt-4">Answer: {answer1}</p>
              <h2>Part two</h2>
              <p className="mt-4">Answer: {answer2}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}