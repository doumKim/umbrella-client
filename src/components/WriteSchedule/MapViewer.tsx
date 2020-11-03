import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import styled from 'styled-components/native';
import { Results } from '../../containers/WriteSchedule/MapViewerContainer';

const { width, height } = Dimensions.get('screen');

const StyledMapView = styled(MapView)`
  width: 100%;
  height: 50%;
`;
const Wrapper = styled.View`
  width: ${width}px;
  height: ${height}px;
  background: rgba(0, 0, 0, 0.65);
  align-items: center;
  justify-content: center;
  padding: 15px;
`;
const Button = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.palette.main};
  padding: 10px 30px;
  border-radius: 5px;
  background: ${props => props.theme.palette.mainBackground};
  margin-right: 10px;
  margin-left: 10px;
`;
const Absolute = styled.View`
  position: absolute;
  top: 25%;
  z-index: 100;
  width: 70%;
`;
const SearchBox = styled.View`
  height: 40px;
  background: #f4f4f4;
  align-items: center;
  padding-left: 15px;
  flex-direction: row;
`;
const StyledTextInput = styled.TextInput`
  min-width: 80%;
`;
const SearchResult = styled.ScrollView`
  width: 100%;
  background: ${props => props.theme.palette.mainBackground};
  padding: 0 10px;
  border-radius: 5px;
  max-height: 40%;
`;
const TextWrapper = styled.View`
  margin: 5px 0;
`;
const PlaceName = styled.Text`
  color: ${props => props.theme.palette.main};
`;
const AddressName = styled.Text`
  color: ${props => props.theme.palette.sub};
  font-size: 13px;
`;

type Props = {
  results: Results[];
  closeMapView(): void;
  location: Region;
  isLoading: boolean;
  keyword: string;
  errorMsg: string;
  onChangeText: (text: string) => void;
  onSubmit(): void;
  handleMapRegion(object: Region): void;
  closeSearch(): void;
  show: boolean;
  changeDisplayLocation: (
    placeName: string,
    latitude: string,
    longitude: string
  ) => void;
};

const MapViewer: React.FC<Props> = ({
  results,
  closeMapView,
  location,
  show,
  closeSearch,
  isLoading,
  keyword,
  errorMsg,
  onChangeText,
  onSubmit,
  handleMapRegion,
  changeDisplayLocation,
}: Props) => {
  const handleKeyword = (result: Results) => {
    handleMapRegion({
      latitude: Number(result.y),
      longitude: Number(result.x),
      latitudeDelta: 0.02,
      longitudeDelta: 0.03,
    });
    changeDisplayLocation(result.place_name, result.y, result.x);
    closeSearch();
  };

  const handleClickCancle = () => {
    changeDisplayLocation('', '', '');
    closeMapView();
  };
  return isLoading ? (
    <Wrapper>
      <ActivityIndicator color="white" size="small" />
    </Wrapper>
  ) : errorMsg ? (
    <Wrapper>
      <Text
        style={{
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 3,
          color: 'red',
          marginBottom: 5,
        }}
      >
        {errorMsg}
      </Text>
      <TouchableOpacity onPress={closeMapView}>
        <Text style={{ backgroundColor: 'white', padding: 5, borderRadius: 3 }}>
          닫기
        </Text>
      </TouchableOpacity>
    </Wrapper>
  ) : (
    <Wrapper>
      <Absolute>
        <SearchBox style={styles.buttonContainer}>
          <Image
            source={require('../../../assets/icon/search-black.png')}
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
          <StyledTextInput
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
            value={keyword}
            placeholder="장소 검색"
            placeholderTextColor="#707070"
          />
        </SearchBox>
        {results && show && (
          <SearchResult>
            {results.map(result => (
              <TouchableOpacity
                key={result.id}
                onPress={() => {
                  handleKeyword(result);
                  onChangeText(result.place_name);
                }}
              >
                <TextWrapper>
                  <PlaceName>{result.place_name}</PlaceName>
                  <AddressName>{result.address_name}</AddressName>
                </TextWrapper>
              </TouchableOpacity>
            ))}
          </SearchResult>
        )}
      </Absolute>
      {location && (
        <StyledMapView
          region={location}
          showsMyLocationButton={true}
          onRegionChange={handleMapRegion}
          showsUserLocation={true}
          zoomEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor={'#ffe05d'}
          />
        </StyledMapView>
      )}
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TouchableOpacity onPress={handleClickCancle}>
          <Button>취소</Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeMapView}>
          <Button>적용</Button>
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
};

export default MapViewer;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 6,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 9,
  },
});
