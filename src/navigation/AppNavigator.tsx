import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { Event } from '../types';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import VendorDashboardScreen from '../screens/VendorDashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  EventDetails: { event: Event };
};

export type TabParamList = {
  Discover: undefined;
  Map: undefined;
  Vendor: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TabNavigator = () => {
  const theme = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          paddingBottom: 5,
          paddingTop: 5,
          borderTopColor: theme.colors.surfaceVariant,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Discover"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-marker" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Vendor"
        component={VendorDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="store" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="EventDetails" 
        component={EventDetailsScreen}
        options={{ 
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
}
