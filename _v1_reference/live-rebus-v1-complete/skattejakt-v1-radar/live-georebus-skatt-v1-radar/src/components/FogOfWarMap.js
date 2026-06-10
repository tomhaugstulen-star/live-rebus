import React, { useMemo, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Circle, Marker, Polygon } from "react-native-maps";
import { theme } from "../utils/theme";
import {
  createCircleCoordinates,
  createOuterPolygonFromRegion,
  distanceMeters
} from "../utils/geo";

export default function FogOfWarMap({
  userPosition,
  treasurePoint,
  sightRadiusMeters = 60,
  treasureRadiusMeters = 35,
  lockedMap = true
}) {
  const [region, setRegion] = useState({
    latitude: userPosition.latitude,
    longitude: userPosition.longitude,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008
  });

  const fogOuterPolygon = useMemo(() => createOuterPolygonFromRegion(region, 2.4), [region]);
  const sightHole = useMemo(
    () => createCircleCoordinates(userPosition.latitude, userPosition.longitude, sightRadiusMeters, 56),
    [userPosition.latitude, userPosition.longitude, sightRadiusMeters]
  );

  const distanceToTreasure = distanceMeters(
    userPosition.latitude,
    userPosition.longitude,
    treasurePoint.latitude,
    treasurePoint.longitude
  );

  const isTreasureVisible = distanceToTreasure <= sightRadiusMeters + treasureRadiusMeters;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta
        }}
        onRegionChangeComplete={setRegion}
        scrollEnabled={!lockedMap}
        rotateEnabled={false}
        pitchEnabled={false}
        showsUserLocation
      >
        {isTreasureVisible && (
          <Circle
            center={treasurePoint}
            radius={treasureRadiusMeters}
            strokeColor="rgba(255, 107, 53, 0.95)"
            fillColor="rgba(245, 158, 11, 0.28)"
          />
        )}

        <Polygon
          coordinates={fogOuterPolygon}
          holes={[sightHole]}
          fillColor={theme.colors.fog}
          strokeColor="rgba(0,0,0,0)"
          strokeWidth={0}
        />

        <Circle
          center={{
            latitude: userPosition.latitude,
            longitude: userPosition.longitude
          }}
          radius={sightRadiusMeters}
          strokeColor="rgba(255, 107, 53, 0.55)"
          fillColor="rgba(255, 107, 53, 0.06)"
        />

        <Marker coordinate={userPosition} title="Deg" pinColor="blue" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
