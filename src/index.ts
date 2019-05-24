import { Beautifier, BeautifierBeautifyData } from "unibeautify";
import * as readPkgUp from "read-pkg-up";

const pkg = readPkgUp.sync({ cwd: __dirname })!.package;

import { options } from "./options";

const allLineEndings: LineEnding[] = ["\r\n", "\r", "\n"];

export const beautifier: Beautifier = {
  name: "File",
  package: pkg,
  badges: [],
  options,
  dependencies: [],
  beautify({ text, options }: BeautifierBeautifyData) {
    return Promise.resolve().then(() => {
      if (
        options.end_of_line === undefined &&
        options.end_with_newline === undefined
      ) {
        return Promise.resolve(text);
      }
      const eolChar = detectEol(text, options.end_of_line);
      if (!eolChar) {
        return Promise.resolve(text);
      }
      const newText = normalizeLineEndings(text, eolChar);
      const endWithNewline: boolean | undefined = options.end_with_newline;
      const doesEndWithNewline: boolean = newText.endsWith(eolChar);
      if (doesEndWithNewline !== endWithNewline) {
        if (endWithNewline === true) {
          return `${newText}${eolChar}`;
        } else if (endWithNewline === false) {
          return removeEndOfFileNewline(newText, eolChar);
        }
      }
      return newText;
    });
  },
};

function detectEol(text: string, endOfLine: EOL): LineEnding | undefined {
  const eolChar = getEolChar(endOfLine) || detectLineEnding(text);
  if (!eolChar) {
    return undefined;
  }
  return eolChar;
}

export type EOL = "CRLF" | "LF" | "System Default" | undefined;
export type LineEnding = "\r\n" | "\r" | "\n";

function normalizeLineEndings(text: string, lineEnding: LineEnding): string {
  return changeLineEnding(resetAllLineEndings(text, "\n"), "\n", lineEnding);
}

function resetAllLineEndings(text: string, lineEnding: LineEnding): string {
  return allLineEndings.reduce(
    (curr, eol: LineEnding) => changeLineEnding(curr, eol, lineEnding),
    text
  );
}

function changeLineEnding(
  text: string,
  source: LineEnding,
  dest: LineEnding
): string {
  return text.replace(new RegExp(source, "g"), dest);
}

function detectLineEnding(text: string): LineEnding | undefined {
  const cr = text.split("\r").length - 1;
  const lf = text.split("\n").length - 1;
  const crlf = text.split("\r\n").length - 1;
  if (cr + lf === 0) {
    return;
  }
  if (crlf === cr && crlf === lf) {
    return "\r\n";
  }
  if (cr > lf) {
    return "\r";
  } else {
    return "\n";
  }
}

function getEolChar(eol: EOL): LineEnding | undefined {
  switch (eol) {
    case "LF":
      return "\n";
    case "CRLF":
      return "\r\n";
    default:
      return;
  }
}

function removeEndOfFileNewline(text: string, eolChar: LineEnding): string {
  return text.slice(0, -1 * eolChar.length);
}

export default beautifier;
