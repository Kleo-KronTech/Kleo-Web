export type TaskCategory = "hygiene" | "pets" | "house" | "other";
export type MoodType = "Anxious" | "Calm" | "Happy" | "Sad" | "Stressed";

export type Task = {
  id: string;
  text: string;
  category: TaskCategory;
  completed: boolean;
};

export type Reminder = {
  time: string;
  text: string;
  sent: boolean;
};

export type Patient = {
  name: string;
  initials: string;
  age: number;
  isActive: boolean;
  location: string;
  locationUpdated: string;
  mood: MoodType;
  moodReportedAgo: string;
  tasks: Task[];
  reminders: Reminder[];
};