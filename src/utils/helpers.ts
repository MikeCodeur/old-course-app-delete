import {
  DIRECTORY,
  ERROR,
  LOCAL_PATH,
  REPOSITORY,
} from "../commons/constants.js"

import { ChekEnvType } from "../types/helpers.js"
import { cancel } from "@clack/prompts"
import { exec } from "child_process"
import fs from "fs"
import path from "path"
import { promisify } from "util"
import { simpleGit } from "simple-git"

const cleanDirectory = () => {
  fs.rmSync(LOCAL_PATH, { recursive: true, force: true })
}
export const getRepository = async (moduleName: string) => {
  const remoteRepository = `https://${REPOSITORY}/${moduleName}.git` as const
  cleanDirectory()
  fs.mkdirSync(LOCAL_PATH, { recursive: true })

  const git = simpleGit()
  await git.clone(remoteRepository, LOCAL_PATH)
}

export const installDependencies = async (
  dependencies: string[],
  dev = false
) => {
  for (const dependency of dependencies) {
    const preCommand = dev ? "add -D" : "add"
    const command = `pnpm ${preCommand} ${dependency}` as const
    const asyncExec = promisify(exec)

    try {
      await asyncExec(command)
    } catch (error) {
      return throwError(`\n ${ERROR.DEPENDENCY_ERROR} : ${dependency}`)
    }
  }
}
export const copyExercice = () => {
  copyDirectory(`${DIRECTORY}/exercise`, `src/exercise`)
}
export const copySolutions = () => {
  copyDirectory(`${DIRECTORY}/final`, `src/final`)
}
export const copyExtraFolders = (extrafolders: string[]) => {
  extrafolders.map((folder) => {
    copyDirectory(`${DIRECTORY}/${folder}`, `src/${folder}`)
  })
}
export const copyExtraFiles = (extrafiles: string[]) => {
  extrafiles.map((file) => {
    copySourceFile(`${DIRECTORY}/${file}`, `src/${file}`)
  })
}

const copyDirectory = (source: string, destination: string) => {
  fs.mkdirSync(destination, { recursive: true })

  fs.readdirSync(source).forEach((file) => {
    const sourcePath = path.join(source, file)
    const destinationPath = path.join(destination, file)

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, destinationPath)
    } else {
      copySourceFile(sourcePath, destinationPath)
    }
  })
}

const copySourceFile = (source: string, destination: string) => {
  try {
    if (source.endsWith("js")) {
      const content = fs.readFileSync(source, "utf-8")
      const modifiedContent = `"use client" \n${content}`
      fs.writeFileSync(source, modifiedContent, { flag: "w" })
    }
    fs.copyFileSync(source, destination)
  } catch (error) {
    return throwError(error)
  }
}

export const throwError = (error: string | unknown) => {
  cancel(error as string)
  process.exit(1)
}

export const throwErrorCheck = (chekEnvType: ChekEnvType, version: string) => {
  throwError(
    `version de ${chekEnvType} non supporté, version minimun: ${version}`
  )
}
