import { NextApiRequest, NextApiResponse } from "next";

import { StationsVO } from 'utils/interface/common'

const blueStations: StationsVO[] = [
  {
    name: '頂埔站',
    lat: 24.959358086821005,
    lng: 121.41981599800197
  },
  {
    name: '永寧站',
    lat: 24.9669345126236,
    lng: 121.43626245570891
  },
  {
    name: '土城站',
    lat: 24.97303599990267,
    lng: 121.44428488942405
  },
  {
    name: '海山站',
    lat: 24.985371815250527,
    lng: 121.44878152242356
  },
  {
    name: '亞東醫院站',
    lat: 24.99849827536465,
    lng: 121.45254621544008
  },
  {
    name: '府中站',
    lat: 25.00854491585244,
    lng: 121.4594328146164
  },
  {
    name: '板橋站',
    lat: 25.01382408928942,
    lng: 121.46244152340864
  },
  {
    name: '新埔站',
    lat: 25.023639499529047,
    lng: 121.46835015933243
  },
  {
    name: '江子翠站',
    lat: 25.03000879902106,
    lng: 121.47238944153824
  },
  {
    name: '龍山寺站',
    lat: 25.035245068181776,
    lng: 121.50043812680018
  },
  {
    name: '西門站',
    lat: 25.042188250376697,
    lng: 121.50829929059658
  },
  {
    name: '台北車站',
    lat: 25.04780473287673,
    lng: 121.51701924019679
  },
  {
    name: '善導寺站',
    lat: 25.04484826529241,
    lng: 121.52336310645035
  },
  {
    name: '忠孝新生站',
    lat: 25.041790695334313,
    lng: 121.53285368974313
  },
  {
    name: '忠孝復興站',
    lat: 25.041623000143456,
    lng: 121.54378372972849
  },
  {
    name: '忠孝敦化站',
    lat: 25.041352970235227,
    lng: 121.55049366310132
  },
  {
    name: '國父紀念館站',
    lat: 25.041356896347267,
    lng: 121.55750199285644
  },
  {
    name: '市政府站',
    lat: 25.04111034163598,
    lng: 121.56631790804016
  },
  {
    name: '永春站',
    lat: 25.04083915551391,
    lng: 121.57603393151987
  },
  {
    name: '後山埤站',
    lat: 25.04501120878063,
    lng: 121.58247963789337
  },
  {
    name: '昆陽站',
    lat: 25.050480145707503,
    lng: 121.59322661397658
  },
  {
    name: '捷運南港站',
    lat: 25.052082311193466,
    lng: 121.60704600392751
  },
  {
    name: '南港展覽館站',
    lat: 25.05530708945024,
    lng: 121.6179144673126
  }
]

const GetStations = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  if (req.query.line) {
    switch (req.query.line) {
      case 'blue':
        res.status(200).json({ data: blueStations })
        break;
      default:
        res.status(200).json({})
        break;
    }
  } else { }
}

export default GetStations;