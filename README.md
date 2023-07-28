# convenience-core

## Environment

- Node - v16
- Yarn v1
- VSCode
- Eslint plugin
- Prettier plugin

## APIs and Documentation

- [Docs](https://64bf37424f81a4740ee9232d-zspyhumslt.chromatic.com/)

## Code base Structure

- src/lib/components: contains all React component that is used by the project
- src/lib/hooks: contains common/shared hooks

* Folder src/lib will be exported

- src/demos: contains all demo components
- src/stories: contains all storybook file

- styles/components: contains all css style for components, which be used to parse to cjs file, which will be used to build tailwind plugin
- plugin folder: will be used to build tailwind plugin, for more information, please visit https://tailwindcss.com/docs/plugins

## Documents

- [Config husky + commintLint](https://viblo.asia/p/nang-cao-chat-luong-code-va-hieu-qua-lam-viec-nhom-voi-husky-lint-staged-commitlint-4dbZNnMnZYM)
- [Degit](https://github.com/Rich-Harris/degit)
- [Jenkins vs Github Action](https://www.youtube.com/watch?v=Gpl_usE_BWM&t=696s)
- [Networking](docs/release.md)
- [Reference](docs/reference.md)

## Deploy Storybook

```
npm run chromatic
```

- [Storybook](https://storybook.js.org/tutorials/intro-to-storybook/react/en/deploy/)

## After completing the development, run:

`yarn parse-css` to parse _.css to _.cjs file,
Then, go to the 'plugin/index.cjs' file, import the component that you've just developed into addComponent section.

### Release new version

- Create Merge Request to `main` branch. The release branch will trigger CI/CD process after change.
- To release new version, you have to commit with prefix ( fix(pencil): , feat(pencil):, perf(pencil):, ...). More info: https://github.com/semantic-release/semantic-release
