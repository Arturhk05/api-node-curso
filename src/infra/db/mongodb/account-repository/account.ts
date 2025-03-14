import { ObjectId } from 'mongodb'
import type { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import type { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import type { UpdateAccessTokenRepository } from '../../../../data/protocols/db/update-access-token-repository'
import type { AccountModel } from '../../../../domain/models/account'
import type { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return Object.assign({}, { id: String(result.insertedId), name: accountData.name, email: accountData.email, password: accountData.password })
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    if (account) {
      const accountModel: AccountModel = {
        id: String(account._id),
        name: account.name,
        email: account.email,
        password: account.password
      }
      return accountModel
    }
    return null
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}
