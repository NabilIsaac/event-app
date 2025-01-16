import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { Text, Card, Button, useTheme, Divider, Portal, Modal, TextInput, SegmentedButtons, Switch, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface EventForm {
  title: string;
  description: string;
  date: Date;
  time: Date;
  location: string;
  price: string;
  category: string;
  isPublic: boolean;
}

const VendorDashboardScreen = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [form, setForm] = useState<EventForm>({
    title: '',
    description: '',
    date: new Date(),
    time: new Date(),
    location: '',
    price: '',
    category: 'music',
    isPublic: true,
  });

  const stats = [
    { title: 'Active', value: '3', icon: 'calendar-check' as const },
    { title: 'Total Sales', value: '$1,234', icon: 'cash' as const },
    { title: 'Attendees', value: '156', icon: 'account-group' as const },
  ];

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleSubmit = () => {
    console.log('Form submitted:', form);
    hideModal();
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.colors.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }
    ]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={{ color: theme.colors.onBackground, fontSize: 20 }}>
            Vendor Dashboard
          </Text>
          <Button 
            mode="contained" 
            onPress={showModal}
            style={styles.createButton}
            icon="plus"
          >
            Create Event
          </Button>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              style={[styles.statCard, { backgroundColor: theme.colors.surface }]}
            >
              <Card.Content style={styles.statContent}>
                <MaterialCommunityIcons 
                  name={stat.icon} 
                  size={24} 
                  color={theme.colors.primary} 
                />
                <Text 
                  variant="headlineSmall" 
                  style={[styles.statValue, { color: theme.colors.onSurface, fontSize: 20 }]}
                >
                  {stat.value}
                </Text>
                <Text 
                  variant="bodyMedium" 
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {stat.title}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        <Text 
          variant="titleLarge" 
          style={[styles.sectionTitle, { color: theme.colors.onBackground }]}
        >
          Your Events
        </Text>

        <Card style={[styles.eventCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
              Summer Music Festival
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              July 15, 2024 • 150 attendees
            </Text>
            <Divider style={styles.divider} />
            <View style={styles.eventStats}>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Revenue: $3,450
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
                Active
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.eventCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
              Food Truck Festival
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              August 1, 2024 • 85 attendees
            </Text>
            <Divider style={styles.divider} />
            <View style={styles.eventStats}>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Revenue: $2,125
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
                Active
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modalContainer,
            { backgroundColor: theme.colors.surface }
          ]}
        >
          <View style={styles.modalHeader}>
            <Text variant="headlineSmall" style={{ color: theme.colors.onSurface }}>
              Create New Event
            </Text>
            <IconButton
              icon="close"
              size={24}
              onPress={hideModal}
            />
          </View>

          <ScrollView 
            style={styles.modalScrollView}
            contentContainerStyle={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <TextInput
              label="Event Title"
              value={form.title}
              onChangeText={(text) => setForm({ ...form, title: text })}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Description"
              value={form.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={styles.input}
            />

            <View style={styles.dateTimeContainer}>
              <Button
                mode="outlined"
                onPress={() => setShowDatePicker(true)}
                icon="calendar"
                style={styles.dateTimeButton}
              >
                {form.date.toLocaleDateString()}
              </Button>

              <Button
                mode="outlined"
                onPress={() => setShowTimePicker(true)}
                icon="clock"
                style={styles.dateTimeButton}
              >
                {form.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Button>
            </View>

            {(showDatePicker || showTimePicker) && (
              <DateTimePicker
                value={showDatePicker ? form.date : form.time}
                mode={showDatePicker ? 'date' : 'time'}
                is24Hour={true}
                onChange={(event, selectedDate) => {
                  if (showDatePicker) {
                    setShowDatePicker(false);
                    if (selectedDate) setForm({ ...form, date: selectedDate });
                  } else {
                    setShowTimePicker(false);
                    if (selectedDate) setForm({ ...form, time: selectedDate });
                  }
                }}
              />
            )}

            <TextInput
              label="Location"
              value={form.location}
              onChangeText={(text) => setForm({ ...form, location: text })}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Price"
              value={form.price}
              onChangeText={(text) => setForm({ ...form, price: text })}
              mode="outlined"
              keyboardType="decimal-pad"
              style={styles.input}
              left={<TextInput.Affix text="$" />}
            />

            <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurface }]}>
              Category
            </Text>
            <SegmentedButtons
              value={form.category}
              onValueChange={value => setForm({ ...form, category: value })}
              buttons={[
                { value: 'music', label: 'Music' },
                { value: 'food', label: 'Food' },
                { value: 'art', label: 'Art' },
                { value: 'sport', label: 'Sport' },
              ]}
              style={styles.segmentedButtons}
            />

            <View style={styles.switchContainer}>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                Public Event
              </Text>
              <Switch
                value={form.isPublic}
                onValueChange={(value) => setForm({ ...form, isPublic: value })}
              />
            </View>

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              Create Event
            </Button>
          </ScrollView>
        </Modal>
      </Portal>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  createButton: {
    borderRadius: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
  },
  statContent: {
    alignItems: 'center',
    padding: 12,
  },
  statValue: {
    marginVertical: 4,
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginBottom: 16,
  },
  eventCard: {
    marginBottom: 12,
    elevation: 2,
  },
  divider: {
    marginVertical: 12,
  },
  eventStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
    maxHeight: SCREEN_HEIGHT * 0.9,
    width: '90%',
    alignSelf: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalScrollView: {
    maxHeight: SCREEN_HEIGHT * 0.7,
  },
  modalScrollContent: {
    flexGrow: 1,
  },
  input: {
    marginBottom: 16,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateTimeButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    marginBottom: 8,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButton: {
    marginBottom: 16,
  },
});

export default VendorDashboardScreen;
