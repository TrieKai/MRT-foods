import { useEffect, useRef } from 'react';
import Head from 'next/head';
import styled from "styled-components";
import { Loader } from '@googlemaps/js-api-loader';
import { GET } from 'utils/request';
import { Shuffle } from 'utils/common';

import { StationsVO } from 'utils/interface/common'

const Map = styled.div`
  height: 100%;
`;

export const Home = () => {
  const googlemap = useRef(null);
  let markers: google.maps.Marker[] = [];
  const maps = useRef<google.maps.Map>(null);
  const stations = useRef<StationsVO[]>([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyA7dLgMg8KIMXEtN4D19b4t2-XDcy7-6Fs',
      version: 'weekly',
    });
    loader.load().then(() => {
      maps.current = new window.google.maps.Map(googlemap.current, {
        center: { lat: 25.0477703, lng: 121.5168079 }, // 台北車站座標
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
      });

      getData(); // Get stations info

      // Customer button on the top center
      const centerControlDiv = document.createElement("div");
      CenterControl(centerControlDiv);
      maps.current.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    });
  }, []);

  const getData = async () => {
    const resp = await GET('api/getStations', { 'line': 'blue' });
    // 過濾掉重複的捷運站
    stations.current = resp.data.filter((station: StationsVO, i: number, self: StationsVO[]) => {
      return i === self.findIndex(item => item.name === station.name);
    });
    stations.current.map(station => {
      const map = maps.current;
      const marker = new window.google.maps.Marker({
        icon: `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${station.color}`,
        position: station,
        map,
        title: station.name,
      });
      markers.push(marker);
    })
  }

  const CenterControl = (controlDiv: Element) => {
    // Set CSS for the control border.
    const controlUI = document.createElement("div");
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginTop = "8px";
    controlUI.style.marginBottom = "22px";
    controlUI.style.textAlign = "center";
    controlUI.title = "Click to random";
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    const controlText = document.createElement("div");
    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "16px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "5px";
    controlText.style.paddingRight = "5px";
    controlText.innerHTML = "隨機選擇捷運站";
    controlUI.appendChild(controlText);

    // Setup the click event listeners
    controlUI.addEventListener("click", () => {
      draw();
    });
  }

  const draw = () => {
    console.log(markers)
    const shuffledArray: StationsVO[] = Shuffle(stations.current);
    shuffledArray.forEach((station, i) => {
      new Promise((res, rej) => {
        setTimeout(() => {
          markers.forEach(marker => marker.setMap(null)); // clear markers
          markers = [];
          const map = maps.current;
          const marker = new window.google.maps.Marker({
            icon: `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${station.color}`,
            position: station,
            map,
            title: station.name,
          });
          markers.push(marker);
          res(null);
        }, 100 * i);
      }).then(async () => {
        if (i === shuffledArray.length - 1) {
          const chosenStation = shuffledArray[shuffledArray.length - 1];
          const resp = await GET('api/getNearbyFoods', { 'lat': chosenStation.lat, 'lng': chosenStation.lng, 'type': '拉麵' });
        }
      });
    });
  }

  return <>
    <Head>
      <title>台北捷運美食地圖</title>
    </Head>
    <Map id="map" ref={googlemap}></Map>
  </>;
};

export default Home;
