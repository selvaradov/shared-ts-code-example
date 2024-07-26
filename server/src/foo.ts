// `bar.ts` and `whirr.ts` are in the `utils` folder, `fizz.ts` is in the `helpers` folder.
// They're re-exported through the top-level `index.ts` file.
// For `bar` and `whirr`, we do "barrel exports" by first creating an 
// `index.ts` file in `utils` that re-exports everything in that folder, and then
// exporting that from the top-level `index.ts` file. For `fizz`, we directly
// export it from the top-level `index.ts` file.
import { bar, whirr, fizz } from '@example/common';

// `pop.ts` is in the `helpers` folder, and re-exported through
// the `helpers/index.ts` file, which we make accessible as an
// entrypoint in the `common` package.json file.
import { pop } from '@example/common/helpers';

// `buzz.ts` is also in the `helpers` folder, but it's not re-exported
// through the `helpers/index.ts` file. We can still import it directly
// from the `helpers` folder.
import { buzz } from '@example/common/helpers/buzz.js';

console.log(bar, whirr, fizz, pop, buzz);