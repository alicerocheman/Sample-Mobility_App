// import Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

import colors from 'constants/colors';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Asap, sans-serif',
  palette: {
    primary1Color: colors.orange500,
    primary2Color: colors.orange700,
    primary3Color: colors.grey400,
    accent1Color: colors.yellow500,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.black,
    secondaryTextColor: fade(colors.black, 0.54),
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: fade(colors.black, 0.3),
    pickerHeaderColor: colors.orange500,
    clockCircleColor: fade(colors.black, 0.07),
    shadowColor: colors.pureBlack
  },
  textField: {
    errorColor: colors.errorRed
  },
  flatButton: {
    fontWeight: 'normal'
  }
};
