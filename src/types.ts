import { Readable, Writable } from "stream";

export interface Input {
    input: Readable;
    output: Writable;
    prompt: string;
}

