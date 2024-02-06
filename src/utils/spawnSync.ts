import { spawnSync as spawnSyncChildProcess } from "child_process"

export function spawnSync(
  command: string,
  options?: string[],
  customError?: string
) {
  const result = spawnSyncChildProcess(command, {
    shell: true,
    stdio: "pipe",
    ...options,
  })
  result.stdout = result.stdout || ""
  result.stderr = result.stderr || ""
  if (result.status === 0) {
    return result.stdout.toString().trim()
  } else {
    throw new Error(
      customError ??
        `\n\nError executing command: ${command}\n\nERROR CODE: ${result.status}\n\nSTDERR:\n${result.stderr}\n\nSTDOUT:\n${result.stdout}`
    )
  }
}
