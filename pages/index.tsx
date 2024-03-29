import React, { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import { useMachine, useSelector } from '@xstate/react'
import { myMachine } from 'contexts/machine'
import FilterMap from 'components/filterMap'
import Modal from 'components/modal'
import Button from 'components/button'
import RadioButton from 'components/radioButton'
import CardList from 'components/cardList'
import RatingComponent from 'components/rating'
import Spinner from 'components/spinner'
import { GET } from 'utils/request'
import { Shuffle } from 'utils/common'
import { ReactComponent as PinIcon } from 'assets/icon/pin.svg'
import { GoogleMapLayerStyles } from 'assets/googleMapStyles'

import { AxiosResponse } from 'axios'
import { LineVO, StationsVO } from 'utils/interface/common'
import { Place } from '@googlemaps/google-maps-services-js'

const StepTitle = styled.div`
  text-align: center;
  font-size: 2rem;
`

const Bold = styled.span`
  margin: 0 0.5rem;
  font-weight: bold;
`

const BtnBox = styled.div`
  padding: 30px 0;
  text-align: center;
`

const DrawButton = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px;
  background-color: white;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  cursor: pointer;
`

const StyledRadioBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
`

const CardListWrapper = styled.div`
  width: 100%;
  height: inherit;
`

const PinContainer = styled.div<PinContainerStyles>`
  width: 24px;
  height: 24px;
  transform: translate(-50%, -100%);

  svg [data-class='cls-1'] {
    fill: #${({ color }) => color};
  }
`

interface PinContainerStyles extends google.maps.LatLngLiteral {
  color: string
}

interface Marker {
  position: google.maps.LatLngLiteral
  name: string
  color: string
}

interface FoodType {
  name: string
  checked: boolean
}

const Home = () => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)
  const disable = useRef<boolean>(false) // Disable for click draw btn
  const [lines, setLines] = useState<LineVO[]>([])
  const stationsData = useRef<StationsVO[]>([])
  const [chosenStation, setChosenStation] = useState<StationsVO>({
    name: '',
    color: '',
    lat: 0,
    lng: 0
  })
  const [markers, setMarkers] = useState<Marker[]>([])
  const [foodType, setFoodType] = useState<FoodType[]>([])
  const [placeList, setPlaceList] = useState<Place[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [{ context }, send, service] = useMachine(myMachine)

  const isIdle = useSelector(service, state => state.matches('idle'))
  const isRandom = useSelector(service, state => state.matches('random'))
  const isStep1 = useSelector(service, state => state.matches('step1'))
  const isStep2 = useSelector(service, state => state.matches('step2'))
  const isStep3 = useSelector(service, state => state.matches('step3'))

  const step3 = useCallback(async () => {
    setLoading(true)
    const resp: { data: Place[] } = await GET('api/getNearbyFoods', {
      lat: chosenStation.lat,
      lng: chosenStation.lng,
      type: context.selectedFoodType
    })
    setLoading(false)
    setPlaceList(resp.data ?? [])
  }, [chosenStation.lat, chosenStation.lng, context.selectedFoodType])

  const step2 = useCallback(async (): Promise<void> => {
    setPlaceList([])
    const resp: AxiosResponse<string[]> = await GET('api/getFoodType', null)
    setFoodType(
      resp.data.map(type => {
        return { name: type, checked: false }
      })
    )
  }, [])

  const draw = useCallback(() => {
    if (!mapLoaded || disable.current) return

    disable.current = true
    const shuffledData: StationsVO[] = Shuffle(stationsData.current)
    shuffledData.forEach((station, i, _self) => {
      setTimeout(() => {
        setMarkers([
          {
            position: { lat: station.lat, lng: station.lng },
            name: station.name,
            color: station.color
          }
        ])

        if (i === _self.length - 1) {
          send('FINISH')
          setChosenStation(shuffledData[_self.length - 1])
          disable.current = false
        }
      }, 50 * i)
    })
  }, [mapLoaded, send])

  const onCloseModal = useCallback(() => send('CLOSE'), [send])

  const onLoaded = useCallback(() => setMapLoaded(true), [])

  useEffect(() => {
    if (isStep3) step3()
  }, [isStep3, step3])

  useEffect(() => {
    if (isStep2) step2()
  }, [isStep2, step2])

  useEffect(() => {
    if (isRandom) draw()
  }, [draw, isRandom])

  useEffect(() => {
    const fetchStationsInfo = async () => {
      const linesString = lines
        .filter(line => line.checked)
        .map(line => line.key)
        .toString()
      const { data: stations }: AxiosResponse<StationsVO[]> = await GET(
        'api/getStations',
        {
          line: linesString
        }
      )
      // 過濾掉重複的捷運站
      stationsData.current = stations.filter((station, i, _self) => {
        return i === _self.findIndex(item => item.name === station.name)
      })
      setMarkers([])
      const markerData = stationsData.current.map(station => {
        return {
          position: { lat: station.lat, lng: station.lng },
          name: station.name,
          color: station.color
        }
      })
      setMarkers(markerData)
    }

    if (mapLoaded) fetchStationsInfo()
  }, [mapLoaded, lines])

  useEffect(() => {
    const fetchStationsName = async () => {
      const { data: lines }: AxiosResponse<LineVO[]> = await GET(
        'api/getStationName',
        null
      )
      setLines(
        lines.map(line => {
          return { ...line, checked: true }
        })
      )
    }

    fetchStationsName()
  }, [])

  return (
    <>
      <Head>
        <title>台北捷運美食地圖</title>
      </Head>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_MAP
        }}
        defaultCenter={{ lat: 25.0477703, lng: 121.5168079 }}
        defaultZoom={12}
        onGoogleApiLoaded={onLoaded}
        options={{ styles: GoogleMapLayerStyles }}
        yesIWantToUseGoogleMapApiInternals
      >
        {markers.map((marker, i) => {
          return (
            <PinContainer
              lat={marker.position.lat}
              lng={marker.position.lng}
              color={marker.color}
              title={marker.name}
              key={i}
            >
              <PinIcon />
            </PinContainer>
          )
        })}
      </GoogleMapReact>
      <FilterMap lines={lines} setLines={setLines} />
      {mapLoaded && (
        <DrawButton onClick={() => send('RANDOM')}>隨機選擇捷運站</DrawButton>
      )}
      {!(isIdle || isRandom) && (
        <Modal show={context.showModal} onClose={onCloseModal}>
          {isStep1 && (
            <>
              <StepTitle>
                恭喜骰到<Bold>{chosenStation?.name}</Bold>!
              </StepTitle>
              <BtnBox>
                <Button type='secondary' onClick={() => send('REDO')}>
                  重新骰
                </Button>
                <Button type='primary' onClick={() => send('NEXT')}>
                  下一步
                </Button>
              </BtnBox>
            </>
          )}
          {isStep2 && (
            <>
              <StepTitle>選擇一個想吃的種類吧!</StepTitle>
              <StyledRadioBox>
                <RadioButton
                  name={'food'}
                  data={foodType.map(item => {
                    return { text: item.name }
                  })}
                  selectedData={context.selectedFoodType}
                  onChange={(type: string) =>
                    send('SET_SELECTED_FOOD_TYPE', { selectedFoodType: type })
                  }
                />
              </StyledRadioBox>
              <BtnBox>
                <Button type='secondary' onClick={() => send('REDO')}>
                  重新骰
                </Button>
                <Button
                  type='primary'
                  disable={!context.selectedFoodType}
                  onClick={() => send('NEXT')}
                >
                  GO!
                </Button>
              </BtnBox>
            </>
          )}
          {isStep3 && (
            <>
              {loading && <Spinner />}
              <CardListWrapper>
                <CardList
                  data={placeList.map(place => {
                    return {
                      list: (
                        <>
                          <b>{place.name}</b>
                          <RatingComponent
                            rating={place.rating}
                            ratingNum={place.user_ratings_total}
                          />
                          <div>{place.vicinity}</div>
                        </>
                      ),
                      link: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
                    }
                  })}
                />
                <BtnBox>
                  <Button type='secondary' onClick={() => send('BACK')}>
                    返回
                  </Button>
                  <Button type='primary' onClick={() => send('REDO')}>
                    重新骰
                  </Button>
                </BtnBox>
              </CardListWrapper>
            </>
          )}
        </Modal>
      )}
    </>
  )
}

export default Home
