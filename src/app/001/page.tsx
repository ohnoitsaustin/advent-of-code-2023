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
                        <p>{answer1}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}