import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {dummyData} from '../contants';
const MapScreen = ({navigation}) => {
  const mapView = useRef();
  const [region, setRegion] = useState(null);
  const [toLoc, setToLoc] = useState(null);
  const [fromLoc, setFromLoc] = useState(null);
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    let initialRegion = {
      latitude: 1.5496614931250608,
      longitude: 110.36381866919922,
      latiudeDelta: 0.02,
      lonhitudeDelta: 0.02,
    };
    let destination = {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
    };
    setToLoc(destination);
    setFromLoc(dummyData.CARD_TYPES.fromLocs[1]);
    setRegion(initialRegion);
  }, []);
  function renderMap() {
    return (
      <MapView
        ref={mapView}
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}></MapView>
    );
  }
  return <View style={{flex: 1}}>{renderMap()}</View>;
};

export default MapScreen;

const styles = StyleSheet.create({});
