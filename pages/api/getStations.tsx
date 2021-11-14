import { NextApiRequest, NextApiResponse } from 'next'
import { COLOR } from 'utils/constants'
import {
  BLUE_STATIONS,
  BROWN_STATIONS,
  GREEN_STATIONS,
  RED_STATIONS,
  YELLOW_STATIONS,
  ORANGE_STATIONS
} from 'assets/stations'

import { StationsVO } from 'utils/interface/common'

const GetStations = (req: NextApiRequest, res: NextApiResponse): void => {
  console.log(req.query)
  if (req.query.line) {
    const lines = req.query.line as string
    const colors = lines.split(',')
    let result: StationsVO[] = []
    if (colors.indexOf(COLOR.blue) !== -1) {
      result = result.concat(BLUE_STATIONS)
    }
    if (colors.indexOf(COLOR.brown) !== -1) {
      result = result.concat(BROWN_STATIONS)
    }
    if (colors.indexOf(COLOR.green) !== -1) {
      result = result.concat(GREEN_STATIONS)
    }
    if (colors.indexOf(COLOR.red) !== -1) {
      result = result.concat(RED_STATIONS)
    }
    if (colors.indexOf(COLOR.yellow) !== -1) {
      result = result.concat(YELLOW_STATIONS)
    }
    if (colors.indexOf(COLOR.orange) !== -1) {
      result = result.concat(ORANGE_STATIONS)
    }
    res.status(200).json({ data: result })
  } else {
    res.status(200).json({ data: [] })
  }
}

export default GetStations
