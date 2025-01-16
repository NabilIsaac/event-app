import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, useTheme, Divider, List, Switch, Avatar, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MOCK_USER = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  eventsAttended: 23,
  eventsOrganized: 5,
  followers: 142,
  following: 98,
};

const ProfileScreen = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const stats = [
    { label: 'Events Attended', value: MOCK_USER.eventsAttended },
    { label: 'Events Organized', value: MOCK_USER.eventsOrganized },
    { label: 'Followers', value: MOCK_USER.followers },
    { label: 'Following', value: MOCK_USER.following },
  ];

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: theme.colors.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }
    ]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Avatar.Image
              size={100}
              source={{ uri: MOCK_USER.avatar }}
              style={styles.avatar}
            />
            <IconButton
              icon="pencil"
              size={20}
              style={[styles.editButton, { backgroundColor: theme.colors.primary }]}
              iconColor={theme.colors.surface}
              onPress={() => {}}
            />
          </View>
          <Text variant="headlineMedium" style={[styles.name, { color: theme.colors.onBackground }]}>
            {MOCK_USER.name}
          </Text>
          <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
            {MOCK_USER.email}
          </Text>
          
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text 
                  variant="titleLarge" 
                  style={[styles.statValue, { color: theme.colors.primary }]}
                >
                  {stat.value}
                </Text>
                <Text 
                  variant="bodyMedium" 
                  style={{ color: theme.colors.onSurfaceVariant, width: 80, textAlign: 'center' }}
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Settings Section */}
        <View style={styles.section}>
          <Text 
            variant="titleMedium" 
            style={[styles.sectionTitle, { color: theme.colors.onBackground }]}
          >
            Settings
          </Text>
          
          <List.Item
            title="Notifications"
            description="Stay updated with event reminders"
            left={props => (
              <List.Icon {...props} icon="bell-outline" color={theme.colors.primary} />
            )}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
          />
          
          <List.Item
            title="Dark Mode"
            description="Toggle dark theme"
            left={props => (
              <List.Icon {...props} icon="theme-light-dark" color={theme.colors.primary} />
            )}
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />
            )}
          />

          <List.Item
            title="Payment Methods"
            description="Manage your payment options"
            left={props => (
              <List.Icon {...props} icon="credit-card-outline" color={theme.colors.primary} />
            )}
            right={props => (
              <List.Icon {...props} icon="chevron-right" />
            )}
            onPress={() => {}}
          />

          <List.Item
            title="Privacy Settings"
            description="Control your privacy preferences"
            left={props => (
              <List.Icon {...props} icon="shield-outline" color={theme.colors.primary} />
            )}
            right={props => (
              <List.Icon {...props} icon="chevron-right" />
            )}
            onPress={() => {}}
          />
        </View>

        <Divider style={styles.divider} />

        {/* Account Section */}
        <View style={styles.section}>
          <Text 
            variant="titleMedium" 
            style={[styles.sectionTitle, { color: theme.colors.onBackground }]}
          >
            Account
          </Text>

          <List.Item
            title="Help & Support"
            left={props => (
              <List.Icon {...props} icon="help-circle-outline" color={theme.colors.primary} />
            )}
            onPress={() => {}}
          />

          <List.Item
            title="Terms of Service"
            left={props => (
              <List.Icon {...props} icon="file-document-outline" color={theme.colors.primary} />
            )}
            onPress={() => {}}
          />

          <List.Item
            title="Privacy Policy"
            left={props => (
              <List.Icon {...props} icon="lock-outline" color={theme.colors.primary} />
            )}
            onPress={() => {}}
          />

          <Button
            mode="outlined"
            icon="logout"
            onPress={() => {}}
            style={styles.logoutButton}
          >
            Sign Out
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
  scrollContent: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTop: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    elevation: 4,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 0,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  divider: {
    marginVertical: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 16,
  },
});

export default ProfileScreen;
