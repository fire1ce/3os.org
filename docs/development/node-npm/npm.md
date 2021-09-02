---
description: npm & Node.js Cli Useful Commands
---

# NPM & Node.js Cli Commands

## Updating Node & npm to Latest Stable Version

npm:

```bash
npm install -g npm
```

node:

```bash
npm cache clean -f
npm install -g n
n stable
```

## Updating Local Project Packages

Navigate to the root directory of your project and ensure it contains a package.json
In your project root directory, run:

```bash
npm update
```

To test the update, run the `outdated` command. _There should not be any output_.

```bash
npm outdated
```

## Updating Globally-Installed Packages

To see which global packages need to be updated, on the command line, run:

```bash
npm outdated -g --depth=0
```

To update a single global package, on the command line, run:

```bash
npm update -g <package_name>
```

To update all global packages, on the command line, run:

```bash
npm update -g
```

