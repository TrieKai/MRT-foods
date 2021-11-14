import { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { Loader } from '@googlemaps/js-api-loader'
import styled from 'styled-components'
import Modal from 'components/modal-component'
import CheckBox from 'components/checkbox-component'
import RadioBtn from 'components/radioButton-component'
import CardList from 'components/cardList-component'
import RatingComponent from 'components/rating-component'
import { Shuffle } from 'utils/common'
import { GET } from 'utils/request'

import { AxiosResponse } from 'axios'
import { Place } from '@googlemaps/google-maps-services-js'
import { StationsVO } from 'utils/interface/common'

const FilterMap = styled.button`
  position: fixed;
  top: 0px;
  left: 0px;
  margin: 10px;
  padding: 0px;
  width: 40px;
  height: 40px;
  background: none rgb(255, 255, 255);
  border: 0px;
  text-transform: none;
  appearance: none;
  user-select: none;
  border-radius: 2px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
`

const Map = styled.div`
  height: 100%;
`

const StyledStepTitle = styled.div`
  text-align: center;
  font-size: 2rem;
`

const StyledBold = styled.span`
  margin: 0 0.5rem;
  font-weight: bold;
`

const StyledRadioBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
`

const StyledBtnBox = styled.div`
  margin-top: 30px;
  text-align: center;
`

const StyledPrevBtn = styled.a`
  margin: 0 0.5rem;
  padding: 0px 2rem;
  display: inline-block;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 7px;
  color: rgb(0, 112, 243);
  transition: background 0.2s ease 0s, color 0.2s ease 0s,
    box-shadow 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    color: rgb(0, 112, 243);
    background: rgba(0, 118, 255, 0.1);
  }
`

const StyledNextBtn = styled.a<{ disable?: boolean }>`
  margin: 0 0.5rem;
  padding: 0px 2rem;
  display: inline-block;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 7px;
  color: white;
  background: rgb(0, 112, 243);
  box-shadow: rgb(0 118 255 / 39%) 0px 4px 14px 0px;
  cursor: ${({ disable }) => (disable ? 'not-allowed' : 'pointer')};

  &:hover {
    background: rgba(0, 118, 255, 0.9);
    box-shadow: rgb(0 118 255 / 23%) 0px 6px 20px;
  }
`

const StyledCardListWrapper = styled.div`
  height: inherit;
