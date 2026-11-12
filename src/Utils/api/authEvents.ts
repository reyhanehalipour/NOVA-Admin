type UnauthorizedHandler = () => void

let handler: UnauthorizedHandler | null = null
let isNotifying = false

export const registerUnauthorizedHandler = (next: UnauthorizedHandler): void => {
  handler = next
}

export const notifyUnauthorized = (): void => {
  if (!handler || isNotifying) {
    return
  }
  isNotifying = true
  handler()
  setTimeout(() => {
    isNotifying = false
  }, 0)
}