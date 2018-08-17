import {
  Languages,
  BeautifierOptions,
  BeautifierLanguageOptions,
} from "unibeautify";

const languageOptions: BeautifierLanguageOptions = {
  end_of_line: true,
  end_with_newline: true,
};

export const options: BeautifierOptions = Languages.reduce((finalOptions, lang) => ({
    ...finalOptions,
    [lang.name]: languageOptions,
}), {} as BeautifierOptions);
