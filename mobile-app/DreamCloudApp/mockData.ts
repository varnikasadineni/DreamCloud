// Define the type for our state
export interface BabyState {
  cry: "crying" | "whimper" | "calm";
  cry_type: "hunger" | "pain" | "discomfort" | "unknown";
  motion: "restless" | "calm";
  posture: "on back" | "side" | "stomach" | "unknown";
  state: "sleeping" | "restless" | "may_wake_soon" | "distress";
}

// Export the mock data
export const mockApiResponse: BabyState = {
  cry: "calm",
  cry_type: "unknown",
  motion: "calm",
  posture: "on back",
  state: "sleeping"
};

