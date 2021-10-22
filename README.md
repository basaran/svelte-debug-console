![svelte-debug-console](https://user-images.githubusercontent.com/30809170/138386188-96731e4f-4992-4efa-b4e5-a9a7d736df2c.png)

# svelte-debug-console

[debug.js](https://github.com/visionmedia/debug)  implementation for Svelte SPA, SSR and  sveltekit static sites. See your debug statements in the browser.

## Features

 - [x] svelte server side rendering (SSR) friendly.
 - [x] works with sveltekit SPA, SSR and static site adapters.
 - [x] auto scrolls to the last entry.
 - [x] typescript definitions are included for LSP.

## Demonstration

[svelte-debug-console demo](https://basaran.github.io/svelte-recaptcha-v2/)

## Getting Started
```bash
# install as a development dependency
pnpm install -D svelte-debug-console
```

## Basic Usage

Import the library onto your template and update your google key:

```js
import { Debug } from "svelte-debug-console";
/*
 │Debug: svelte <Debug> component.
 */
```

In your parent component, add the `<Debug>`:

```svelte
<Debug discard={"false"} />
```

If you want to start fresh, set `discard` option to true.

By default, debug.js will only create a single instance across your application.  `svelte-debug-console` will inject itself into the main debug instance.

For some use cases, this may not be desired.

## Issues

If any trouble, please create an issue. PRs are most welcome.

