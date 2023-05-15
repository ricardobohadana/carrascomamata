interface Votes {
  [s: string]: boolean
}

export interface Professor {
  name: string
  abbreviation: string
  module: string
  university: string

  assignment: Votes
  attendance: Votes
  difficulty: Votes
  explanation: Votes
  study: Votes
  worthIt: Votes
}

export interface ProfessorObject {
  id: string
  professor: Professor
}
