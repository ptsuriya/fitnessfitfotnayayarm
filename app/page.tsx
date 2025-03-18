"use client";

import { Container, Row, Col } from "react-bootstrap";
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
    <Container className="py-4">
      <h1 className="text-center mb-4">ผลการตรวจสมรรถภาพของคุณ</h1>
      <SearchBar />

      <Row className="mt-4">
        {videos.map((id) => (
          <Col key={id} xs={12} md={6} className="mb-3">
            <iframe
              className="w-100"
              style={{ height: "200px" }}
              src={`https://www.youtube.com/embed/${id}`}
              allowFullScreen
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
