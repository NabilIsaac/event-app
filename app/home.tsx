import React from 'react';
import HomeScreen from '../src/screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import { TabParamList } from '../src/navigation/AppNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/navigation/AppNavigator';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Discover'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return <HomeScreen navigation={navigation} />;
}
