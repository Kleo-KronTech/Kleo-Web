"use client";
//i don't think i need this anymore

import ReminderModal from "@/src/components/modals/reminder-modal";

export default function AddTaskPage() {
  return (
    <div className="flex w-full justify-center py-10">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
        <ReminderModal setModalOpen={() => {}} />
      </div>
    </div>
  );
}