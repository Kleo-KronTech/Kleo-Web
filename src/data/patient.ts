import { MoodType, Patient } from "@/src/types/patient";

export const MOCK_PATIENT: Patient = {
  name: "Maria D.",
  initials: "MD",
  age: 34,
  isActive: true,
  location: "Home · Str. Mureșenilor 12",
  locationUpdated: "4 min ago",
  mood: "Calm",
  moodReportedAgo: "2h ago",
  tasks: [
    { id: "1", text: "Brush teeth", category: "hygiene", completed: true },
    { id: "2", text: "Take a shower", category: "hygiene", completed: true },
    { id: "3", text: "Feed cats", category: "pets", completed: true },
    { id: "4", text: "Take dogs to the vet", category: "pets", completed: false },
    { id: "5", text: "Water indoor plants", category: "house", completed: false },
    { id: "6", text: "Walk turtle", category: "pets", completed: false },
    { id: "7", text: "Feed cactus", category: "house", completed: false },
  ],
  reminders: [
    { time: "08:00 AM", text: "Take morning medication", sent: true },
    { time: "12:30 PM", text: "Eat lunch", sent: true },
    { time: "03:00 PM", text: "Walk outside for 20 min", sent: false },
    { time: "06:00 PM", text: "Take evening medication", sent: false },
    { time: "09:00 PM", text: "Prepare for bed, relax", sent: false },
  ],
  phone: "+40 712 345 678",
  address: "Str. Mureșenilor 12, Cluj-Napoca",
  diagnosis: "Generalized Anxiety Disorder",
  assignedSince: "January 2025",
  emergencyContact: "Ion D. (Father) · +40 723 456 789",
  notes: "Maria responds well to structured routines. Prefers morning reminders before 9 AM. Avoid sudden schedule changes.",
  weeklyMoods: [
    { day: "Mon", mood: "Calm" },
    { day: "Tue", mood: "Anxious" },
    { day: "Wed", mood: "Happy" },
    { day: "Thu", mood: "Calm" },
    { day: "Fri", mood: "Stressed" },
    { day: "Sat", mood: "Happy" },
    { day: "Sun", mood: "Calm" },
  ],
};

export const MOODS: MoodType[] = ["Anxious", "Calm", "Happy", "Sad", "Stressed"];

export const CATEGORY_COLORS: Record<string, string> = {
  hygiene: "bg-blue-50 text-blue-700",
  pets: "bg-green-50 text-green-700",
  house: "bg-teal-50 text-teal-700",
  other: "bg-purple-50 text-purple-700",
};