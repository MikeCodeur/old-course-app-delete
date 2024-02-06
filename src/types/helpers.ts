import { ENV_CHECK, PACKAGE_MANAGER } from "../commons/constants.js"

export type PackageManager = (typeof PACKAGE_MANAGER)[number]
export type ChekEnvType = (typeof ENV_CHECK)[number]
