import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styled from "styled-components";
import { Loader } from '@googlemaps/js-api-loader';
import { GET } from 'utils/request';
import { Shuffle } from 'utils/common';
import Modal from 'components/modal';

import { StationsVO } from 'utils/interface/common'

const Map = styled.div`
  height: 100%;
`;

const StyledStation = styled.span`
  margin: 0 0.5rem;
  font-weight: bold;
`;

const StyledModalContent = styled.div`
  font-size: 2rem;
`;

const StyledBtnBox = styled.div`
  margin-top: 30px;
`;

const StyledPrevBtn = styled.a`
  margin: 0 .5rem;
  padding: 0px 2rem;
  display: inline-block;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 7px;
  color: rgb(0, 112, 243);
  transition: background 0.2s ease 0s, color 0.2s ease 0s, box-shadow 0.2s ease 0s;
  cursor: pointer;
  &:hover {
    color: rgb(0, 112, 243);
    background: rgba(0, 118, 255, 0.1);
  }
`;

const StyledNextBtn = styled.a`
  margin: 0 .5rem;
  padding: 0px 2rem;
  display: inline-block;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 7px;
  color: white;
  background: rgb(0, 112, 243);
  box-shadow: rgb(0 118 255 / 39%) 0px 4px 14px 0px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 118, 255, 0.9);
    box-shadow: rgb(0 118 255 / 23%) 0px 6px 20px;
  }
`;

export const Home = () => {
  const googlemap = useRef(null);
  const markers = useRef<google.maps.Marker[]>([]);
  const maps = useRef<google.maps.Map>(null);
  const stations = useRef<StationsVO[]>([]);
  const chosenStations = useRef<StationsVO>(null);
  const [showModal, setShowModal] = useState(false);
  const drawStatus = useRef<boolean>(false); // 抽籤的狀態

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
      markers.current.push(marker);
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
    controlUI.addEventListener("click", draw);
  }

  const draw = () => {
    if (drawStatus.current) return;
    drawStatus.current = true;
    console.log(markers.current)
    const shuffledArray: StationsVO[] = Shuffle(stations.current);
    shuffledArray.forEach((station, i) => {
      new Promise((res, rej) => {
        setTimeout(() => {
          markers.current.forEach(marker => marker.setMap(null)); // clear markers
          markers.current = [];
          const map = maps.current;
          const marker = new window.google.maps.Marker({
            icon: `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${station.color}`,
            position: station,
            map,
            title: station.name,
          });
          markers.current.push(marker);
          res(null);
        }, 100 * i);
      }).then(() => {
        if (i === shuffledArray.length - 1) {
          drawStatus.current = false;
          chosenStations.current = shuffledArray[shuffledArray.length - 1];
          setShowModal(true);
        }
      });
    });
  }

  const nearbySearch = async () => {
    console.log('nearbySearch')
    const resp = await GET('api/getNearbyFoods', { 'lat': chosenStations.current.lat, 'lng': chosenStations.current.lng, 'type': '拉麵' });
  }

  return <>
    <Head>
      <title>台北捷運美食地圖</title>
    </Head>
    <Map id="map" ref={googlemap}></Map>
    <Modal onClose={() => setShowModal(false)} show={showModal}>
      <StyledModalContent>恭喜骰到<StyledStation>{chosenStations.current?.name}</StyledStation>！</StyledModalContent>
      <StyledBtnBox>
        <StyledPrevBtn onClick={() => {
          setShowModal(false);
          draw();
        }}>重新骰</StyledPrevBtn>
        <StyledNextBtn onClick={nearbySearch}>下一步</StyledNextBtn>
      </StyledBtnBox>
    </Modal>
  </>;
};

export default Home;
