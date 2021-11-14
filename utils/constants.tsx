export enum COLOR {
  blue = 'blue',
  brown = 'brown',
  green = 'green',
  red = 'red',
  yellow = 'yellow',
  orange = 'orange'
}

export const LINE_COLOR: { readonly [key: string]: string } = {
  [COLOR.blue]: '0070BD',
  [COLOR.brown]: 'C48C31',
  [COLOR.green]: '008659',
  [COLOR.red]: 'E3002C',
  [COLOR.yellow]: 'FDDB00',
  [COLOR.orange]: 'F8B61C'
}

export const LINE_NAME: { readonly key: string; readonly name: string }[] = [
  { key: COLOR.blue, name: '板南線' },
  { key: COLOR.brown, name: '文湖線' },
  { key: COLOR.green, name: '松山新店線' },
  { key: COLOR.red, name: '淡水信義線' },
  { key: COLOR.yellow, name: '環狀線' },
  { key: COLOR.orange, name: '中和新蘆線' }
]

export const FOOD_TYPE: { readonly [key: string]: string } = {
  ramen: '拉麵',
  sushi: '壽司',
  thai: '泰式料理',
  japanese: '日式料理',
  italian: '義式料理',
  american: '美式料理',
  European: '歐式料理',
  taiwanese: '台式料理',
  chinese: '中式料理',
  hongKong: '港式料理',
  korean: '韓式料理',
  breakfast: '早餐',
  brunch: '早午餐',
  hotPot: '火鍋',
  eatFull: '吃到飽',
  stirFries: '熱炒',
  teppanyaki: '鐵板燒'
}
