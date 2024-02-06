import { PackageManager } from "../types/helpers.js"
import semver from "semver"
import { spawnSync } from "./spawnSync.js"

export const envCheck = {
  git: (versions?: string | string[]) => checkGit(versions),
  node: (versions?: string | string[]) => checkNode(versions),
  packageManager: (pkgManager?: PackageManager, versions?: string | string[]) =>
    checkPackageManager(pkgManager, versions),
}

const checkVersion = (arr: string | string[], value: string) => {
  if (Array.isArray(arr)) {
    return arr.some((v) => semver.satisfies(value, `>= ${v}`))
  }
  return semver.satisfies(value, `>= ${arr}`)
}

function checkGit(versions?: string | string[]) {
  const git = spawnSync("git --version", undefined, "git not found")
  const versionRegex = /git version (\d+\.\d+\.\d+)/
  const match = git.match(versionRegex)
  if (!match) {
    return false
  }
  const gitVersion = match[1] as string
  return versions ? checkVersion(versions, gitVersion) : true
}
function checkNode(versions?: string | string[]) {
  const node = spawnSync("node --version", undefined, "node not found")
  const versionRegex = /v(\d+\.\d+\.\d+)/
  const match = node.match(versionRegex)
  if (!match) {
    return false
  }
  return versions ? checkVersion(versions, node) : true
}

function checkPackageManager(
  pkgManager?: PackageManager,
  versions?: string | string[]
) {
  const packageManager = spawnSync(
    `${pkgManager ?? "npm"} --version`,
    undefined,
    `${pkgManager ?? "npm"} not found`
  )
  return versions ? checkVersion(versions, packageManager) : true
}
