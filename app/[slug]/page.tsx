"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserData, UserData } from "@/utils/fetchData";
import { Container, Card, Spinner, Alert, Row, Col } from "react-bootstrap";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

// 📌 ฟังก์ชันสร้าง Plugin สำหรับ "เข็มชี้ค่า"
const drawNeedle = (chart: any, value: number, maxValue: number) => {
  const { ctx, chartArea: { width, height } } = chart;
  const angle = Math.PI * (1 + (value / maxValue)); // คำนวณองศา
  const cx = width / 2;
  const cy = height - 10;
  const radius = width / 2.5;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, -5);
  ctx.lineTo(radius, 0);
  ctx.lineTo(0, 5);
  ctx.fillStyle = "black"; // เปลี่ยนเข็มเป็น "สีดำ"
  ctx.fill();
  ctx.restore();
};

// 📌 Plugin สำหรับ "เข็ม"
const needlePlugin = {
  id: "needle",
  afterDatasetsDraw(chart: any) {
    const { datasets } = chart.config.data;
    if (datasets.length > 0 && datasets[0].needleValue !== undefined) {
      drawNeedle(chart, datasets[0].needleValue, datasets[0].maxValue);
    }
  },
};

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

  const summaryInfo = (
    <>
      <strong>ชื่อ:</strong> {userData.Name} | <strong>เพศ:</strong> {userData.Sex} |  
      <strong>อายุ:</strong> {userData.Age} ปี | <strong>น้ำหนัก:</strong> {userData.weight} กก. |  
      <strong>ส่วนสูง:</strong> {userData.height} ซม. | <strong>รอบเอว:</strong> {userData.Waist} ซม.
    </>
  );

  // 📌 ฟังก์ชันสร้าง Gauge Data + ลูกศร
  const createGaugeData = (value: number, maxValue: number, colors: string[]) => {
    return {
      labels: ["ต่ำมาก", "ต่ำ", "ปานกลาง", "ดี", "ดีมาก"],
      datasets: [
        {
          data: [1, 1, 1, 1, 1],
          backgroundColor: colors,
          borderWidth: 0,
          circumference: 180,
          rotation: -90,
          needleValue: value,
          maxValue: maxValue,
        },
      ],
    };
  };

  // 📌 สีของกราฟ
  const bmiColors = ["#FFD700", "#32CD32", "#FF4500", "#FF0000", "#8B0000"];
  const gaugeColors = ["#FF0000", "#FF8C00", "#FFD700", "#9ACD32", "#32CD32"];

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">ข้อมูลสุขภาพของคุณ</h1>
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">{summaryInfo}</Card.Header>
        <Card.Body>
          <Row className="mt-4">
            {/* ✅ BMI Gauge */}
            <Col lg={4} md={6} sm={12} className="d-flex flex-column align-items-center">
              <h6>BMI</h6> 
              <Doughnut 
                data={createGaugeData(userData.BMI, 40, bmiColors)} 
                plugins={[needlePlugin]} 
              />
              <p><strong>BMI:</strong> {userData.BMI.toFixed(2)}</p>
            </Col>

            {/* ✅ แรงมือขวา */}
            <Col lg={4} md={6} sm={12} className="d-flex flex-column align-items-center">
              <h6>แรงมือขวา</h6>
              <Doughnut 
                data={createGaugeData(userData.ResualtRightHand, 5, gaugeColors)} 
                plugins={[needlePlugin]} 
              />
            </Col>

            {/* ✅ แรงมือซ้าย */}
            <Col lg={4} md={6} sm={12} className="d-flex flex-column align-items-center">
              <h6>แรงมือซ้าย</h6>
              <Doughnut 
                data={createGaugeData(userData.ResualtLeftHand, 5, gaugeColors)} 
                plugins={[needlePlugin]} 
              />
            </Col>

            {/* ✅ แรงแขน */}
            <Col lg={4} md={6} sm={12} className="d-flex flex-column align-items-center">
              <h6>แรงแขน</h6>
              <Doughnut 
                data={createGaugeData(userData.ResualtHandstange, 5, gaugeColors)} 
                plugins={[needlePlugin]} 
              />
            </Col>

            {/* ✅ นั่งงอเข่า */}
            <Col lg={4} md={6} sm={12} className="d-flex flex-column align-items-center">
              <h6>นั่งงอเข่า</h6>
              <Doughnut 
                data={createGaugeData(userData.ResualtSit, 5, gaugeColors)} 
                plugins={[needlePlugin]} 
              />
            </Col>

            {/* ✅ ก้าวขึ้นลง */}
            <Col lg={4} md={6} sm={12} className="d-flex flex-column align-items-center">
              <h6>ก้าวขึ้นลง</h6>
              <Doughnut 
                data={createGaugeData(userData.ResualtStep, 5, gaugeColors)} 
                plugins={[needlePlugin]} 
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
