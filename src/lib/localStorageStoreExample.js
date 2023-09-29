import { localStorageStore } from "@skeletonlabs/skeleton";
/**
 * @type {import('svelte/store').Writable<object>}
 */
export const config = localStorageStore("preferences", {
  theme: "dark",
  header: 0,
  footer: 0,
  sidebarRight: 0,
  sidebarLeft: 0,
  height: 0,
  width: 0,
});

/*
# local storage store

## install

```sh
npm install svelte-local-storage-store
```

## Define the store

```js
import { persisted } from 'svelte-local-storage-store'

// First param `preferences` is the local storage key.
// Second param is the initial value.
export const preferences = persisted('preferences', {
  theme: 'dark',
  pane: '50%',
  ...
})
```

## Use the Store:

```js
import { get } from 'svelte/store'
import { preferences } from './stores'

preferences.subscribe(...) // subscribe to changes
preferences.update(...) // update value
preferences.set(...) // set value
get(preferences) // read value
$preferences // read value with automatic subscription
```

## set the serializer or storage type

```js
import * as devalue from 'devalue'

// third parameter is options.
export const preferences = persisted('local-storage-key', 'default-value', {
  serializer: devalue, // defaults to `JSON`
  storage: 'session' // 'session' for sessionStorage, defaults to 'local'
})
```
*/
