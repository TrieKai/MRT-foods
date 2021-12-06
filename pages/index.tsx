import React, { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import GoogleMapReact from 'google-map-react'
import FilterMap from 'components/filterMap-component'
import Modal from 'components/modal-component'
import Button from 'components/button-component'
import RadioButton from 'components/radioButton-component'
import CardList from 'components/cardList-component'
import RatingComponent from 'components/rating-component'
import { GET } from 'utils/request'
import { Shuffle } from 'utils/common'
import { ReactComponent as PinIcon } from 'assets/icon/pin.svg'
import styled from 'styled-components'

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
  margin-top: 30px;
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
  const [step, setStep] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)
  const disable = useRef<boolean>(false) // Disable for click draw btn
  const [lines, setLines] = useState<LineVO[]>([])
  const stationsData = useRef<StationsVO[]>([])
  const [chosenStation, setChosenStation] = useState<StationsVO>()
  const [marker, setMarker] = useState<Marker[]>([])
  const [foodType, setFoodType] = useState<FoodType[]>([])
  const [selectedFoodType, setSelectedFoodType] = useState<string>(null)
  const [placeList, setPlaceList] = useState<Place[]>([])

  const step2 = useCallback(async (): Promise<void> => {
    setStep(2)
    setSelectedFoodType(null)
    setPlaceList([])
    const resp: AxiosResponse<string[]> = await GET('api/getFoodType', null)
    setFoodType(
      resp.data.map(type => {
        return { name: type, checked: false }
      })
    )
  }, [])

  const step3 = useCallback(async () => {
    if (!selectedFoodType) return

    setStep(3)
    const resp: { data: Place[] } = await GET('api/getNearbyFoods', {
      lat: chosenStation.lat,
      lng: chosenStation.lng,
      type: selectedFoodType
    })
    setPlaceList(resp.data)
  }, [selectedFoodType, chosenStation])

  const draw = useCallback(() => {
    if (!mapLoaded || disable.current) return

    disable.current = true
    const shuffledData: StationsVO[] = Shuffle(stationsData.current)
    shuffledData.forEach((station, i, _self) => {
      setTimeout(() => {
        setMarker([
          {
            position: { lat: station.lat, lng: station.lng },
            name: station.name,
            color: station.color
          }
        ])

        if (i === _self.length - 1) {
          setStep(1)
          setShowModal(true)
          setChosenStation(shuffledData[_self.length - 1])
          disable.current = false
        }
      }, 50 * i)
    })
  }, [mapLoaded])

  const reDraw = useCallback((): void => {
    setShowModal(false)
    setStep(0)
    draw()
  }, [draw])

  const onCloseModal = useCallback(() => {
    setShowModal(false)
    setSelectedFoodType(null)
    setStep(0)
  }, [])

  const onLoaded = useCallback(() => setMapLoaded(true), [])

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
      setMarker([])
      stationsData.current.forEach(station => {
        setMarker(marker => [
          ...marker,
          {
            position: { lat: station.lat, lng: station.lng },
            name: station.name,
            color: station.color
          }
        ])
      })
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
        yesIWantToUseGoogleMapApiInternals
      >
        {marker.map((marker, i) => {
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
      {mapLoaded && <DrawButton onClick={draw}>隨機選擇捷運站</DrawButton>}
      <Modal show={showModal} onClose={onCloseModal}>
        {step === 1 && (
          <>
            <StepTitle>
              恭喜骰到<Bold>{chosenStation?.name}</Bold>!
            </StepTitle>
            <BtnBox>
              <Button type='secondary' onClick={reDraw}>
                重新骰
              </Button>
              <Button type='primary' onClick={step2}>
                下一步
              </Button>
            </BtnBox>
          </>
        )}
        {step === 2 && (
          <>
            <StepTitle>選擇一個想吃的種類吧!</StepTitle>
            <StyledRadioBox>
              <RadioButton
                name={'food'}
                data={foodType.map(item => {
                  return { text: item.name }
                })}
                selectedData={selectedFoodType}
                onChange={(type: string) => setSelectedFoodType(type)}
              />
            </StyledRadioBox>
            <BtnBox>
              <Button type='secondary' onClick={reDraw}>
                重新骰
              </Button>
              <Button
                type='primary'
                disable={!selectedFoodType}
                onClick={step3}
              >
                GO!
              </Button>
            </BtnBox>
          </>
        )}
        {step === 3 && (
          <>
            <CardListWrapper>
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
              <BtnBox>
                <Button type='secondary' onClick={step2}>
                  返回
                </Button>
                <Button type='primary' onClick={reDraw}>
                  重新骰
                </Button>
              </BtnBox>
            </CardListWrapper>
          </>
        )}
      </Modal>
    </>
  )
}

export default Home
