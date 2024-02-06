export const USER = "MikeCodeur" as const
export const ROOT_SRC = "dist" as const
export const LOCAL_PATH = `${ROOT_SRC}/clone` as const
export const REPOSITORY = `github.com/${USER}` as const
export const DIRECTORY = `${LOCAL_PATH}/src` as const

const versionGit = "2.0" as const
const versionNode = "18.0.0" as const
const versionPkg = "8.0.0" as const
const versionTs = "4.3" as const

export const enCheckVersion = {
  versionGit,
  versionNode,
  versionPkg,
  versionTs,
} as const

export const PACKAGE_MANAGER = ["npm", "pnpm", "yarn", "bun"] as const
export const ENV_CHECK = ["git", "node", "typescript", ...PACKAGE_MANAGER] as const

export const reactModules = [
  {
    name: "react-prerequis-debutants",
  },
  {
    name: "react-prerequis-javascript",
    extrafiles: ["02-styles.css"],
  },
  {
    name: "react-fondamentaux",
    extrafiles: ["05-styles.css", "07-styles.css"],
  },
  {
    name: "react-hooks",
    extrafiles: [
      "04-styles.css",
      "06-styles.css",
      "08-styles.css",
      "emojiList.json",
      "marvel.js",
    ],
    extrafolders: ["demo", "logic"],
    dependencies: {
      prod: ["react-error-boundary", "react-use-clipboard"],
      dev: ["clipboard", "confetti-js"],
    },
  },
  {
    name: "react-patterns",
    extrafiles: ["data.js"],
  },
  {
    name: "react-hooks-avances",
    extrafiles: [
      "01-styles.css",
      "02-styles.css",
      "04-styles.css",
      "hook-flow.png",
      "marvel.js",
    ],
    extrafolders: ["logic"],
    dependencies: {
      prod: ["react-error-boundary"],
    },
  },
  {
    name: "react-patterns-avances",
    extrafiles: ["checkbox.css", "checkbox.js", "tab.css", "tab.js"],
    dependencies: {
      prod: ["warning"],
    },
  },
  {
    name: "react-testing",
    extrafiles: ["styles.css", "setupTests.js"],
    extrafolders: ["__tests__", "components", "test"],
    dependencies: {
      prod: ["axios", "react-hook-screen-orientation", "react-use-geolocation"],
      dev: [
        "@faker-js/faker",
        "@testing-library/react",
        "@testing-library/react-hooks",
        "@testing-library/user-event",
        "msw",
        "whatwg-fetch",
      ],
    },
  },
] as const

const typeScriptModules = [
  {
    name: "typescript-dom",
  },
  {
    name: "typescript-fondamentaux",
  },
  {
    name: "typescript-patterns",
  },
  {
    name: "typescript-avance",
  },
  {
    name: "typescript-expert",
  },
  {
    name: "typescript-testing",
    extrafolders: ["__tests__", "components"],
    dependencies: {
      dev: ["@testing-library/react", "@testing-library/user-event", "ts-node"],
    },
  },
] as const

export const courses = [
  {
    name: "React",
    modules: reactModules,
  },
  {
    name: "TypeScript",
    modules: typeScriptModules,
  },
] as const

export const ERROR = {
  COURSE_NOT_FOUND: "Course non trouvé",
  COURSE_NAME_NOT_FOUND: "Nom du cours non trouvé",
  MODULE_NOT_FOUND: "Module non trouvé",
  MODULE_NAME_NOT_FOUND: "Nom du module non trouvé",
  CANCEL: "Operation annulée",
  FIRST_OPTION: "L'option n'existe pas",
  DEPENDENCY_ERROR: "Erreur lors de l'installation des dépendances",
} as const
