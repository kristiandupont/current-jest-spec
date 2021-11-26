# current-jest-spec
Get the name of the currently running Jest spec

**NOTE** This doesn't work with jest-circus. I recommend using
```javascript
expect.getState().currentTestName
```
and
```javascript
expect.getState().testPath
```
instead.

---

Example:

```javascript
// Mocked getUuid.js

import { getSpecName } from 'current-jest-spec';

function getUuid() {
  return `UUID for ${getSpecName()}`;
}
```
