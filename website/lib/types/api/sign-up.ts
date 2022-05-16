import { User } from '../profile/user'

export interface SignUpRequestBody {
  preferredName: string
}

export interface SignUpResponse {
  user: User
}
