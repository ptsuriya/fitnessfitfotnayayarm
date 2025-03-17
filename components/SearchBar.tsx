"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [id, setId] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      router.push(`/${id}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-6">
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="input input-bordered w-full max-w-xs"
        placeholder="กรอกไอดีของคุณ..."
      />
      <button type="submit" className="btn btn-primary ml-2">
        ค้นหา
      </button>
    </form>
  );
}
