import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { BabyState, mockApiResponse } from '../mockData';
import { sendLocalNotification } from '../services/notificationService';

const AI_ENGINE_IP = "http://10.7.74.62:8000/status";
const POLLING_INTERVAL = 3000; // 3 seconds

export const useBabyMonitor = () => {
  const [babyState, setBabyState] = useState<BabyState | null>(null);
  const [alertHistory, setAlertHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const prevStateRef = useRef<BabyState['state'] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<BabyState>(AI_ENGINE_IP);
        const newState = response.data;
        
        setBabyState(newState);
        setIsLoading(false);

        // Check for state change to trigger notification
        const currentState = newState.state;
        const prevState = prevStateRef.current;

        if (prevState && prevState !== currentState) {
          if (currentState === 'distress' || currentState === 'may_wake_soon') {
            const alertMessage = `Baby is now ${currentState}`;
            sendLocalNotification('DreamCloud Alert', alertMessage);
            setAlertHistory(prev => [`${new Date().toLocaleTimeString()}: ${alertMessage}`, ...prev]);
          }
        }
        prevStateRef.current = currentState;

      } catch (error) {
        console.error("Failed to fetch AI data:", error);
        // !! FALLBACK: If API fails, use mock data so the demo works
        setBabyState(mockApiResponse); 
        setIsLoading(false);
      }
    };

    fetchData(); // Fetch immediately on load
    const interval = setInterval(fetchData, POLLING_INTERVAL);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return { babyState, alertHistory, isLoading };
};

