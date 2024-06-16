export interface Match {
    home: Team
    away: Team
}

export interface Team {
    name: string
    score: number
}

export type Day = Record<string, Match[]>

export interface Results {
    bundesliga: Day
}
