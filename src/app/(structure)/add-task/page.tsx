"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { ChevronLeft, X } from "lucide-react";
import { MOCK_PATIENT, MOODS } from "@/src/data/patient";
import { MoodType } from "@/src/types/patient";

type Props = {
  setModalOpen: (open: boolean) => void;
};

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const CATEGORIES = [
  "hygiene",
  "pets",
  "house",
  "work",
  "shopping",
  "health",
  "fitness",
  "education",
  "other",
];

const today = new Date(2026, 4, 26);
const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay() + 1);
const WEEK_DATES = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(startOfWeek);
  d.setDate(startOfWeek.getDate() + i);
  return d;
});

export default function ReminderModal({ setModalOpen }: Props) {
  const [taskName, setTaskName] = useState("");
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedCategory, setSelectedCategory] = useState("other");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hours, setHours] = useState("06");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("PM");

  const increment = (val: string, max: number) =>
    ((parseInt(val) + 1) % (max + 1)).toString().padStart(2, "0");
  const decrement = (val: string, max: number) =>
    ((parseInt(val) - 1 + max + 1) % (max + 1)).toString().padStart(2, "0");

  const handleCreate = () => {
    if (!taskName.trim()) return;
    console.log({
      taskName,
      selectedDate,
      selectedCategory,
      time: `${hours}:${minutes} ${period}`,
    });
    setModalOpen(false);
  };

  return (
    <div className="w-full">
     
      <div className="flex items-center justify-between mb-6">
        
        <span className="text-sm font-medium text-zinc-300">
          New reminder for {MOCK_PATIENT.name}
        </span>
        <button
          onClick={() => setModalOpen(false)}
          className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md p-1"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-5">
       
        <input
          type="text"
          placeholder="Write a reminder..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#5e54b8]"
        />

        <div>
          <p className="text-xs font-semibold text-zinc-500 tracking-wide mb-2">
            Choose date
          </p>
          <div className="grid grid-cols-7 gap-1.5">
            {WEEK_DATES.map((date, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(date.getDate())}
                className={`flex flex-col items-center py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedDate === date.getDate()
                    ? "bg-[#5e54b8] text-white"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                <span className="text-[10px] mb-1">{DAYS[i]}</span>
                <span>{date.getDate()}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-zinc-500 tracking-wide mb-2">
            Choose time
          </p>
          <div className="flex items-center justify-center gap-3 bg-zinc-800 rounded-lg py-3 px-4">
            
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => setHours(increment(hours, 23))}
                className="text-zinc-500 hover:text-zinc-300 text-sm"
              >
                {increment(hours, 23)}
              </button>
              <span className="text-lg font-semibold text-white w-8 text-center">
                {hours}
              </span>
              <button
                onClick={() => setHours(decrement(hours, 23))}
                className="text-zinc-500 hover:text-zinc-300 text-sm"
              >
                {decrement(hours, 23)}
              </button>
            </div>

            <span className="text-lg font-bold text-white mb-0.5">:</span>

            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => setMinutes(increment(minutes, 59))}
                className="text-zinc-500 hover:text-zinc-300 text-sm"
              >
                {increment(minutes, 59)}
              </button>
              <span className="text-lg font-semibold text-white w-8 text-center">
                {minutes}
              </span>
              <button
                onClick={() => setMinutes(decrement(minutes, 59))}
                className="text-zinc-500 hover:text-zinc-300 text-sm"
              >
                {decrement(minutes, 59)}
              </button>
            </div>

            <div className="flex flex-col gap-1.5 ml-3">
              {(["AM", "PM"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    period === p
                      ? "bg-[#5e54b8] text-white"
                      : "bg-zinc-700 text-zinc-400 hover:bg-zinc-600"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">
            Category
          </p>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
              dropdownOpen
                ? "border-[#5e54b8] bg-zinc-800 text-zinc-100 rounded-b-none"
                : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500"
            }`}
          >
            <span>
              {selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)}
            </span>
            <span className="text-zinc-500">{dropdownOpen ? "▲" : "▼"}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute z-50 w-full max-h-28 overflow-y-auto rounded-b-lg border border-t-0 border-[#5e54b8] bg-zinc-800">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all hover:bg-zinc-700 ${
                    selectedCategory === cat
                      ? "text-[#a099e8] bg-zinc-700/50"
                      : "text-zinc-300"
                  } ${i < CATEGORIES.length - 1 ? "border-b border-zinc-700" : ""}`}
                >
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                  {selectedCategory === cat && (
                    <span className="text-[#5e54b8] text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          onClick={handleCreate}
          disabled={!taskName.trim()}
          className="w-full bg-[#5e54b8] hover:bg-[#4e46a8] border border-[#4e46a8] text-white font-semibold py-3 rounded-lg disabled:opacity-40"
        >
          Create Reminder
        </Button>
      </div>
    </div>
  );
}
