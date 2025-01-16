import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, StatusBar } from 'react-native';
import { Searchbar, Text, Avatar, Card, TouchableRipple, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import { Event, City } from '../types';
import { TabParamList, RootStackParamList } from '../navigation/AppNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Discover'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Summer Rooftop Party',
    description: 'Join us for drinks and good vibes!',
    date: new Date('2024-07-15'),
    location: 'New York',
    organizer: 'Cloud Nine Events',
    organizerImage: 'https://picsum.photos/50',
    time: '8:00 PM',
    imageUrl: 'https://picsum.photos/700',
    price: '$30',
    category: 'Social'
  },
  {
    id: '2',
    title: 'After Work with Startup Founders - Network & Fun',
    description: 'Network with fellow startup founders',
    date: new Date(),
    location: 'New York',
    organizer: 'FunConnect',
    organizerImage: 'https://picsum.photos/51',
    time: '9:00 PM',
    imageUrl: 'https://picsum.photos/701',
    price: '$25',
    category: 'Networking'
  },
  {
    id: '3',
    title: 'World Pickleball Tour New York Challenger',
    description: 'Join the pickleball revolution!',
    date: new Date(),
    location: 'New York',
    organizer: 'World Pickleball Tour',
    organizerImage: 'https://picsum.photos/52',
    time: '9:00 AM',
    imageUrl: 'https://picsum.photos/702',
    price: '$20',
    category: 'Sports'
  },
  {
    id: '4',
    title: 'Summer Rooftop Party',
    description: 'Join us for drinks and good vibes!',
    date: new Date('2024-07-15'),
    location: 'New York',
    organizer: 'Cloud Nine Events',
    organizerImage: 'https://picsum.photos/50',
    time: '8:00 PM',
    imageUrl: 'https://picsum.photos/700',
    price: '$30',
    category: 'Social'
  },
  {
    id: '5',
    title: 'After Work with Startup Founders - Network & Fun',
    description: 'Network with fellow startup founders',
    date: new Date(),
    location: 'New York',
    organizer: 'FunConnect',
    organizerImage: 'https://picsum.photos/51',
    time: '9:00 PM',
    imageUrl: 'https://picsum.photos/701',
    price: '$25',
    category: 'Networking'
  },
  {
    id: '6',
    title: 'World Pickleball Tour New York Challenger',
    description: 'Join the pickleball revolution!',
    date: new Date(),
    location: 'New York',
    organizer: 'World Pickleball Tour',
    organizerImage: 'https://picsum.photos/52',
    time: '9:00 AM',
    imageUrl: 'https://picsum.photos/702',
    price: '$20',
    category: 'Sports'
  },
];

const CITIES: City[] = [
  {
    id: '1',
    name: 'New York',
    image: 'https://picsum.photos/700/400?random=1'
  },
  {
    id: '2',
    name: 'Los Angeles',
    image: 'https://picsum.photos/700/400?random=2'
  },
  {
    id: '3',
    name: 'Miami',
    image: 'https://picsum.photos/700/400?random=3'
  },
  {
    id: '4',
    name: 'Chicago',
    image: 'https://picsum.photos/700/400?random=4'
  }
];

const chunk = (arr: Event[] | any[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, (i + 1) * size));
};

const EventCard = ({ event, onPress }: { event: Event; onPress: () => void }) => {
  const theme = useTheme();
  
  useEffect(() => {
    StatusBar.setBarStyle(theme.dark ? 'light-content' : 'dark-content');
  }, [theme.dark]);

  return (
    <TouchableRipple onPress={onPress} style={[styles.eventCard]}>
      <View style={styles.eventCardContent}>
        <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />
        <View style={styles.eventInfo}>
          <View style={styles.organizerInfo}>
            <Image
              source={{ uri: event.organizerImage }}
              style={styles.organizerAvatar}
            />
            <Text variant="bodySmall" style={[styles.organizerName, { color: theme.colors.onBackground }]}>{event.organizer}</Text>
          </View>
          <Text variant="titleMedium" style={[styles.eventTitle, { color: theme.colors.onBackground }]}>{event.title.slice(0, 20)}</Text>
          <Text variant="bodySmall" style={[styles.eventTime, { color: theme.colors.onBackground }]}>{event.date.toDateString()}</Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

const CityCard = ({ city, onPress }: { city: City; onPress: () => void }) => {
  const theme = useTheme();
  
  useEffect(() => {
    StatusBar.setBarStyle(theme.dark ? 'light-content' : 'dark-content');
  }, [theme.dark]);

  return (
    <TouchableRipple onPress={onPress} style={styles.cityCard}>
      <View>
        <Image source={{ uri: city.image }} style={styles.cityImage} />
        <View style={styles.cityOverlay}>
          <Text variant="titleLarge" style={[styles.cityName, { color: theme.colors.onBackground }]}>{city.name}</Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  useEffect(() => {
    StatusBar.setBarStyle(theme.dark ? 'light-content' : 'dark-content');
  }, [theme.dark]);
  return (
    <View style={[styles.container, {
      paddingTop: insets.top,
      backgroundColor: theme.colors.background
    }]}>
      <View style={styles.header}>
        <Avatar.Image size={50} source={{ uri: 'https://picsum.photos/100' }} />
        <Text variant="headlineSmall" style={[styles.discover, { color: theme.colors.onBackground }]}>Discover</Text>
      </View>
      <View style={styles.locationContainer}>
        <Text variant="titleMedium" style={[styles.location, { color: theme.colors.onBackground }]}>
          New York
        </Text>
        <View style={styles.popularEvents}>
          <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>Popular Events</Text>
          <Text variant="bodyMedium" style={[styles.viewAll, { color: theme.colors.onBackground }]}> View all ›</Text>
        </View>
      </View>
      <ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventsContainer}
        >
          {chunk(MOCK_EVENTS, 3).map((eventGroup, groupIndex) => (
            <View key={groupIndex} style={styles.eventColumn}>
              {eventGroup.map((event: Event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => navigation.navigate('EventDetails', { event })}
                />
              ))}
            </View>
          ))}
        </ScrollView>

        <View style={styles.citiesContainer}>
          <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Cities
          </Text>
          <Text variant="bodyMedium" style={[styles.viewAll, { color: theme.colors.onBackground }]}> View all ›</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.citiesSlider}
        >
          {CITIES.map(city => (
            <CityCard key={city.id} city={city} onPress={() => { }} />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  location: {
    marginBottom: 5,
    fontWeight: '600'
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#666',
    marginTop: 2,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    color: '#666',
  },
  eventsContainer: {
    paddingHorizontal: 16,
  },
  eventCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  eventColumn: {
    width: 280,
    marginRight: 16,
  },
  eventCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  eventInfo: {
    flex: 1,
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  organizerName: {
    color: '#666',
  },
  eventTitle: {
    color: '#000',
    marginBottom: 4,
  },
  eventTime: {
    color: '#666',
  },
  cityCard: {
    marginRight: 16,
    width: 170,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cityImage: {
    width: '100%',
    height: 165,
  },
  cityOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 12,
  },
  cityName: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
  discover: {
    fontWeight: 'bold',
    color: '#000',
  },
  locationContainer: {
    marginBottom: 16,
  },
  popularEvents: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  citiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  citiesSlider: {
    paddingHorizontal: 16,
  },
  organizerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 4,

  }
});

export default HomeScreen;
