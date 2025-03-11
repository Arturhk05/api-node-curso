import type { LogErrorRepository } from '../../data/protocols/log-error-repository'
import type { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controler: Controller
  private readonly logErrorRepository: LogErrorRepository

  constructor (controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controler = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const HttpResponse = await this.controler.handle(httpRequest)
    if (HttpResponse.statusCode === 500) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await this.logErrorRepository.log(HttpResponse.body.stack)
    }
    return HttpResponse
  }
}
