"use client";

import Header from "@/src/components/common/header";
import GlowButton from "@/src/components/common/glow-button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { MOCK_PATIENT } from "@/src/data/patient";
import Modal from "@/src/components/modals/modal";
import ReminderModal from "@/src/components/modals/reminder-modal";

type Reminder = {
  id: string;
  time: string;
  text: string;
  category: string;
  enabled: boolean;
};

const INITIAL_REMINDERS: Reminder[] = MOCK_PATIENT.reminders.map((r, i) => ({
  id: i.toString(),
  time: r.time,
  text: r.text,
  category: "other",
  enabled: true,
}));

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(INITIAL_REMINDERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDays, setActiveDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);

  const enabled = reminders.filter((r) => r.enabled).length;
  const total = reminders.length;

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleDay = (day: string) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <Header
        title="Reminders"
        buttonText="Add Reminder"
        buttonIcon={<Plus size={18} />}
        buttonOnClick={() => setIsModalOpen(true)}
        summary={
          <div className="text-muted-foreground flex gap-1 text-base font-semibold">
            <span className="text-foreground">{enabled}</span> of{" "}
            <span className="text-foreground">{total}</span> reminders active
            for{" "}
            <span className="text-foreground ml-1">{MOCK_PATIENT.name}</span>
          </div>
        }
      />

      <div className="grid grid-cols-[1.4fr_1fr] grid-rows-[auto_auto] gap-6">


        <Card className="p-5">
          <CardContent className="p-0 flex flex-col gap-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
              All reminders
            </p>

            <div className="flex flex-col">
              {reminders.length === 0 && (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No reminders yet. Add one above.
                </p>
              )}
              {reminders.map((r, i) => (
                <div key={r.id}>
                  <div className="flex items-center gap-4 py-3">
                    <span className={`text-sm font-medium w-[72px] flex-shrink-0 ${r.enabled ? "text-white font-semibold" : "text-muted-foreground"}`}>
                      {r.time}
                    </span>
                    <span className={`flex-1 text-sm transition-colors ${r.enabled ? "text-foreground" : "text-muted-foreground line-through"}`}>
                      {r.text}
                    </span>
                    <div className="flex items-center gap-3">
                     
                      <button
                        onClick={() => toggleReminder(r.id)}
                        className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${r.enabled ? "bg-[#5e54b8]" : "bg-zinc-200 dark:bg-zinc-700"}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${r.enabled ? "left-[18px]" : "left-0.5"}`} />
                      </button>
                      <button
                        onClick={() => deleteReminder(r.id)}
                        className="text-muted-foreground hover:text-red-500 transition-colors p-0.5"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  {i < reminders.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="p-5">
          <CardContent className="p-0 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                Active days
              </p>
              <p className="text-xs text-muted-foreground">
                Reminders will only be sent on selected days.
              </p>
              <div className="grid grid-cols-7 gap-1.5">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`flex flex-col items-center py-2.5 rounded-lg text-xs font-medium transition-all ${
                      activeDays.includes(day)
                        ? "bg-[#5e54b8] text-white"
                        : "bg-muted text-muted-foreground hover:border-[#5e54b8]/40 border border-border"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                Summary
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Total reminders", value: total },
                  { label: "Active reminders", value: enabled },
                  { label: "Inactive reminders", value: total - enabled },
                  { label: "Active days", value: activeDays.length },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        
        <Card className="p-5">
          <CardContent className="p-0 flex flex-col gap-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
              Patient
            </p>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#ebe8ff] flex items-center justify-center font-semibold text-[#5e54b8]">
                {MOCK_PATIENT.initials}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold text-sm">{MOCK_PATIENT.name}</p>
                <p className="text-xs text-muted-foreground">
                  Age {MOCK_PATIENT.age} · {MOCK_PATIENT.diagnosis}
                </p>
              </div>
              
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
          <CardContent className="p-0 flex flex-col gap-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
              Quick add
            </p>
            <div className="flex flex-col gap-2">
              {[
                "Take morning medication",
                "Eat breakfast",
                "Walk outside",
                "Take evening medication",
                "Prepare for bed",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setReminders((prev) => [
                      ...prev,
                      {
                        id: Date.now().toString(),
                        time: "08:00 AM",
                        text: suggestion,
                        category: "other",
                        enabled: true,
                      },
                    ]);
                  }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted hover:bg-muted/70 border border-border hover:border-[#5e54b8]/40 transition-all text-left"
                >
                  <span className="text-sm text-foreground">{suggestion}</span>
                  <Plus size={14} className="text-muted-foreground flex-shrink-0" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      <Modal isOpen={isModalOpen}>
        <ReminderModal setModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
}