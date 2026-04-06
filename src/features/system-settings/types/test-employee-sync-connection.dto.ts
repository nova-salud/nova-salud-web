export type TestEmployeeSyncConnectionDto = {
  host: string
  port: number
  username: string
  password: string
  database: string
  encrypt: boolean
  trustServerCertificate: boolean
}