import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useBabyMonitor } from '../../hooks/useBabyMonitor';
import { BabyState } from '../../mockData';

export default function LiveMonitorScreen() {
  const { babyState, isLoading } = useBabyMonitor();

  const getStatusStyle = (state: BabyState['state']) => {
    switch (state) {
      case 'distress':
        return styles.statusTextDistress;
      case 'restless':
      case 'may_wake_soon':
        return styles.statusTextRestless;
      case 'sleeping':
      default:
        return styles.statusTextCalm;
    }
  };

  if (isLoading) {
    return (
      <LinearGradient
        colors={['#0f172a', '#0d1320']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color="#7dd3fc" />
          <Text style={styles.loadingText}>Connecting to AI Engine...</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (!babyState) {
    return (
      <LinearGradient
        colors={['#0f172a', '#0d1320']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.loadingText}>Error loading data. Please check connection.</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#0f172a', '#0d1320']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>DreamCloud Monitor</Text>
        </View>
        
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Main Status</Text>
          <Text style={[styles.statusText, getStatusStyle(babyState.state)]}>
            {babyState.state}
          </Text>
        </View>

        <View style={styles.vitalsGridContainer}>
          <Text style={styles.vitalsTitle}>Live Vitals</Text>
          <View style={styles.vitalsGrid}>
            
            <View style={styles.vitalItem}>
              <Ionicons name="body-outline" size={32} color="#7dd3fc" />
              <Text style={styles.vitalValue}>{babyState.motion}</Text>
              <Text style={styles.vitalLabel}>Motion</Text>
            </View>
            
            <View style={styles.vitalItem}>
              <Ionicons name="volume-medium-outline" size={32} color="#7dd3fc" />
              <Text style={styles.vitalValue}>{babyState.cry_type}</Text>
              <Text style={styles.vitalLabel}>Cry Type</Text>
            </View>
            
            <View style={styles.vitalItem}>
              <Ionicons name="bed-outline" size={32} color="#7dd3fc" />
              <Text style={styles.vitalValue}>{babyState.posture}</Text>
              <Text style={styles.vitalLabel}>Posture</Text>
            </View>

          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// Styles
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    height: '100vh' as any, // Web viewport height
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Important: Let gradient show
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
  },
  header: {
    width: '100%',
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc', // White text
  },
  statusCard: {
    backgroundColor: '#1e293b', // Dark slate card
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    // "Cloud Glow" effect
    shadowColor: '#a5f3fc', // Light blue glow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#cbd5e1', // Light gray
    marginBottom: 10,
  },
  statusText: {
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  statusTextDistress: { color: '#f78b8b' }, // Soft Red
  statusTextRestless: { color: '#fcd34d' }, // Soft Yellow
  statusTextCalm: { color: '#86efac' }, // Soft Green
  
  vitalsGridContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  vitalsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 15,
  },
  vitalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vitalItem: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '31%',
    // "Cloud Glow" effect
    shadowColor: '#a5f3fc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  vitalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f8fafc',
    marginTop: 8,
    textTransform: 'capitalize',
  },
  vitalLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
});
