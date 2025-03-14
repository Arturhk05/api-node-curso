import type { TokenGenerator } from '../../../data/protocols/criptography/token-generator'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generate (id: string): Promise<string> {
    const accessToken = jwt.sign({ id }, this.secret)
    return accessToken
  }
}