`

export const Home = () => {
  const googleMapRef = useRef<HTMLDivElement>(null)
  const markers = useRef<google.maps.Marker[]>([])
  const maps = useRef<google.maps.Map>(null)
  const [lines, setLines] = useState<
    { key: string; name: string; checked: boolean }[]
  >([])
  const stations = useRef<StationsVO[]>([])
  const chosenStations = useRef<StationsVO>(null)
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const disable = useRef<boolean>(false) // Disable for click draw btn
  const [step, setStep] = useState<number>(0)
  const [foodType, setFoodType] = useState<
    { name: string; checked: boolean }[]
  >([])
  const [selectedFoodType, setSelectedFoodType] = useState<string>(null)
  const [placeList, setPlaceList] = useState<Place[]>([])

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_MAP,
      version: 'weekly'
    })
    loader.load().then(() => {
      maps.current = new window.google.maps.Map(googleMapRef.current, {
        center: { lat: 25.0477703, lng: 121.5168079 }, // 台北車站座標
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false
      })

      getStationName() // Get all MRT lines

      // Customer button on the top center
      const centerControlDiv = document.createElement('div')
      CenterControl(centerControlDiv)
      maps.current.controls[google.maps.ControlPosition.TOP_CENTER].push(
        centerControlDiv
      )
    })
  }, [])

  const getStationName = useCallback(async (): Promise<void> => {
    const resp: AxiosResponse<{ key: string; name: string }[]> = await GET(
      'api/getStationName',
      null
    )
    setLines(
      resp.data.map(line => {
        return { ...line, checked: true }
      })
    )
    const allLines = resp.data.map(line => line.key).toString()
    getStationInfo(allLines) // Get stations info
  }, [])

  const getStationInfo = async (lines: string): Promise<void> => {
    markers.current.forEach(marker => marker.setMap(null)) // clear markers
    markers.current = []
    const resp: AxiosResponse<StationsVO[]> = await GET('api/getStations', {
      line: lines
    })
    // 過濾掉重複的捷運站
    stations.current = resp.data.filter(
      (station: StationsVO, i: number, self: StationsVO[]) => {
        return i === self.findIndex(item => item.name === station.name)
      }
    )
    stations.current.map(station => {
      const map = maps.current
      const marker = new window.google.maps.Marker({
        icon: `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${station.color}`,
        position: station,
        map,
        title: station.name
      })
      markers.current.push(marker)
    })
  }

  const CenterControl = (controlDiv: Element): void => {
    // Set CSS for the control border.
    const controlUI = document.createElement('div')
    controlUI.style.backgroundColor = '#fff'
    controlUI.style.border = '2px solid #fff'
    controlUI.style.borderRadius = '3px'
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
    controlUI.style.cursor = 'pointer'
    controlUI.style.marginTop = '8px'
    controlUI.style.marginBottom = '22px'
    controlUI.style.textAlign = 'center'
    controlUI.title = 'Click to random'
    controlDiv.appendChild(controlUI)

    // Set CSS for the control interior.
    const controlText = document.createElement('div')
    controlText.style.color = 'rgb(25,25,25)'
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif'
    controlText.style.fontSize = '16px'
    controlText.style.lineHeight = '38px'
    controlText.style.paddingLeft = '5px'
    controlText.style.paddingRight = '5px'
    controlText.innerHTML = '隨機選擇捷運站'
    controlUI.appendChild(controlText)

    // Setup the click event listeners
    controlUI.addEventListener('click', draw)
  }

  const draw = (): void => {
    if (disable.current) return
    disable.current = true
    setStep(1)
    const shuffledArray: StationsVO[] = Shuffle(stations.current)
    shuffledArray.forEach((station, i) => {
      new Promise((res, rej) => {
        setTimeout(() => {
          markers.current.forEach(marker => marker.setMap(null)) // clear markers
          markers.current = []
          const map = maps.current
          const marker = new window.google.maps.Marker({
            icon: `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${station.color}`,
            position: station,
            map,
            title: station.name
          })
          markers.current.push(marker)
          res(null)
        }, 60 * i)
      }).then(() => {
        if (i === shuffledArray.length - 1) {
          chosenStations.current = shuffledArray[shuffledArray.length - 1]
          setShowModal(true)
          disable.current = false
        }
      })
    })
  }

  const closeModal = useCallback((): void => {
    setShowModal(false)
    setSelectedFoodType(null)
    setStep(0)
  }, [])

  const reDraw = useCallback((): void => {
    closeModal()
    draw()
  }, [])

  const step2 = useCallback(async (): Promise<void> => {
    setStep(2)
    setSelectedFoodType(null)
    setPlaceList([])
    const resp: AxiosResponse<string[]> = await GET('api/getFoodType', null)
    console.log(resp.data)
    setFoodType(
      resp.data.map(type => {
        return { name: type, checked: false }
      })
    )
  }, [])

  const step3 = useCallback(async (): Promise<void> => {
    if (!selectedFoodType) return
    setStep(3)
    const resp: { data: Place[] } = await GET('api/getNearbyFoods', {
      lat: chosenStations.current.lat,
      lng: chosenStations.current.lng,
      type: selectedFoodType
    })
    console.log(resp.data)
    setPlaceList(resp.data)
  }, [selectedFoodType])

  return (
    <>
      <Head>
        <title>台北捷運美食地圖</title>
      </Head>
      <FilterMap onClick={() => setShowFilterModal(true)}>
        <svg viewBox='0 0 64 64' width='30' height='30'>
          <path
            d='M56 13v6a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h46a1 1 0 0 1 1 1zm-1 15H9a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h46a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm0 16H9a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h46a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z'
            fill='#808080'
          ></path>
        </svg>
      </FilterMap>
      <Modal
        onClose={() => {
          const selectedLines = lines
            .filter(line => line.checked)
            .map(line => line.key)
            .toString()
          getStationInfo(selectedLines)
          setShowFilterModal(false)
        }}
        show={showFilterModal}
      >
        <StyledStepTitle>台北捷運</StyledStepTitle>
        <CheckBox
          name={'line'}
          data={lines.map(line => {
            return { text: line.name, checked: line.checked }
          })}
          onChange={(line: string) => {
            const selectedLine = lines.find(item => item.name === line)
            selectedLine.checked = !selectedLine.checked
            setLines([...lines])
          }}
        />
      </Modal>
      <Map id='map' ref={googleMapRef} />
      <Modal onClose={closeModal} show={showModal}>
        {step === 1 && (
          <>
            <StyledStepTitle>
              恭喜骰到<StyledBold>{chosenStations.current?.name}</StyledBold>!
            </StyledStepTitle>
            <StyledBtnBox>
              <StyledPrevBtn onClick={reDraw}>重新骰</StyledPrevBtn>
              <StyledNextBtn onClick={step2}>下一步</StyledNextBtn>
            </StyledBtnBox>
          </>
        )}
        {step === 2 && (
          <>
            <StyledStepTitle>選擇一個想吃的種類吧!</StyledStepTitle>
            <StyledRadioBox>
              <RadioBtn
                name={'food'}
                data={foodType.map(item => {
                  return { text: item.name }
                })}
                selectedData={selectedFoodType}
                onChange={(type: string) => setSelectedFoodType(type)}
              />
            </StyledRadioBox>
            <StyledBtnBox>
              <StyledPrevBtn onClick={reDraw}>重新骰</StyledPrevBtn>
              <StyledNextBtn disable={!selectedFoodType} onClick={step3}>
                GO!
              </StyledNextBtn>
            </StyledBtnBox>
          </>
        )}
        {step === 3 && (
          <>
            <StyledCardListWrapper>
              <CardList
                list={placeList.map(place => (
                  <>
                    <b>{place.name}</b>
                    <RatingComponent
                      rating={place.rating}
                      ratingNum={place.user_ratings_total}
                    />
                    <div>{place.vicinity}</div>
                  </>
                ))}
                onClick={() => {}}
              />
              <StyledBtnBox>
                <StyledPrevBtn onClick={step2}>返回</StyledPrevBtn>
                <StyledPrevBtn onClick={reDraw}>重新骰</StyledPrevBtn>
              </StyledBtnBox>
            </StyledCardListWrapper>
          </>
        )}
      </Modal>
    </>
  )
}

export default Home
