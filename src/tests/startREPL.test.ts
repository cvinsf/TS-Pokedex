// import { startREPL } from "../repl.js";
// import { Readable, Writable } from "stream";
// import { describe, test, expect } from "vitest";

// test("startREPL handles user input", () => {
//   const mockInput = new Readable({
//     read() {
//       this.push("exit\n"); // Simulate user typing "exit"
//       this.push(null); // End the stream
//     },
//   });

//   const mockOutput = new Writable({
//     write(chunk, encoding, callback) {
//       // Capture output for assertions if needed
//       callback();
//     },
//   });

//   const originalStdin = process.stdin;
//   const originalStdout = process.stdout;

//   // Replace stdin and stdout with mocks
//   process.stdin = mockInput as any;
//   process.stdout = mockOutput as any;

//   startREPL();

//   // Restore original stdin and stdout
//   process.stdin = originalStdin;
//   process.stdout = originalStdout;
// });