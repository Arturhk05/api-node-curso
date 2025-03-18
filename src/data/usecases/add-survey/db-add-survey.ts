import type { AddSurvey, AddSurveyModel } from '../../../domain/usecases/add-survey'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurvey) {}

  async add (data: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(data)
    return Promise.resolve()
  }
}
