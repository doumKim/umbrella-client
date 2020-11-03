import React, { useEffect, useState } from 'react';
import MapViewer from '../../components/WriteSchedule/MapViewer';
import * as Location from 'expo-location';
import axios from 'axios';
import { Region } from 'react-native-maps';

const KAKAO_URL =
  'https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=15&sort=accuracy&query=';

type Props = {
  closeMapView(): void;
  changeDisplayLocation: (
    placeName: string,
    latitude: string,
    longitude: string
  ) => void;
};

export type Results = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

const MapViewerContainer: React.FC<Props> = ({
  closeMapView,
  changeDisplayLocation,
}: Props) => {
  const [location, setLocation] = useState({
    latitude: 37.566,
    longitude: 126.9784,
    latitudeDelta: 0.02,
    longitudeDelta: 0.03,
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([] as Results[]);
  const [show, setShow] = useState(false);

  const onChangeText = (text: string) => {
    setKeyword(text);
  };
  //현재 위치값 받아오기
  useEffect(() => {
    (async () => {
      try {
        await Location.requestPermissionsAsync();
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.03,
        });
        setIsLoading(false);
      } catch (e) {
        setErrorMsg('위치 정보를 가져오는데 실패했습니다.');
        setIsLoading(false);
      }
      return () => {
        setIsLoading(false);
      };
    })();
  }, []);
  // 맵 검색
  const search = () => {
    if (keyword === '') return;
    axios
      .get(`${KAKAO_URL}${keyword}`, {
        headers: { Authorization: 'KakaoAK c28005a8bf3bb9cabfab6056422a1d9a' },
      })
      .then(response => {
        if (response.data) {
          setResults(response.data.documents);
          setShow(true);
        } else {
          console.log('실패');
        }
      });
  };

  const handleMapRegion = (mapRegion: Region) => {
    setLocation(mapRegion);
  };
  const closeSearch = () => {
    setShow(false);
  };
  return (
    <MapViewer
      results={results}
      closeMapView={closeMapView}
      show={show}
      closeSearch={closeSearch}
      location={location}
      isLoading={isLoading}
      keyword={keyword}
      errorMsg={errorMsg}
      onChangeText={onChangeText}
      onSubmit={search}
      handleMapRegion={handleMapRegion}
      changeDisplayLocation={changeDisplayLocation}
    />
  );
};

export default MapViewerContainer;
