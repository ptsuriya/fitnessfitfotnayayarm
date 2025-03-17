"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserData, UserData } from "@/utils/fetchData";
import { Container, Card, Spinner, Alert } from "react-bootstrap";

export default function SlugPage() {
  const { slug } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const getData = async () => {
      const data = await fetchUserData(slug as string);
      setUserData(data);
      setLoading(false);
    };

    getData();
  }, [slug]);

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">กำลังโหลดข้อมูล...</span>
        </Spinner>
      </Container>
    );

  if (!userData)
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">ไม่พบข้อมูล</Alert>
      </Container>
    );

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">ข้อมูลสุขภาพของคุณ</h1>
      <Card className="shadow">
        <Card.Body>
          <Card.Title>สวัสดี คุณ {userData.Name}</Card.Title>
          <Card.Text>
            <strong>เพศ:</strong> {userData.Sex}
          </Card.Text>
          <Card.Text>
            <strong>อายุ:</strong> {userData.Age}
          </Card.Text>
          <Card.Text>
            <strong>น้ำหนัก:</strong> {userData.weight} กก.
          </Card.Text>
          <Card.Text>
            <strong>ส่วนสูง:</strong> {userData.height} ซม.
          </Card.Text>
          <Card.Text>
            <strong>BMI:</strong> {userData.BMI.toFixed(2)} ผล {userData.ResualtWaist} โดยการประมวนผลคือ -1 น้อย / 0 ปกติ /1 อันตรายระดับ 1/2 อันตรายระดับ 2/3 อันตรายระดับ 3  
          </Card.Text>
          <Card.Text>
            <strong>รอบเอว:</strong> {userData.Waist} ซม. ผล {userData.ResualtWaist} โดยการประมวนผลคือ 0 คือ มาตรฐาน 1 คือ เกินเกณฑ์
          </Card.Text>
          <Card.Text>
            <strong>แรงมือขวา:</strong> {userData.RightHand} ผล {userData.ResualtRightHand} โดยการประมวนผลคือ (ต่ำมาก 1 / ต่ำ 2 / ปานกลาง 3 / ดี 4 / ดีมาก 5)
          </Card.Text>
          <Card.Text>
            <strong>แรงมือซ้าย:</strong> {userData.LeftHand} ผล {userData.ResualtLeftHand} โดยการประมวนผลคือ (ต่ำมาก 1 / ต่ำ 2 / ปานกลาง 3 / ดี 4 / ดีมาก 5)
          </Card.Text>
          <Card.Text>
            <strong>แรงแขน:</strong> {userData.Handstange} ผล {userData.ResualtHandstange} โดยการประมวนผลคือ (ต่ำมาก 1 / ต่ำ 2 / ปานกลาง 3 / ดี 4 / ดีมาก 5)
          </Card.Text>
          <Card.Text>
            <strong>นั่งงอเข่า:</strong> {userData.Sit} ผล {userData.ResualtSit} โดยการประมวนผลคือ (ต่ำมาก 1 / ต่ำ 2 / ปานกลาง 3 / ดี 4 / ดีมาก 5)
          </Card.Text>
          <Card.Text>
            <strong>ก้าวขึ้นลง:</strong> {userData.Step} ผล {userData.ResualtStep} โดยการประมวนผลคือ (ต่ำมาก 1 / ต่ำ 2 / ปานกลาง 3 / ดี 4 / ดีมาก 5)
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
