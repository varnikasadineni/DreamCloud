import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useBabyMonitor } from '../../hooks/useBabyMonitor';

export default function AlertsScreen() {
  const { alertHistory } = useBabyMonitor();

  return (
    <LinearGradient
      colors={['#0f172a', '#0d1320']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Alert & Comfort Journal</Text>
        </View>
        
        {alertHistory.length === 0 ? (
          <View style={styles.noAlertsContainer}>
            <Text style={styles.noAlertsText}>No alerts yet.</Text>
          </View>
        ) : (
          <FlatList
            data={alertHistory}
            keyExtractor={(_, index) => index.toString()}
            style={styles.list}
            renderItem={({ item }) => (
              <View style={styles.alertItem}>
                <Text style={styles.alertText}>{item}</Text>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    height: '100vh' as any, // Web viewport height
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    width: '100%',
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#334155', // Dark border
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc', // White
  },
  noAlertsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAlertsText: {
    fontSize: 18,
    color: '#94a3b8', // Gray
  },
  list: {
    width: '100%',
  },
  alertItem: {
    backgroundColor: '#1e293b', // Dark card
    padding: 16,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 10,
    // "Cloud Glow" effect
    shadowColor: '#a5f3fc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  alertText: {
    fontSize: 16,
    color: '#e2e8f0', // Light text
  },
});
