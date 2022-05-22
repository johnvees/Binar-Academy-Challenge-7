const mainColors = {
  dark: '#1C1D22',
  gray1: '#26272D',
  gray2: '#B5B6B9',
  white: '#FFFFFF',
  green: '#BDD2B6',
  red: '#C65D7B',
  yellow: '#F1E0AC',
};

export const colors = {
  white: mainColors.white,
  black: mainColors.dark,
  text: {
    primary: mainColors.white,
    secondary: mainColors.gray2,
    menuActive: mainColors.yellow,
    menuInactive: mainColors.gray2,
  },
  background: {
    primary: mainColors.dark,
    secondary: mainColors.gray1,
  },
  button: {
    background: mainColors.yellow,
    text: mainColors.dark,
  },
  icon: {
    danger: mainColors.red,
    success: mainColors.green,
  },
};
