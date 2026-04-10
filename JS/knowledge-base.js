// =============================================
// KNOWLEDGE BASE — knowledge-base.js
// Syllabus topic: Knowledge Representation
// =============================================

const ROOMS = [
  {
    id: "R101",
    name: "Board Room",
    capacity: 20,
    floor: 1,
    features: ["projector", "whiteboard", "video_conf", "ac"],
    priority: 1
  },
  {
    id: "R102",
    name: "Seminar Hall",
    capacity: 50,
    floor: 1,
    features: ["projector", "mic", "ac", "whiteboard"],
    priority: 2
  },
  {
    id: "R201",
    name: "Conference A",
    capacity: 10,
    floor: 2,
    features: ["whiteboard", "tv_screen", "ac"],
    priority: 1
  },
  {
    id: "R202",
    name: "Conference B",
    capacity: 10,
    floor: 2,
    features: ["whiteboard", "ac"],
    priority: 1
  },
  {
    id: "R301",
    name: "Training Room",
    capacity: 30,
    floor: 3,
    features: ["projector", "whiteboard", "ac", "computer_lab"],
    priority: 2
  },
  {
    id: "R302",
    name: "Interview Room",
    capacity: 4,
    floor: 3,
    features: ["whiteboard", "ac"],
    priority: 3
  }
];

// Live bookings store — persists during the session
const BOOKINGS = [];

// All possible equipment options shown in the UI
const ALL_EQUIPMENT = [
  "projector",
  "whiteboard",
  "video_conf",
  "ac",
  "mic",
  "tv_screen",
  "computer_lab"
];