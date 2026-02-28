# convenience-core

## 🔥 Core Values

- **_Always write clean code_**
- **_Think before coding_**
- **_Code has heart_**
- **_Ready to teach each other_**
- **_Responsibility for work_**
- **_Actively discuss_**

## 🌱 Environment

- Node - v18.12.0
- Yarn v1
- VSCode
- Eslint plugin
- Prettier plugin

## 📝 APIs and Documentation

- [Docs](https://64bf37424f81a4740ee9232d-mbbtuxbont.chromatic.com)
- [Config husky + commintLint](https://viblo.asia/p/nang-cao-chat-luong-code-va-hieu-qua-lam-viec-nhom-voi-husky-lint-staged-commitlint-4dbZNnMnZYM)
- [Degit](https://github.com/Rich-Harris/degit) (clone template from git)
- [Jenkins vs Github Action](https://www.youtube.com/watch?v=Gpl_usE_BWM&t=696s)
- [Networking](docs/release.md)
- [Reference](docs/reference.md)
- [Storybook](https://storybook.js.org/tutorials/intro-to-storybook/react/en/deploy/)

## 📂 Code base Structure

```
.
├── docs
├── .storybook
├── plugin
├── scripts
├── src
│   ├── packages
│   │   ├── (all components and hooks)
│   │   └── utils.ts
│   ├── stories
│   └── types
└── styles
    ├── components
    ├── index.css
    └── tailwind.config.js
```

- src/lib/components: contains all React component that is used by the project
- src/lib/hooks: contains common/shared hooks

* Folder src/lib will be exported

<!-- - src/demos: contains all demo components -->

- src/stories: contains all storybook file

- styles/components: contains all css style for components, which be used to parse to cjs file, which will be used to build tailwind plugin
- plugin folder: will be used to build tailwind plugin, for more information, please visit https://tailwindcss.com/docs/plugins

## After completing the development, run:

- `yarn parse-css` to parse _.css to _.cjs file,
  Then, go to the 'plugin/index.cjs' file, import the component that you've just developed into addComponent section.

## 🆕 Release new version

- Create Merge Request to `master` branch. The release branch will trigger CI/CD process after change (this action will public package). To release new version, you have to commit with prefix ( fix(pencil): , feat(pencil):, perf(pencil):, ...). More info: https://github.com/semantic-release/semantic-release
- Create Merge Request to `release-storybook` branch. The release branch will trigger CI/CD process after change (this action will public storybook).

## 💉 Commit Rules

Must create commit follow below rules:

- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

Example:
`feat: first commit`

## 🤟 Branch Rules

Must create branch follow below rules:

- feat/
- feedback/
- hotfix/
- revert/
- reset/
- force/
- refactor/
- fix/
