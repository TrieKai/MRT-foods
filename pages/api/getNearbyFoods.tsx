import { NextApiRequest, NextApiResponse } from "next";
import { FOOD_TYPE } from 'utils/constants';
import { Client, Language } from "@googlemaps/google-maps-services-js";
import { PlacesNearbyRanking } from "@googlemaps/google-maps-services-js/dist/places/placesnearby";

const GetNearbyFoods = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  const types = Object.keys(FOOD_TYPE).map(key => FOOD_TYPE[key]);
  const lat = req.query.lat as string;
  const lng = req.query.lng as string;
  const keyword = req.query.type as string;
  const client = new Client({});

  let results = [];
  const nearbySearch = async (pageToken?: string) => {
    return new Promise((resolve, reject) => {
      client.placesNearby({
        params: {
          location: `${lat},${lng}`,
          key: 'AIzaSyC8eKsb7VZk8z3O9Rxvpmh0Al1zJ_zPHL8',
          keyword: keyword,
          radius: 1000, // 1km
          rankby: PlacesNearbyRanking.prominence,
          language: Language.zh_TW,
          pagetoken: pageToken ?? null,
        },
      }).then(r => {
        results = results.concat(r.data.results);
        if (r.data.next_page_token) {
          setTimeout(() => {
            nearbySearch(r.data.next_page_token);
          }, 2000); // 延遲兩秒以免拿不到資料
        } else {
          res.status(200).json({ data: results });
          resolve(null);
        }
      }).catch(e => {
        console.log(e);
        res.status(500).json({ error: e });
        reject();
      });
    });
  }

  if (types.indexOf(req.query.type as string) !== -1) {
    await nearbySearch();
  } else {
    res.status(500).json({ error: '參數錯誤' });
    return;
  }
}

export default GetNearbyFoods;