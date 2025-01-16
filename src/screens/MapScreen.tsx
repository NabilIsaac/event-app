import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import { Card, Text } from 'react-native-paper';
import { Event } from '../types';
import { TabParamList, RootStackParamList } from '../navigation/AppNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type MapScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Map'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: MapScreenNavigationProp;
};

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description: 'Join us for a day of amazing music and fun!',
    date: new Date('2024-07-15'),
    location: 'Central Park',
    price: 'Free',
    category: 'Music',
    imageUrl: 'https://picsum.photos/700',
    coordinate: {
      latitude: 40.785091,
      longitude: -73.968285,
    },
  },
  // Add more mock events here
];

const INITIAL_REGION: Region = {
  latitude: 40.785091,
  longitude: -73.968285,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
      >
        {MOCK_EVENTS.map((event) => (
          <Marker
            key={event.id}
            coordinate={event.coordinate!}
            pinColor="#6200ee"
          >
            <Callout
              onPress={() => navigation.navigate('EventDetails', { event })}
            >
              <Card style={styles.callout}>
                <Card.Content>
                  <Text variant="titleMedium">{event.title}</Text>
                  <Text variant="bodySmall">{event.location}</Text>
                </Card.Content>
              </Card>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  callout: {
    width: 200,
  },
});

export default MapScreen;
