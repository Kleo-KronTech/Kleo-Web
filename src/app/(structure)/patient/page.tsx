"use client";

import Header from "@/src/components/common/header";
import GlowButton from "@/src/components/common/glow-button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Pencil, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MOCK_PATIENT, MOODS, CATEGORY_COLORS } from "@/src/data/patient";
import { MoodType } from "@/src/types/patient";

const MOOD_COLORS: Record<MoodType, string> = {
  Calm: "bg-zinc-100 text-zinc-600",
  Happy: "bg-zinc-200 text-zinc-700",
  Anxious: "bg-zinc-100 text-zinc-500",
  Sad: "bg-zinc-100 text-zinc-400",
  Stressed: "bg-zinc-200 text-zinc-600",
};

export default function PatientPage() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<MoodType>(MOCK_PATIENT.mood);

  const completed = MOCK_PATIENT.tasks.filter((t) => t.completed).length;
  const total = MOCK_PATIENT.tasks.length;

  return (
    <div className="flex w-full flex-col gap-6">
      <Header
        title="Patient Profile"
        buttonText="Edit Profile"
        buttonIcon={<Pencil size={16} />}
        buttonOnClick={() => {}}
        summary={
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={15} />
            Back to dashboard
          </button>
        }
      />

      <div className="grid grid-cols-[1.4fr_1fr] grid-rows-[auto_auto] gap-6">
        <Card className="p-5">
          <CardContent className="p-0 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#ebe8ff] flex items-center justify-center font-semibold text-lg text-[#5e54b8]">
                {MOCK_PATIENT.initials}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold text-base">{MOCK_PATIENT.name}</p>
                <p className="text-sm text-muted-foreground">
                  Age {MOCK_PATIENT.age} · {MOCK_PATIENT.diagnosis}
                </p>
                <p className="text-xs text-muted-foreground">
                  Assigned since {MOCK_PATIENT.assignedSince}
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              {[
                { label: "Phone", value: MOCK_PATIENT.phone },
                { label: "Address", value: MOCK_PATIENT.address },
                {
                  label: "Emergency contact",
                  value: MOCK_PATIENT.emergencyContact,
                },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex flex-col gap-1.5">
              <p className="text-xs text-muted-foreground">Caretaker notes</p>
              <p className="text-sm text-foreground leading-relaxed">
                {MOCK_PATIENT.notes}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="p-5">
          <CardContent className="p-0 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                Mood this week
              </p>
              <div className="flex flex-col gap-1.5">
                {MOCK_PATIENT.weeklyMoods.map(({ day, mood }) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-7">
                      {day}
                    </span>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${MOOD_COLORS[mood as MoodType]}`}
                    >
                      {mood}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                Update mood
              </p>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      selectedMood === mood
                        ? "border-[#5e54b8] bg-[#ebe8ff] text-[#5e54b8]"
                        : "border-border bg-muted text-muted-foreground hover:border-[#5e54b8]/40"
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
