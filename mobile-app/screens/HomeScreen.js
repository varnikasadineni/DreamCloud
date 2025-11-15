import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SERVER = 'http://10.7.74.62:5000'; // Node proxy on LAN

export const STATES = {
  SLEEPING: 'sleeping',
  RESTLESS: 'restless',
  CRYING: 'crying',
  DISTRESS: 'distress',
  MAY_WAKE_SOON: 'may_wake_soon',
  UNSAFE: 'unsafe',
};

export default function HomeScreen() {
  const [status, setStatus] = useState(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let timer = null;
    async function fetchStatus() {
      try {
        const res = await fetch(`${SERVER}/status`);
        const json = await res.json();
        setStatus(json);
      } catch (e) {
      }
    }
    fetchStatus();
    if (running) timer = setInterval(fetchStatus, 2000);
    return () => clearInterval(timer);
  }, [running]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GuguGaga — Live Status</Text>
      {status ? (
        <View style={styles.card}>
          <Text>cry: {status.cry}</Text>
          <Text>cry_type: {status.cry_type}</Text>
          <Text>motion: {status.motion}</Text>
          <Text>posture: {status.posture}</Text>
          <Text>state: {status.state}</Text>
          <Text>timestamp: {status.timestamp}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button title={running ? 'Stop' : 'Start'} onPress={() => setRunning(!running)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 12 },
  card: { padding: 12, borderWidth: 1, borderRadius: 8 },
});
