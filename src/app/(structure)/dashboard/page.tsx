"use client";

import Header from "@/src/components/common/header";
import GlowButton from "@/src/components/common/glow-button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import {
  Bell,
  MapPin,
  Plus,
  CheckCircle2,
  Circle,
  Send,
  ClipboardList,
  CalendarClock,
} from "lucide-react";
import { useState } from "react";
import { MOCK_PATIENT, MOODS, CATEGORY_COLORS } from "@/src/data/patient";
import { MoodType } from "@/src/types/patient";
import Modal from "@/src/components/modals/modal";
import ReminderModal from "@/src/components/modals/reminder-modal";
import { useRouter } from "next/navigation";

export default function Page() {
  const [tasks, setTasks] = useState(MOCK_PATIENT.tasks);
  const [selectedMood, setSelectedMood] = useState<MoodType>(MOCK_PATIENT.mood);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const progress = Math.round((completed / total) * 100);
  const nextReminder = MOCK_PATIENT.reminders.find((r) => !r.sent);

  const router = useRouter();

  const filteredTasks =
    selectedFilter === "all"
      ? tasks
      : selectedFilter === "done"
        ? tasks.filter((t) => t.completed)
        : tasks.filter((t) => !t.completed);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };
  const [isReminderOpen, setIsReminderOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-6 rounded-xl">
      <Header
        title="Patient Overview"
        buttonText="Add Task"
        buttonIcon={<Plus size={18} />}
        buttonOnClick={() => setIsReminderOpen(true)}
        summary={
          <div className="text-muted-foreground flex gap-1 text-base font-semibold">
            Monitoring{" "}
            <span className="text-foreground flex items-center gap-1 ml-1">
              {MOCK_PATIENT.name}
            </span>
            <span className="mx-1">·</span>
            <span className="text-foreground">
              {completed}/{total} tasks done today
            </span>
          </div>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <CardContent className="p-0 flex flex-col gap-2">
            <p className="text-sm text-muted-foreground font-medium">
              Tasks completed
            </p>
            <p className="text-2xl font-semibold">
              {completed}{" "}
              <span className="text-base text-muted-foreground font-normal">
                / {total}
              </span>
            </p>
            <div className="h-2 rounded-full bg-zinc-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#5e54b8] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {progress}% done today
            </p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0 flex flex-col gap-2">
            <p className="text-sm text-muted-foreground font-medium">
              Current mood
            </p>
            <p className="text-2xl font-semibold text-[#5e54b8]">
              {selectedMood}
            </p>
            <p className="text-xs text-muted-foreground">
              Reported {MOCK_PATIENT.moodReportedAgo} from app
            </p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0 flex flex-col gap-2">
            <p className="text-sm text-muted-foreground font-medium">
              Next reminder
            </p>
            <p className="text-2xl font-semibold">
              {nextReminder?.time ?? "—"}
            </p>
            <p className="text-xs text-muted-foreground">
              {nextReminder?.text}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-[1.4fr_1fr] grid-rows-[auto_1fr] gap-6">
        <Card className="p-4">
          <CardContent className="p-0 flex flex-col gap-4">
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => router.push("/patient")}>
              <div className="w-11 h-11 rounded-full bg-[#ebe8ff] flex items-center justify-center font-semibold text-[#5e54b8]">
                {MOCK_PATIENT.initials}
              </div>
              <div>
                <p className="font-semibold text-base">{MOCK_PATIENT.name}</p>
                <p className="text-sm text-muted-foreground">
                  Patient · Age {MOCK_PATIENT.age}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Today's mood
              </p>
              <div className="flex gap-2">
                {MOODS.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-all ${
                      selectedMood === mood
                        ? "border-[#5e54b8] bg-[#ebe8ff] text-[#5e54b8]"
                        : "border-border bg-muted text-muted-foreground hover:border-[#5e54b8]/50"
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Location
              </p>
              <div className="flex items-center gap-3 bg-muted rounded-lg px-3 py-2.5">
                <div className="w-8 h-8 rounded-full bg-[#ebe8ff] flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-[#5e54b8]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{MOCK_PATIENT.location}</p>
                  <p className="text-xs text-muted-foreground">
                    Last updated {MOCK_PATIENT.locationUpdated}
                  </p>
                </div>
                <GlowButton
                  variant="muted"
                  className="rounded-lg px-3 py-1.5 text-xs"
                  onClick={() => {}}
                >
                  View map
                </GlowButton>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Today's tasks
              </p>
              <div className="flex items-center gap-2">
                {(["all", "done", "pending"] as const).map((f) => (
                  <GlowButton
                    key={f}
                    variant={selectedFilter === f ? "default" : "muted"}
                    className="rounded-full px-3 py-1 text-xs"
                    onClick={() => setSelectedFilter(f)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </GlowButton>
                ))}
                <GlowButton
                  variant="muted"
                  className="rounded-lg px-3 py-1 text-xs"
                  icon={<Plus size={12} />}
                  onClick={() => {}}
                >
                  Add
                </GlowButton>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 size={18} className="text-[#5e54b8]" />
                    ) : (
                      <Circle size={18} className="text-muted-foreground" />
                    )}
                  </button>
                  <span
                    className={`flex-1 text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                  >
                    {task.text}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[task.category] ?? CATEGORY_COLORS.other}`}
                  >
                    {task.category}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Reminders
              </p>
              <GlowButton
                variant="muted"
                className="rounded-lg px-3 py-1 text-xs"
                icon={<Plus size={12} />}
                onClick={() => {}}
              >
                New
              </GlowButton>
            </div>

            <div className="flex flex-col">
              {MOCK_PATIENT.reminders.map((r, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 py-2.5">
                    <span className="text-sm font-semibold text-[#5e54b8] w-[72px] flex-shrink-0">
                      {r.time}
                    </span>
                    <span className="flex-1 text-sm text-foreground">
                      {r.text}
                    </span>
                    <div className="flex items-center gap-1.5"></div>
                  </div>
                  {i < MOCK_PATIENT.reminders.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0 flex flex-col gap-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Quick actions
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  icon: <Send size={16} />,
                  label: "Send message",
                  sub: "Notify Maria directly",
                },
                {
                  icon: <Plus size={16} />,
                  label: "Add task",
                  sub: "For today or future",
                },
                {
                  icon: <ClipboardList size={16} />,
                  label: "View history",
                  sub: "Past tasks & moods",
                },
                {
                  icon: <CalendarClock size={16} />,
                  label: "Edit reminders",
                  sub: "Modify today's schedule",
                },
                {
                  icon: <Bell size={16} />,
                  label: "Send alert",
                  sub: "Urgent notification",
                },
                {
                  icon: <MapPin size={16} />,
                  label: "Check location",
                  sub: "See where Maria is",
                },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-start gap-1 px-3 py-3 rounded-xl border border-border bg-muted hover:border-[#5e54b8]/50 hover:bg-[#ebe8ff]/30 transition-all text-left"
                  onClick={() => {}}
                >
                  <span className="text-[#5e54b8]">{action.icon}</span>
                  <span className="text-sm font-medium text-foreground">
                    {action.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {action.sub}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Modal isOpen={isReminderOpen}>
  <ReminderModal setModalOpen={setIsReminderOpen}
   />
</Modal>
    </div>
  );
}
