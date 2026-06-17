# Pending fix: XP/result screen can reopen after returning to Home

## Current status

The intended flow is:

```text
last treasure
→ TreasureFound
→ TreasureResult/XP
→ Home
```

The result screen must appear once, directly after the final treasure. It must not reopen after the user returns to Home.

## What is already implemented

Commit:

```text
b3f8e3c  Prevent presented treasure result from reopening
```

`src/utils/pendingResultStore.js` now contains a `pendingResultPresented` flag and exports:

```js
markPendingResultPresented()
```

`getPendingResult()` returns `null` after the pending result has been marked as presented.

This is only package 1 of the planned fix.

## What remains

### Package 2: mark the result as presented when TreasureResult opens

File:

```text
src/screens/treasure/TreasureResultScreen.js
```

Required changes:

1. Import `markPendingResultPresented` from `pendingResultStore`.
2. Read the pending result once and keep that snapshot stable with `useRef`.
3. Call `markPendingResultPresented()` in a mount effect.

Recommended shape:

```js
import {
  clearPendingResult,
  getPendingResult,
  markPendingResultPresented
} from "../../utils/pendingResultStore";

const pendingResult = useRef(getPendingResult()).current;

useEffect(() => {
  markPendingResultPresented();
}, []);
```

The stable `useRef` snapshot is important because `getPendingResult()` returns `null` after the store is marked as presented. The currently displayed result must retain its data.

Do not remove the existing result fade-in or haptics.

### Package 3: remove obsolete Home auto-routing

File:

```text
src/screens/home/HomeScreen.js
```

Home still imports and uses:

```text
useCallback
useRef
useFocusEffect
useNavigation
getPendingResult
```

It also contains a focus effect that waits 250 ms and runs:

```js
navigation.navigate("TreasureResult");
```

This behavior was introduced for the old flow:

```text
last treasure → Home → TreasureResult
```

That flow is no longer wanted. Remove the Home focus effect and the imports/state used only by it.

After cleanup, the React import should only include hooks still used by Home, currently expected to be:

```js
import React, { useEffect, useState } from "react";
```

Also remove:

```js
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getPendingResult } from "../../utils/pendingResultStore";
```

and remove these component variables:

```js
const navigation = useNavigation();
const resultOpening = useRef(false);
```

## Existing direct final-treasure routing

Commit:

```text
a514543  Restore direct treasure result flow
```

`TreasureFoundScreen` currently saves the completed result and prioritizes `onContinue()`. `AppNavigator` already passes:

```js
onContinue={() => navigation.navigate("TreasureResult")}
```

Preserve that behavior.

## Why the previous attempt stopped

Package 2 was attempted twice through the GitHub connector, but GitHub returned:

```text
503 Connection refused
```

This was a transport failure, not a code or policy rejection. No partial change to `TreasureResultScreen.js` was saved.

## Verification checklist

After packages 2 and 3 are committed:

1. Complete the final treasure.
2. Confirm `TreasureResult` opens directly, without showing Home first.
3. Confirm correct treasure count, elapsed time and XP are displayed.
4. Press `Til hovedmeny`.
5. Confirm Home remains visible and `TreasureResult` does not reopen.
6. Confirm XP is awarded only once.
7. Repeat on web and in a physical dev build.
8. Confirm result fade-in and haptics still work.

## Relevant files

```text
src/screens/treasure/TreasureFoundScreen.js
src/screens/treasure/TreasureResultScreen.js
src/screens/home/HomeScreen.js
src/utils/pendingResultStore.js
src/navigation/AppNavigator.js
```

## Branch

```text
sonar
```
