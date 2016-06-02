import test from 'tape';

import getPartners from '../app/utils/sagas'

test('getPartners', (assert) => {
  const gen = getPartners()
  console.log(gen);
})
