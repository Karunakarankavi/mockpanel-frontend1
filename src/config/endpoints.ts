// Centralized endpoints for the app. Prefer overriding via environment variables.
export const ENDPOINTS = {
  RESUME_TOPICS: process.env.REACT_APP_RESUME_TOPICS_URL || 'https://api.mockpanel.com/api/v1/resume/topics',
  WS_SERVER: process.env.REACT_APP_WS_URL || ' ws://0.0.0.0:8001',
  SEND_MSG: process.env.REACT_APP_SEND_MSG_URL || 'https://api.mockpanel.com/api/v1/send-msg',
  RECONNECT: process.env.REACT_APP_RECONNECT_URL || 'https://api.mockpanel.com/api/v1/reconnect',
  MODEL_GLB: process.env.REACT_APP_MODEL_GLB_URL || 'https://mockepanel-model.s3.ap-south-1.amazonaws.com/model4.glb',
  INPUT_AUDIO: process.env.REACT_APP_INPUT_AUDIO || 'input.mp3'
};

export default ENDPOINTS;
