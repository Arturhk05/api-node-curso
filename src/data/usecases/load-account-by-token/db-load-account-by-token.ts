import type { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import type { Decrypter } from '../../protocols/criptography/decrypter'
import type { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'
import type { AccountModel } from '../add-account/db-add-account-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter, private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository) {}

  async load (accessToken: string, role?: string): Promise<AccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
