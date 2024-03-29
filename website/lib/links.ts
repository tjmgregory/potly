export function linkToLanding() {
  return '/'
}

export function linkToLogin() {
  return '/login'
}

export function linkToLoginCallback() {
  return `${linkToLogin()}/callback`
}

export function linkToDashboard() {
  return '/dashboard'
}

export function linkToBlog(id: string) {
  return `/blog/${id}`
}

export function linkToSignUp() {
  return `/sign-up`
}
