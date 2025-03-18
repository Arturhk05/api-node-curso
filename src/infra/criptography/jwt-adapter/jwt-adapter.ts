import type { Decrypter } from '../../../data/protocols/criptography/decrypter'
import type { TokenGenerator } from '../../../data/protocols/criptography/token-generator'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator, Decrypter {
  constructor (private readonly secret: string) {}

  async generate (id: string): Promise<string> {
    const accessToken = jwt.sign({ id }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<string> {
    const value: any = jwt.verify(token, this.secret)
    return value
  }
}
