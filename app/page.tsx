"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const videos = [
    "jxY6-snkdSM",
    "JqbrL1LzlDA",
    "e66dPyhmJ-c",
    "uExFal2XeJY",
    "qZ02UNoTnbM",
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">ตรวจสุขภาพของคุณ</h1>
      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {videos.map((id) => (
          <iframe
            key={id}
            className="w-full h-60"
            src={`https://www.youtube.com/embed/${id}`}
            allowFullScreen
          />
        ))}
      </div>
    </div>
  );
}
