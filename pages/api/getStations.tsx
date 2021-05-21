import { NextApiRequest, NextApiResponse } from "next";
import { COLOR, LINE_COLOR } from 'utils/constants';

import { StationsVO } from 'utils/interface/common';

// 板南線
const blueStations: StationsVO[] = [
  {
    name: '頂埔站',
    color: LINE_COLOR.blue,
    lat: 24.959358086821005,
    lng: 121.41981599800197
  },
  {
    name: '永寧站',
    color: LINE_COLOR.blue,
    lat: 24.9669345126236,
    lng: 121.43626245570891
  },
  {
    name: '土城站',
    color: LINE_COLOR.blue,
    lat: 24.97303599990267,
    lng: 121.44428488942405
  },
  {
    name: '海山站',
    color: LINE_COLOR.blue,
    lat: 24.985371815250527,
    lng: 121.44878152242356
  },
  {
    name: '亞東醫院站',
    color: LINE_COLOR.blue,
    lat: 24.99849827536465,
    lng: 121.45254621544008
  },
  {
    name: '府中站',
    color: LINE_COLOR.blue,
    lat: 25.00854491585244,
    lng: 121.4594328146164
  },
  {
    name: '板橋站',
    color: LINE_COLOR.blue,
    lat: 25.01382408928942,
    lng: 121.46244152340864
  },
  {
    name: '新埔站',
    color: LINE_COLOR.blue,
    lat: 25.023639499529047,
    lng: 121.46835015933243
  },
  {
    name: '江子翠站',
    color: LINE_COLOR.blue,
    lat: 25.03000879902106,
    lng: 121.47238944153824
  },
  {
    name: '龍山寺站',
    color: LINE_COLOR.blue,
    lat: 25.035245068181776,
    lng: 121.50043812680018
  },
  {
    name: '西門站',
    color: LINE_COLOR.blue,
    lat: 25.042188250376697,
    lng: 121.50829929059658
  },
  {
    name: '台北車站',
    color: LINE_COLOR.blue,
    lat: 25.04780473287673,
    lng: 121.51701924019679
  },
  {
    name: '善導寺站',
    color: LINE_COLOR.blue,
    lat: 25.04484826529241,
    lng: 121.52336310645035
  },
  {
    name: '忠孝新生站',
    color: LINE_COLOR.blue,
    lat: 25.041790695334313,
    lng: 121.53285368974313
  },
  {
    name: '忠孝復興站',
    color: LINE_COLOR.blue,
    lat: 25.041623000143456,
    lng: 121.54378372972849
  },
  {
    name: '忠孝敦化站',
    color: LINE_COLOR.blue,
    lat: 25.041352970235227,
    lng: 121.55049366310132
  },
  {
    name: '國父紀念館站',
    color: LINE_COLOR.blue,
    lat: 25.041356896347267,
    lng: 121.55750199285644
  },
  {
    name: '市政府站',
    color: LINE_COLOR.blue,
    lat: 25.04111034163598,
    lng: 121.56631790804016
  },
  {
    name: '永春站',
    color: LINE_COLOR.blue,
    lat: 25.04083915551391,
    lng: 121.57603393151987
  },
  {
    name: '後山埤站',
    color: LINE_COLOR.blue,
    lat: 25.04501120878063,
    lng: 121.58247963789337
  },
  {
    name: '昆陽站',
    color: LINE_COLOR.blue,
    lat: 25.050480145707503,
    lng: 121.59322661397658
  },
  {
    name: '捷運南港站',
    color: LINE_COLOR.blue,
    lat: 25.052082311193466,
    lng: 121.60704600392751
  },
  {
    name: '南港展覽館站',
    color: LINE_COLOR.blue,
    lat: 25.05530708945024,
    lng: 121.6179144673126
  },
];
// 文湖線
const brownStations: StationsVO[] = [
  {
    name: '南港展覽館站',
    color: LINE_COLOR.brown,
    lat: 25.05530708945024,
    lng: 121.6179144673126
  },
  {
    name: '南港軟體園區站',
    color: LINE_COLOR.brown,
    lat: 25.060073670608357,
    lng: 121.61591739313968
  },
  {
    name: '東湖站',
    color: LINE_COLOR.brown,
    lat: 25.067401492334998,
    lng: 121.6115108709121
  },
  {
    name: '葫洲站',
    color: LINE_COLOR.brown,
    lat: 25.07261248761594,
    lng: 121.60738852823839
  },
  {
    name: '大湖公園站',
    color: LINE_COLOR.brown,
    lat: 25.08379506285194,
    lng: 121.60219188308744
  },
  {
    name: '內湖站',
    color: LINE_COLOR.brown,
    lat: 25.083551227323795,
    lng: 121.59424082018384
  },
  {
    name: '文德站',
    color: LINE_COLOR.brown,
    lat: 25.07855121454845,
    lng: 121.58494856486035
  },
  {
    name: '港墘站',
    color: LINE_COLOR.brown,
    lat: 25.080044055011577,
    lng: 121.57520455892721
  },
  {
    name: '西湖站',
    color: LINE_COLOR.brown,
    lat: 25.082155417580587,
    lng: 121.56724759618534
  },
  {
    name: '劍南路站',
    color: LINE_COLOR.brown,
    lat: 25.084858175693398,
    lng: 121.55559754411685
  },
  {
    name: '大直站',
    color: LINE_COLOR.brown,
    lat: 25.079883405763322,
    lng: 121.54715652050903
  },
  {
    name: '松山機場站',
    color: LINE_COLOR.brown,
    lat: 25.063375923256277,
    lng: 121.55174292533957
  },
  {
    name: '中山國中站',
    color: LINE_COLOR.brown,
    lat: 25.060777518015833,
    lng: 121.54419960950904
  },
  {
    name: '南京復興站',
    color: LINE_COLOR.brown,
    lat: 25.05237462140356,
    lng: 121.54407331333948
  },
  {
    name: '忠孝復興站',
    color: LINE_COLOR.brown,
    lat: 25.041623000143456,
    lng: 121.54378372972849
  },
  {
    name: '大安站',
    color: LINE_COLOR.brown,
    lat: 25.03299167697042,
    lng: 121.54358989283449
  },
  {
    name: '科技大樓站',
    color: LINE_COLOR.brown,
    lat: 25.026071994136036,
    lng: 121.54346349352166
  },
  {
    name: '六張犁站',
    color: LINE_COLOR.brown,
    lat: 25.023804780255507,
    lng: 121.55316116726371
  },
  {
    name: '麟光站',
    color: LINE_COLOR.brown,
    lat: 25.018506772667102,
    lng: 121.55882301765116
  },
  {
    name: '辛亥站',
    color: LINE_COLOR.brown,
    lat: 25.00537970170173,
    lng: 121.55696151286946
  },
  {
    name: '萬芳醫院站',
    color: LINE_COLOR.brown,
    lat: 24.999403769627495,
    lng: 121.558047788913
  },
  {
    name: '萬芳社區站',
    color: LINE_COLOR.brown,
    lat: 24.998574571279207,
    lng: 121.56809664560654
  },
  {
    name: '木柵站',
    color: LINE_COLOR.brown,
    lat: 24.998241861655252,
    lng: 121.57314415046162
  },
  {
    name: '動物園站',
    color: LINE_COLOR.brown,
    lat: 24.998267314843226,
    lng: 121.57951819641028
  }
];
// 松山新店線
const greenStations: StationsVO[] = [
  {
    name: '松山站',
    color: LINE_COLOR.green,
    lat: 25.050070626933447,
    lng: 121.57771548795866
  },
  {
    name: '南京三民站',
    color: LINE_COLOR.green,
    lat: 25.051430185388046,
    lng: 121.56385931023358
  },
  {
    name: '台北小巨蛋站',
    color: LINE_COLOR.green,
    lat: 25.051669082652975,
    lng: 121.55187891493588
  },
  {
    name: '松江南京站',
    color: LINE_COLOR.green,
    lat: 25.051959754324727,
    lng: 121.53317135476985
  },
  {
    name: '中山站',
    color: LINE_COLOR.green,
    lat: 25.05268358144549,
    lng: 121.52039310897216
  },
  {
    name: '北門站',
    color: LINE_COLOR.green,
    lat: 25.049285797014907,
    lng: 121.51027844152573
  },
  {
    name: '西門站',
    color: LINE_COLOR.green,
    lat: 25.042188250376697,
    lng: 121.50829929059658
  },
  {
    name: '小南門站',
    color: LINE_COLOR.green,
    lat: 25.035534474895435,
    lng: 121.51119269168586
  },
  {
    name: '中正紀念堂站',
    color: LINE_COLOR.green,
    lat: 25.03264817980519,
    lng: 121.51831384123045
  },
  {
    name: '古亭站',
    color: LINE_COLOR.green,
    lat: 25.026549401808623,
    lng: 121.5228139291667
  },
  {
    name: '台電大樓站',
    color: LINE_COLOR.green,
    lat: 25.02060569430277,
    lng: 121.52835530467819
  },
  {
    name: '公館站',
    color: LINE_COLOR.green,
    lat: 25.014829783086107,
    lng: 121.53423135216025
  },
  {
    name: '萬隆站',
    color: LINE_COLOR.green,
    lat: 25.001693270534698,
    lng: 121.53908829235313
  },
  {
    name: '景美站',
    color: LINE_COLOR.green,
    lat: 24.992826112051784,
    lng: 121.54082844056188
  },
  {
    name: '大坪林站',
    color: LINE_COLOR.green,
    lat: 24.982895356832252,
    lng: 121.54135302077407
  },
  {
    name: '七張站',
    color: LINE_COLOR.green,
    lat: 24.975785490611194,
    lng: 121.542908256375
  },
  {
    name: '新店區公所站',
    color: LINE_COLOR.green,
    lat: 24.967855671616423,
    lng: 121.54152806648686
  },
  {
    name: '新店站',
    color: LINE_COLOR.green,
    lat: 24.958194805512985,
    lng: 121.53807183975766
  },
  {
    name: '新店站',
    color: LINE_COLOR.green,
    lat: 24.958194805512985,
    lng: 121.53807183975766
  }
];

const GetStations = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  if (req.query.line) {
    const lines = req.query.line as string;
    const colors = lines.split(',');
    let result: StationsVO[] = [];
    if (colors.indexOf(COLOR.blue) !== -1) {
      result = result.concat(blueStations);
    }
    if (colors.indexOf(COLOR.brown) !== -1) {
      result = result.concat(brownStations);
    }
    if (colors.indexOf(COLOR.green) !== -1) {
      result = result.concat(greenStations);
    }
    res.status(200).json({ data: result });
  } else {
    res.status(200).json({ data: blueStations.concat(brownStations) });
  }
}

export default GetStations;