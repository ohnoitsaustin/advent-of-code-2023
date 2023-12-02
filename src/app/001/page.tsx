"use client";

import { useMemo, useState } from "react"


export default function One() {
    const [input, setInput] = useState<string>("");

    const answer1 = useMemo(() => {
        const lines = input.split("\n") ?? [];
        const calibrationNumbers: number[] = lines.map((line) => {
            const firstNumberInString = line.match(/\d/g)?.[0] ?? "0";
            const lastNumberInString = line.match(/\d(?!\d)/g)?.at(-1) ?? "0";
            return parseInt(firstNumberInString + lastNumberInString) ?? 0;
        });
        const sum = calibrationNumbers.reduce((a, b) => a + b, 0);
        return sum;
    }, [input]);

    const numberTokens: { [key: string]: number } = {
        "zero": 0,
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven" : 7,
        "eight": 8,
        "nine": 9,
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
    }

    const answer2 = useMemo(() => {
        const lines = input.split("\n") ?? [];
        const sum = lines.reduce((acc, line) => {
            const occurrences = Object.keys(numberTokens).flatMap((key) => {
                let indices: {key: string, index: number}[] = [];
                let startIndex = 0;
                let index;
                while ((index = line.indexOf(key, startIndex)) > -1) {
                    indices.push({ key, index });
                    startIndex = index + 1;
                }
                return indices;
            }); 
            
            const firstNumber = occurrences.reduce((a, b) => a.index < b.index ? a : b, { key: "error", index: 9999 });
            const lastNumber = occurrences.reduce((a, b) => a.index > b.index ? a : b, { key: "error", index: 0 });
            const calibrationNumber = parseInt(`${numberTokens[firstNumber.key]}${numberTokens[lastNumber.key]}`);

            return acc + calibrationNumber;
        }, 0);

        return sum;
    }, [input]);

    return (
        <div className="h-full ">
            <div className="w-4/5 mx-auto">  
                <h1 className="mt-8 ">Day one</h1>

                <div className="flex flex-row mt-8">
                    <textarea 
                        className="w-1/2 h-96 mr-8 p-2" placeholder="Puzzle input"
                        value={input} onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                    <div className="w-1/2">
                        <p>The sum of calibration numbers is {answer1}</p>
                        <p>The sum of calibration numbers, including spelled out numbers, is {answer2}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}