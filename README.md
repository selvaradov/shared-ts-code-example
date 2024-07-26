# README

This is a repo to demonstrate how you can share code between different subprojects
when using TypeScript, npm, and ES Module syntax.

## Testing

To get this working, do the following:
1. Run `npm install` in the root folder.
  This will create a `node_modules` folder with the symbolic links required
  for the local module dependencies to work
2. Run `tsc -b` in the root folder.
  This compiles the typescript in the correct order.
3. Run `node server/dist/foo.js`.
  If everything has worked, you will get the output
  `bar whirr fizz pop buzz` in the console.

## Features

There are a few different parts required.
- `npm` workspaces for each subproject specified in the 
  root `package.json`
- A dependency on the code in `./common` listed in `./server/package.json`,
  which references the name and version given in `./common/package.json`
- The relevant objects exported from files in the common folder, and the
  entry points to the common code specified in its `package.json`
- In the root `tsconfig`, `"composite": true` and `references` set to the
  both of the subprojects
- In the server `tsconfig`, `references` pointing to the common code, 
  as well as `compilerOptions.paths` pointing to where the source files
  for imported modules are


## Background

There are some StackOverflow answers online but none of them worked in my case and
it wasn't immediately clear why. The most helpful solution was
[this one](https://stackoverflow.com/questions/65045106/share-types-between-client-and-server)
but it wasn't directly applicable as:
- it imports some code *from* the server *to* the client rather than using a common folder to share with both
- the client code is bundled which means you don't need to worry about dealing with the local node_modules
  dependencies yourself

The solution mentioned [here](https://stackoverflow.com/questions/63058081/package-json-with-multiple-entrypoints)
and the linked documentation is very useful -- I think the reason the OP wasn't able to get it working
is they didn't specify `paths` in their TypeScript `compilerOptions` configuration.

[Claude](https://claude.ai) was not very helpful - it suggested things like doing
`import { sharedFunction } from '../../common/src/sharedFile';`, or recommended
compiling everything into a top-level `build` folder, and there
kept being "ERR_MODULE_NOT_FOUND" & "ERR_UNSUPPORTED_DIR_IMPORT" at runtime,
or "Cannot find module '@example/common' or its corresponding type declarations"
when working with TypeScript.

## Other links
- https://stackoverflow.com/questions/55753163/package-json-is-not-under-rootdir
  - When I tried this I also had a problem with `tsbuildinfo` conflicting, see https://github.com/Microsoft/TypeScript/issues/30925; had to explicitly set `tsBuildInfoFile` in config. But there were some
  other issues I don't remember too.
- https://stackoverflow.com/questions/65045106/share-types-between-client-and-server
- and https://stackoverflow.com/questions/47729344/how-to-share-code-between-typescript-projects
