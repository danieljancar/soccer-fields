const fs = require('fs')
const path = require('path')

/**
 * Transforms raw results from the public/raw-results directory into a single JSON file.
 * The raw results are expected to be in the following format:
 * - Each league has its own directory in public/raw-results.
 * - Each league directory contains files named after the day of the matches in the format day**.txt.
 * - Each file contains the results of the matches for that day, one match per line.
 * - Each match is in the format: homeTeam result awayTeam.
 * - The result is in the format: homeGoals:awayGoals.
 *
 * @example
 *  Arsenal 2:1 Chelsea
 *  Liverpool 1:1 Manchester United
 *
 *  @output public/results.json
 */
function transformRawResults() {
  const rawResultsDir = path.join(__dirname, 'public/raw-results')
  const outputDir = path.join(__dirname, 'public')

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const leagues = fs.readdirSync(rawResultsDir)

  const allMatches = {}

  leagues.forEach((league) => {
    const leagueDir = path.join(rawResultsDir, league)
    const days = fs.readdirSync(leagueDir)

    days.forEach((day) => {
      const dayKey = day.replace('.txt', '')
      const dayFilePath = path.join(leagueDir, day)
      const fileContent = fs.readFileSync(dayFilePath, 'utf-8').trim()

      const matches = fileContent.split('\n').map((line) => {
        const resultIndex = line.search(/[0-9]:[0-9]/)
        const homeTeam = line.substring(0, resultIndex).trim()
        const result = line.substring(resultIndex, resultIndex + 3).trim()
        const awayTeam = line.substring(resultIndex + 3).trim()
        return { homeTeam, result, awayTeam }
      })

      if (!allMatches[league]) {
        allMatches[league] = {}
      }

      allMatches[league][dayKey] = matches
    })
  })

  const outputFile = path.join(outputDir, 'results.json')
  fs.writeFileSync(outputFile, JSON.stringify(allMatches, null, 2))

  console.log('🎉 All match results transformed and saved to results.json.\n')
}

transformRawResults()
