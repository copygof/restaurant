import _ from 'lodash';
import compose from 'lodash/fp/compose';

const withReplaceSnackCase = text => text.replace(/\_/g, ' ');
const makePlaceTypeGreatingAgain = compose(
  _.upperFirst,
  withReplaceSnackCase,
);

export default makePlaceTypeGreatingAgain;
