import type { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controler: Controller

  constructor (controller: Controller) {
    this.controler = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const HttpResponse = await this.controler.handle(httpRequest)
    return HttpResponse
  }
}
