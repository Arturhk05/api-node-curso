import type { LogErrorRepository } from '../../../data/protocols/db/log/log-error-repository'
import type { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller, private readonly logErrorRepository: LogErrorRepository) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const HttpResponse = await this.controller.handle(httpRequest)
    if (HttpResponse.statusCode === 500) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await this.logErrorRepository.logError(HttpResponse.body.stack)
    }
    return HttpResponse
  }
}
