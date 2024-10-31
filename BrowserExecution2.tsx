import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

export default function BrowserExecution() {
    const [code, setCode] = useState('// Write your JavaScript here');
    const [output, setOutput] = useState('');

    const runCode = () => {
        const originalLog = console.log; // Save original console.log
        const logs: string[] = []; // Create an array to store logs

        // Override console.log to store messages in the logs array
        console.log = (message: any) => {
            logs.push(message); // Push message to logs array
            originalLog(message); // Also log to the original console
        };

        try {
            eval(code); // Evaluate the code
        } catch (error) {
            setOutput(`Error: ${error.message}`); // Capture any errors
        } finally {
            console.log = originalLog; // Restore the original console.log
            setOutput(logs.join('\n')); // Set the output to the logs
        }
    };

    return (
        <div>
          <textarea value={code}  />
            <button onClick={runCode}>Run</button>
            <textarea value={output} readOnly />
        </div>
    );
}

