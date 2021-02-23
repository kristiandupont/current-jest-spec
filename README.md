# current-jest-spec
Get the name of the currently running Jest spec

Example:

```javascript
// Mocked getUuid.js

import { getSpecName } from 'current-jest-spec';

function getUuid() {
  return `UUID for ${getSpecName()}`;
}
```
