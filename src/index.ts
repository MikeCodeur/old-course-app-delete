#!/usr/bin/env node

import { ERROR, enCheckVersion } from "./commons/constants.js"
import {
  copyExercice,
  copyExtraFiles,
  copyExtraFolders,
  copySolutions,
  getRepository,
  installDependencies,
  throwError,
  throwErrorCheck,
} from "./utils/helpers.js"
import {
  getCoursesNames,
  getFirstOption,
  getModule,
  getModulesNames,
} from "./utils/prompts.js"
import { group, intro, outro, select, spinner } from "@clack/prompts"

import { ModuleName } from "./types/courses.js"
import chalk from "chalk"
import { envCheck } from "./utils/env.js"
import fs from "node:fs"

async function main() {
  intro(chalk.inverse("💻 Cours de Mike Codeur "))

  await group(
    {
      environnement: async () => {
        const {versionGit, versionNode, versionPkg} = enCheckVersion
        const s = spinner()
        s.start("🔧 Vérification de l'environnement")
        const checkNode = envCheck.node(versionGit)
        if (!checkNode) {
          throwErrorCheck("node", versionNode)
        }
        const checkGit = envCheck.git(versionGit)
        if (!checkGit) {
          throwErrorCheck("git", versionGit)
        }
        const checkPkg = envCheck.packageManager("pnpm", versionPkg)
        if (!checkPkg) {
          throwErrorCheck("pnpm", versionPkg)
        }
        s.stop("🔧 Environnement OK")
      },
      course: async () => {
        const coursesNames = getCoursesNames()
        const firstCourse = getFirstOption(coursesNames)
        const result = await select({
          message: "💼 Quel cours voulez-vous initialiser?",
          options: coursesNames,
          initialValue: firstCourse,
        })
        return result
      },
      module: async ({ results }) => {
        if (results.course === undefined) {
          return throwError(ERROR.COURSE_NOT_FOUND)
        }
        const moduleNames = getModulesNames(results.course)
        const firstModule = getFirstOption(moduleNames)
        const result = await select({
          message: "🔧 Quel module voulez-vous choisir?",
          options: moduleNames,
          initialValue: firstModule,
        })
        return result
      },

      repository: async ({ results }) => {
        if (!results.module) {
          return throwError(ERROR.MODULE_NOT_FOUND)
        }
        if (results.course === undefined) {
          return throwError(ERROR.COURSE_NOT_FOUND)
        }
        const s = spinner()
        const moduleName = results.module as ModuleName
        const currentModule = getModule(results.course, moduleName)

        s.start(" Clonage du repository")
        await getRepository(moduleName)
        s.stop("Clonage terminé")

        if (!("dependencies" in currentModule)) return

        if ("prod" in currentModule.dependencies) {
          s.start("Installation des dépendances de production")
          await installDependencies([...currentModule.dependencies.prod])
          s.stop("Installation terminé des dépendances de production")
        }

        if ("dev" in currentModule.dependencies) {
          s.start("Installation des dépendances de developpement")
          await installDependencies([...currentModule.dependencies.dev], true)
          s.stop("Installation terminé des dépendances de developpement")
        }
      },
      copy: ({ results }) => {
        if (results.course === undefined) {
          return throwError(ERROR.COURSE_NOT_FOUND)
        }

        const moduleName = results.module as ModuleName
        const module = getModule(results.course, moduleName)
        const s = spinner()

        s.start("Copie des exercices")
        copyExercice()
        s.stop("Copie terminée des exercices")

        s.start("Copie des solutions")
        copySolutions()
        s.stop("Copie terminée des solutions")

        if ("extrafiles" in module) {
          s.start("Copie des fichiers supplémentaires")
          copyExtraFiles([...module.extrafiles])
          s.stop("Copie terminée des fichiers supplémentaires")
        }
        if ("extrafolders" in module) {
          s.start("Copie des dossiers supplémentaires")
          copyExtraFolders([...module.extrafolders])
          s.stop("Copie terminée des dossiers supplémentaires")
        }
      },
      cleanup: async () => {
        const s = spinner()

        s.start("🧹 Nettoyage du dossier")
        fs.rmSync("dist", { recursive: true })
        s.stop("Nettoyage terminé")
      },
    },
    {
      onCancel: () => {
        return throwError(ERROR.CANCEL)
      },
    }
  )
  outro("🎉 Module prêt, happy coding!")
}

await main()
