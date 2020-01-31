import { helper } from '@ember/component/helper';

export default helper(function incrementIndex([index]/*, hash*/) {
  return index+1;
});
