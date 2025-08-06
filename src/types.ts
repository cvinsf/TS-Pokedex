import { Readable, Writable } from "stream";

export interface Input {
    input: Readable;
    output: Writable;
    prompt: string;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
}
