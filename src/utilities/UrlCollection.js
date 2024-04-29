const ROOT = 'http://localhost:8080'

const AUTH = {
  REGISTER: ROOT + '/auth/register',
  LOGIN: ROOT + '/auth/login'
}

const USER = {
  PROFILE: ROOT + '/user/profile'
}

const GROUPS = {
  BASE: ROOT + 'groups/'
}

export { AUTH, USER, GROUPS }
