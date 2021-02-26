# 👋 Welcome and thanks for contributing!

## 🔌 Prerequisites
| **Tool** | **Version** |
| -------- | ----------- |
| `node`   | `=14`       |
| `yarn`   | `>=2`       |

## Getting Started

#### Installation
Update pnp.js, build binaries, and link workspace together.
```shell
$ yarn
```

#### Development process
Scripts available from the root of the mono-repo:
+ **compile** - compiles production ready packages.
+ **test** - runs `jest` inside of [`tests`](./packages/tests) package.

#### Writing your configuration
Use `RollupConfig` to write configurations. It packs everything that you need to `derive`,
`compose` and `combine` with other configurations. You can either create a plain configuration
instance:
```typescript
export const yourConfig = new RollupConfig<{ readonly yourPlugin: YourPluginOptions }>(
  ({ dirname }) => ({
    yourPlugin: [yourPlugin, { /* YourPluginOptions */ }],
  }),
  { /* RollupOptions */ }
);
```
...or derive from an existing one:
```typescript
export const anotherConfig = yourConfig.derive<{ readonly anotherPlugin: AnotherPluginOptions }>(
  () => ({
    yourPlugin: {
      // Will be deep merged with 'yourConfig's 'yourPlugin' options.
      option: true,
    },
    anotherPlugin: [anotherPlugin, { /* AnotherPluginOptions */ }],
  }),
  { /* RollupOptions will be merged with 'yourConfig's options. */ }
);
```
Now all that's left is to `finalize` the config.
```javascript
// lib/anotherConfig.js
export const anotherConfigFinalize = anotherConfig.finalize.bind(anotherConfig);
// rollup.config.js
export default anotherConfigFinalize()(__dirname);
```
Usage with `compose` and multiple formats:
```javascript
// rollup.config.js
export default compose('path/to/package', anotherConfigFinalize('cjs'));
```

## PnP and Yarn Berry
We use yarn **berry** (2) with Zero-Installs enabled, so dependencies are committed.

## 💅 Code style
is fully controlled by our [`eslint` configurations][eslint-configurations].

[eslint-configurations]: https://github.com/azimutlabs/eslint

## 📚 History
We prefer to use liner history and because of that
you need to know how to work with
[`git rebase`](https://git-scm.com/docs/git-rebase).

#### Hooks
We use [`🐶husky`](https://github.com/typicode/husky) to lint your changes and commit messages to save you
from common mistakes.

#### Helpful links about `git rebase`
+ [Merging vs. Rebasing documentation from **Atlassian**](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)
+ [`git rebase` tutorial from **Atlassian**](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)
+ [Official documentation](https://git-scm.com/docs/git-rebase)

#### Versioning
[Semantic Versioning 2.0.0](https://semver.org/)

Summary from **semver.org**:
> Given a version number MAJOR.MINOR.PATCH, increment the:
>
>  + MAJOR version when you make incompatible API changes,
>  + MINOR version when you add functionality in a backward-compatible manner, and
>  + PATCH version when you make backward-compatible bug fixes.
>
> Additional labels for pre-release and build metadata are available as extensions to
> the MAJOR.MINOR.PATCH format.

#### Commit messages
[Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)

Summary from **conventionalcommits.org**:
> The Conventional Commits specification is a lightweight convention on top of commit messages.
> It provides an easy set of rules for creating an explicit commit history; which makes it easier
> to write automated tools on top of. This convention dovetails with SemVer, by describing
> the features, fixes, and breaking changes made in commit messages.

**Message structure**:
```
<type>[optional scope]: <description> [task code if exists]

[optional body]

[optional footer(s)]
```

**Type**:

Must be one of the following:

+ **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
+ **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
+ **docs**: Documentation only changes
+ **feat**: A new feature
+ **fix**: A bug fix
+ **perf**: A code change that improves performance
+ **refactor**: A code change that neither fixes a bug nor adds a feature
+ **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
+ **test**: Adding missing tests or correcting existing tests
+ **revert**: MR/Commit reverts

**Description**
+ must be written using irregular verbs.
+ must describe what does YOUR CODE, but not what YOU DID

The Best way to understand if your commit message's good is to create sentence like:
`If applied, will [optional type] <description> [in <scope>]`.

**If applied, will...**
+ add jsdoc in `card`
+ `fix` typo in property name in `theme`
+ display columns in reverse order in `table`

**Examples**:
```
feat: add component Card
docs(card): add jsdoc (#7)
fix(theme): typo in property name (#12)
style(table): add semi colon (#2)
```

#### Branch naming
The branch name should consist of the squashed commit type and a quick summary.

**Examples**:
```
feat/card
fix/interactive-element
docs/readme
```

#### Merge Requests
**MR** is rejected when:
+ pipeline fails (lint/test error).
+ contains unrelated changes.
+ request is behind the default branch.
+ contains merge commits.


+ **If MR contains only one commit:** title should be the commit message.
+ **If MR contains multiple commits:** title should the overall summary.
+ **If MR contains the issue code:** description should contain `Closes %{issue_code}` automation command, e.g. `Closes #7`
