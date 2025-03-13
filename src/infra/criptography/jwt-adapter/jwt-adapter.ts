import type { TokenGenerator } from '../../../data/protocols/criptography/token-generator'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async generate (id: string): Promise<string> {
    jwt.sign({ id }, this.secret)
    return Promise.resolve('any_token')
  }
}
