import * as fs from "fs";
import * as path from "path";

import { newUnibeautify, OptionValues } from "unibeautify";
import beautifier from "../../src";
import { raw } from "../utils";

jest.setTimeout(10000);
describe.skip("should successfully beautify JavaScript files", () => {
  // tslint:disable:mocha-no-side-effect-code
  testFile("lf-with-newline.js");
  testFile("lf-without-newline.js");
});

function testFile(fixtureFileName: string) {
  describe.skip(`with file ${fixtureFileName}`, () => {
    const text: string = fs
      .readFileSync(path.resolve(__dirname, `../fixtures/${fixtureFileName}`))
      .toString();
    testWithOptions(text, {});
    testWithOptions(text, {
      end_with_newline: undefined,
      end_of_line: undefined,
    });
    testWithOptions(text, {
      end_with_newline: true,
      end_of_line: "LF",
    });
    testWithOptions(text, {
      end_with_newline: true,
      end_of_line: "CRLF",
    });
    testWithOptions(text, {
      end_with_newline: false,
      end_of_line: "LF",
    });
    testWithOptions(text, {
      end_with_newline: false,
      end_of_line: "CRLF",
    });
  });
}

function testWithOptions(text: string, options: OptionValues) {
  test(`should successfully beautify with ${JSON.stringify(options)}`, () => {
    const unibeautify = newUnibeautify();
    unibeautify.loadBeautifier(beautifier);
    return unibeautify
      .beautify({
        languageName: "JavaScript",
        options: {
          JavaScript: options,
        },
        text,
      })
      .then(results => {
        expect(raw(results)).toMatchSnapshot();
      });
  });
}
