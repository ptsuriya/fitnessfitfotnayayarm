"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";

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
    <Form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
      <Form.Control
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="กรอกไอดีของคุณ..."
        className="w-50"
      />
      <Button variant="primary" type="submit" className="ms-2">
        ค้นหา
      </Button>
    </Form>
  );
}
