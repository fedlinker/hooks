---
name: Getting Started
route: /getting-started
---

# Getting Started

[@fedlinker/hooks](https://www.npmjs.com/package/@fedlinker/hooks) is a React hooks library.

## Install

```sh
npm install --save @fedlinker/hooks
# Or
yarn add @fedlinker/hooks
```

## Usage

```tsx
import React from "react";
import { useMount } from "@fedlinker/hooks";

function Example() {
  useMount(() => {
    console.log("Component is mounted");
  });
  ...
}
```

## License

Code licensed MIT, docs [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
