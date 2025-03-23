import type { SurveysModel } from '../models/survey'

export interface LoadSurveys {
  load: () => Promise<SurveysModel[]>
}
