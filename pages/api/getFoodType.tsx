import { NextApiRequest, NextApiResponse } from 'next'
import { FOOD_TYPE } from 'utils/constants'

const GetFoodType = (req: NextApiRequest, res: NextApiResponse): void => {
  const result = Object.keys(FOOD_TYPE).map(key => FOOD_TYPE[key])
  res.status(200).json({ data: result })
}

export default GetFoodType
