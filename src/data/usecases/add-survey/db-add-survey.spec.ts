import type { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

describe('DbAddSurvey Controller', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      async add (data: AddSurveyModel): Promise<void> {
        return Promise.resolve()
      }
    }
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    const addSurveyRepositorySpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(makeFakeSurveyData())
    expect(addSurveyRepositorySpy).toHaveBeenCalledWith(makeFakeSurveyData())
  })
})
