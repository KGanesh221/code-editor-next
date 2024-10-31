import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

export default function BrowserExecution() {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [lineNumbers, setLineNumbers] = useState(['1']);
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
    const handleCodeChange = (e:any) => {
        const newCode = e.target.value;
        setCode(newCode);     
        // Update line numbers based on line breaks in the code
        const lines = newCode.split('\n').length;
        setLineNumbers(Array.from({ length: lines }, (_, i) => (i + 1).toString()));
    };

    return (
        <div style={{width:"100%" , height:"500px", display:'flex'}}>
             <div style={{ display: 'flex', width: '50%', position: 'relative' }}>
                {/* Line numbers */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        padding: '5px',
                        background: '#f0f0f0',
                        textAlign: 'right',
                        width: '21px',
                        color: '#555',
                        height: '100%'
                    }}
                >
                    {lineNumbers.map((line) => (
                        <div key={line}>{line}</div>
                    ))}
                </div>
          <textarea 
           value={code}
           onChange={handleCodeChange}
           style={{
               width: '100%',
               paddingLeft: '40px', // Leave space for line numbers
               height: '100%',
               fontFamily: 'monospace',
               resize: 'none', // Prevent resizing if not needed
               whiteSpace: 'pre-wrap', // Ensure that white spaces and line breaks are preserved
               overflowWrap: 'break-word', // Word wrap for long lines
           }}
           placeholder="Enter your code here"
           />
          </div>
            <button style={{width:"50px" , height:"50px"}} onClick={runCode}>Run</button>
            <textarea value={output} readOnly style={{width:"50%" , height:"500px"}} />
        </div>
    );
}

