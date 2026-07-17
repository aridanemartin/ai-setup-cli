const PROTECTED = [".env", ".env.local", ".env.production", "package-lock.json"]

export const HooksPlugin = async ({ $ }) => ({
  "tool.execute.before": async (input, output) => {
    const tool = input?.tool ?? ""
    if (tool !== "edit" && tool !== "write") return

    const filePath = output?.args?.filePath ?? ""
    if (!filePath) return

    for (const pattern of PROTECTED) {
      if (filePath.includes(pattern)) {
        throw new Error(`Blocked: ${tool} on protected file '${filePath}'`)
      }
    }
  },

  "tool.execute.after": async (input) => {
    const tool = input?.tool ?? ""
    if (tool !== "edit" && tool !== "write") return

    const filePath = input?.args?.filePath ?? ""
    if (!filePath) return

    const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z")
    await $`echo ${`[${ts}] ${tool}: ${filePath}`} >> .opencode/write.log`
  },
})
