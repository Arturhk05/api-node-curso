import type { LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { ok, serverError } from '../../../helpers/http/http-helper'
import type { Controller, HttpRequest, HttpResponse } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return ok(surveys)
    } catch (error) {
      if (error instanceof Error) {
        return serverError(error)
      }
      return serverError(new Error('Unknown error'))
    }
  }
}
