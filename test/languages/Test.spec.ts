import { newUnibeautify } from "unibeautify";
import beautifier from "../../src";
import { EOL } from "../../src";

jest.setTimeout(10000);

const texts = {
  lfWithNewline: `console.log("line 1");\nconsole.log("line 2");\n`,
  lfWithoutNewline: `console.log("line 1");\nconsole.log("line 2");`,
};

const cases: Case[] = [
  {
    text: "lfWithNewline",
    expected: texts.lfWithNewline,
    options: {},
  },
  {
    text: "lfWithNewline",
    expected: `console.log("line 1");\nconsole.log("line 2");\n`,
    options: {
      end_with_newline: undefined,
      end_of_line: "LF",
    },
  },
  {
    text: "lfWithNewline",
    expected: `console.log("line 1");\r\nconsole.log("line 2");\r\n`,
    options: {
      end_with_newline: undefined,
      end_of_line: "CRLF",
    },
  },
  {
    text: "lfWithNewline",
    expected: `console.log("line 1");\nconsole.log("line 2");\n`,
    options: {
      end_with_newline: true,
      end_of_line: undefined,
    },
  },
  {
    text: "lfWithNewline",
    expected: `console.log("line 1");\nconsole.log("line 2");`,
    options: {
      end_with_newline: false,
      end_of_line: undefined,
    },
  },
  {
    text: "lfWithNewline",
    expected: `console.log("line 1");\nconsole.log("line 2");\n`,
    options: {
      end_with_newline: true,
      end_of_line: "LF",
    },
  },
  {
    text: "lfWithNewline",
    expected: `console.log("line 1");\r\nconsole.log("line 2");\r\n`,
    options: {
      end_with_newline: true,
      end_of_line: "CRLF",
    },
  },
  {
    text: "lfWithNewline",
    expected: `console.log("line 1");\nconsole.log("line 2");`,
    options: {
      end_with_newline: false,
      end_of_line: "LF",
    },
  },
  {
    text: "lfWithNewline",
    expected: `console.log("line 1");\r\nconsole.log("line 2");`,
    options: {
      end_with_newline: false,
      end_of_line: "CRLF",
    },
  },
  {
    text: "lfWithoutNewline",
    expected: texts.lfWithoutNewline,
    options: {},
  },
  {
    text: "lfWithoutNewline",
    expected: `console.log("line 1");\nconsole.log("line 2");`,
    options: {
      end_with_newline: undefined,
      end_of_line: "LF",
    },
  },
  {
    text: "lfWithoutNewline",
    expected: `console.log("line 1");\r\nconsole.log("line 2");`,
    options: {
      end_with_newline: undefined,
      end_of_line: "CRLF",
    },
  },
  {
    text: "lfWithoutNewline",
    expected: `console.log("line 1");\nconsole.log("line 2");\n`,
    options: {
      end_with_newline: true,
      end_of_line: undefined,
    },
  },
  {
    text: "lfWithoutNewline",
    expected: `console.log("line 1");\nconsole.log("line 2");`,
    options: {
      end_with_newline: false,
      end_of_line: undefined,
    },
  },
  {
    text: "lfWithoutNewline",
    expected: `console.log("line 1");\nconsole.log("line 2");\n`,
    options: {
      end_with_newline: true,
      end_of_line: "LF",
    },
  },
  {
    text: "lfWithoutNewline",
    expected: `console.log("line 1");\r\nconsole.log("line 2");\r\n`,
    options: {
      end_with_newline: true,
      end_of_line: "CRLF",
    },
  },
  {
    text: "lfWithoutNewline",
    expected: `console.log("line 1");\nconsole.log("line 2");`,
    options: {
      end_with_newline: false,
      end_of_line: "LF",
    },
  },
  {
    text: "lfWithoutNewline",
    expected: `console.log("line 1");\r\nconsole.log("line 2");`,
    options: {
      end_with_newline: false,
      end_of_line: "CRLF",
    },
  },
];

interface Case {
  text: keyof typeof texts;
  expected: string;
  options: {
    end_with_newline?: boolean;
    end_of_line?: EOL;
  };
}

cases.forEach((curr: Case) => {
  it(`should successfully beautify ${curr.text} with options ${JSON.stringify(
    curr.options
  )}`, () => {
    const unibeautify = newUnibeautify();
    unibeautify.loadBeautifier(beautifier);
    return unibeautify
      .beautify({
        languageName: "JavaScript",
        options: {
          JavaScript: curr.options,
        },
        text: texts[curr.text],
      })
      .then(results => {
        expect(results).toBe(curr.expected);
      });
  });
});
