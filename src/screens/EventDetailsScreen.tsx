import React from 'react';
import { ScrollView, View, StyleSheet, Image, Dimensions, StatusBar } from 'react-native';
import { Text, Button, IconButton, useTheme } from 'react-native-paper';
import MapView, { Marker, Region } from 'react-native-maps';
import { format } from 'date-fns';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetails'>;

const INITIAL_REGION: Region = {
  latitude: 34.0522,
  longitude: -118.2437,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const EventDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { event } = route.params;
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  React.useEffect(() => {
    StatusBar.setBarStyle(theme.dark ? 'light-content' : 'dark-content');
    return () => {
      StatusBar.setBarStyle(theme.dark ? 'light-content' : 'dark-content');
    };
  }, [theme.dark]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView bounces={false}>
        <View style={[styles.header, { marginTop: -insets.top }]}>
          <Image source={{ uri: event.imageUrl }} style={styles.coverImage} />
          <View style={[styles.headerOverlay, { paddingTop: insets.top }]}>
            <View style={styles.headerButtons}>
              <IconButton
                icon="arrow-left"
                iconColor={theme.colors.onBackground}
                size={24}
                onPress={() => navigation.goBack()}
                style={[styles.backButton, { backgroundColor: theme.colors.background }]}
              />
              <View style={styles.rightButtons}>
                <IconButton
                  icon="email"
                  iconColor={theme.colors.onSurface}
                  size={24}
                  onPress={() => {}}
                  style={[styles.actionButton, { backgroundColor: theme.colors.background }]}
                />
                <IconButton
                  icon="share"
                  iconColor={theme.colors.onSurface}
                  size={24}
                  onPress={() => {}}
                  style={[styles.actionButton, { backgroundColor: theme.colors.background }]}
                />
                <IconButton
                  icon="dots-horizontal"
                  iconColor={theme.colors.onSurface}
                  size={24}
                  onPress={() => {}}
                  style={[styles.actionButton, { backgroundColor: theme.colors.background }]}
                />
              </View>
            </View>
            <View style={styles.headerContent}>
              <View style={styles.organizerInfo}>
                <Image source={{ uri: event.organizerImage }} style={styles.organizerImage} />
                <Text variant="titleMedium" style={[styles.organizerText, { color: theme.colors.onBackground }]}>
                  {event.organizer}
                </Text>
              </View>
              <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.onBackground }]}>
                {event.title}
              </Text>
              <Text variant="titleMedium" style={[styles.dateTime, { color: theme.colors.onBackground }]}>
                {format(event.date, 'EEEE, MMMM do')} at {event.time}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.locationCard}>
            <Text variant="titleMedium" style={[styles.locationTitle, { color: theme.colors.onBackground }]}>Location</Text>
            <Text variant="bodyMedium" style={[styles.locationDetail, { color: theme.colors.onBackground }]}>
              {event.location}, Los Angeles, CA
            </Text>
            <MapView
              style={styles.map}
              initialRegion={INITIAL_REGION}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker coordinate={INITIAL_REGION} />
            </MapView>
          </View>

          <Button
            mode="contained"
            onPress={() => {}}
            style={[styles.registerButton]}
            contentStyle={styles.registerButtonContent}
          >
            Register
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Dimensions.get('window').height * 0.6,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  rightButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginLeft: 8,
  },
  headerContent: {
    padding: 20,
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  organizerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  organizerText: {
  },
  title: {
    marginBottom: 8,
  },
  dateTime: {
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  locationCard: {
    padding: 5,
    marginBottom: 24,
  },
  locationDetail: {
    marginTop: 4,
    marginBottom: 12,
  },
  locationTitle: {
    marginBottom: 2,
  },
  map: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  registerButton: {
    borderRadius: 30,
  },
  registerButtonContent: {
    paddingVertical: 8,
  },
});

export default EventDetailsScreen;
