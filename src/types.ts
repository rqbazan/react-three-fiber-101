export type FaceName = 'U' | 'D' | 'L' | 'R' | 'F' | 'B' | 'M' | 'E' | 'S'

export type User = {
  [key: string]: any
}

export interface ApiClient {
  logIn(email: string, password: string): Promise<void>
  logOut(): Promise<void>
  onAuth(callback: (u: User | null) => void): void
}
