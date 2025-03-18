"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserData, UserData } from "@/utils/fetchData";
import { Container, Card, Spinner, Alert, Table, Badge ,Row,Col } from "react-bootstrap";
import Image from 'next/image';

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

  // ฟังก์ชันช่วยเลือกสีของ Badge ตามผลลัพธ์
  const getBadgeVariant = (result: string) => {
    switch (result) {
      case "ดีมาก":
        return "success";
      case "ดี":
        return "primary";
      case "ปานกลาง":
        return "warning";
      case "ต่ำ":
        return "danger";
      case "ต่ำมาก":
        return "dark";
      case "ผ่าน":
        return "primary";
      case "น้ำหนักเกิน":
        return "warning";
      case "สูงกว่า":
        return "success";
      default:
        return "secondary";
    }
  };

  const getBadgeVariantBMI = (result: number) => {
    if (result == -1) {
      return "warning"; // น้ำหนักต่ำกว่าเกณฑ์
    } else if (result == 0) {
      return "success"; // น้ำหนักปกติ
    } else if (result == 1) {
      return "warning"; // น้ำหนักเกิน
    } else if (result == 2) {
      return "danger"; // อ้วนระดับ 1
    } else {
      return "danger"; // อ้วนระดับ 2
    }
  };

  const tranVariantBMI = (result: number) => {
    if (result == -1) {
      return "น้ำหนักต่ำกว่าเกณฑ์";
    } else if (result == 0) {
      return "น้ำหนักปกติ";
    } else if (result == 1) {
      return "น้ำหนักเกิน";
    } else if (result == 2) {
      return "อ้วนระดับ 1";
    } else {
      return "อ้วนระดับ 2";
    }

  }
  const getBadgeVariantWrist = (result: number) => {
    if (result == 0) {
      return "success"; // น้อยกว่าเกณฑ์
    } else {
      return "danger"; // ปกติ
    }
  };
  const tranVarianWrist = (result: number) => {
    if (result == 0) {
      return "มาตรฐาน";
    } else {
      return "เกินมาตรฐาน";
    }
  };
  const tranVarianFlexible = (result: number) => {
    if (result == 1) {
      return "ต่ำกว่ามาตรฐาน";
    } else if (result == 2) {
      return "มาตรฐาน";
    } else {
      return "เกินมาตรฐาน";
    }
  };
  const getBadgeVariantFlexible = (result: number) => {
    if (result == 1) {
      return "warning"; // น้อยกว่าเกณฑ์
    } else if (result == 2) {
      return "primary"; // ปกติ
    } else {
      return "success"; // ปกติ
    }
  };
  const tranVariantfive = (result: number) => {
    if (result == 1) {
      return "ต่ำมาก";
    } else if (result == 2) {
      return "ต่ำ";
    } else if (result == 3) {
      return "ปานกลาง";
    } else if (result == 4) {
      return "ดี";
    } 
    else {
      return "ดีมาก";
    } 
  };

  const getBadgeVariantFive = (result: number) => {
    if (result == 1 || result == 2) {
      return "warning"; // น้อยกว่าเกณฑ์
    } else if (result == 3) {
      return "primary"; // ปกติ
    } else {
      return "success"; // ปกติ
    }
  }

  const getBadgeVariantHeartrate = (result: number) => {
    if (result == 1) {
      return "warning"; // น้อยกว่าเกณฑ์
    } else if (result == 2) {
      return "success"; // ปกติ
    } else {
      return "danger"; // ปกติ
    }
  }
  const tranVariantHeartrate = (result: number) => {
    if (result == 1 ) {
      return "ต่ำกว่ามาตรฐาน"; // น้อยกว่าเกณฑ์
    } else if (result == 2) {
      return "มาตรฐาน"; // ปกติ
    } else {
      return "สูงกว่ามาตรฐาน"; // ปกติ
    }
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">ข้อมูลสุขภาพของคุณ</h1>
      <Card className="shadow mb-4">
        <Card.Body>
          <h4>สวัสดี คุณ {userData.Name}</h4>
          <Row xs="1" md="4">
          <Col><strong>เพศ:</strong> {userData.Sex}</Col>
          <Col><strong>อายุ:</strong> {userData.Age}</Col>
          <Col><strong>น้ำหนัก:</strong> {userData.weight} กก.</Col>
          <Col><strong>ส่วนสูง:</strong> {userData.height} ซม.</Col>
          </Row>
        </Card.Body>
      </Card>

      <Table striped bordered hover>
        <thead className="table-warning text-center">
          <tr>
            <th>รายการทดสอบ</th>
            <th>ผลทดสอบ</th>
            <th>แปลผลทดสอบ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ดัชนีมวลกาย (BMI)</td>
            <td>{userData.BMI.toFixed(2)}</td>
            <td><Badge bg={getBadgeVariantBMI(userData.ResualtBMI)}>{tranVariantBMI(userData.ResualtBMI)}</Badge></td>
          </tr>
          <tr>
            <td>รอบเอว</td>
            <td>{userData.Waist} ซม.</td>
            <td><Badge bg={getBadgeVariantWrist(userData.ResualtWaist)}>{tranVarianWrist(userData.ResualtWaist)}</Badge></td>
          </tr>
          <tr>
            <td>ทดสอบแตะมือด้านหลัง มือขวา</td>
            <td>{userData.RightHand}</td>
            <td><Badge bg={getBadgeVariantFlexible(userData.ResualtRightHand)}>{tranVarianFlexible(userData.ResualtRightHand)}</Badge></td>
          </tr>
          <tr>
            <td>ทดสอบแตะมือด้านหลัง มือซ้าย</td>
            <td>{userData.LeftHand}</td>
            <td><Badge bg={getBadgeVariantFlexible(userData.ResualtLeftHand)}>{tranVarianFlexible(userData.ResualtLeftHand)}</Badge></td>
          </tr>
          <tr>
            <td>ทดสอบแรงบีบมือ</td>
            <td>{userData.Handstange}</td>
            <td><Badge bg={getBadgeVariantFive(userData.ResualtHandstange)}>{tranVariantfive(userData.ResualtHandstange)}</Badge></td>
          </tr>
          <tr>
            <td>นั่งงอตัวไปข้างหน้า</td>
            <td>{userData.Sit}</td>
            <td><Badge bg={getBadgeVariantFive(userData.ResualtSit)}>{tranVariantfive(userData.ResualtSit)}</Badge></td>
          </tr>
          <tr>
            <td>ทดสอบก้าวขึ้น-ลง 3 นาที</td>
            <td>{userData.Step}</td>
            <td><Badge bg={getBadgeVariantHeartrate(userData.ResualtStep)}>{tranVariantHeartrate(userData.ResualtStep)}</Badge></td>
          </tr>
        </tbody>
      </Table>

      <Image className="mt-3" src="/1.jpg" alt="Test Image" layout="responsive" width={100} height={50} />
      <Image className="mt-3" src={userData.Sex === "ชาย" ? "/2.1.jpg" : "/2.2.jpg"}  alt="Test Image" layout="responsive" width={100} height={50} />
      <Image className="mt-3" src={userData.Sex === "ชาย" ? "/3.1.jpg" : "/3.2.jpg"}  alt="Test Image" layout="responsive" width={100} height={50} />
      <Image className="mt-3" src="/4.jpg" alt="Test Image" layout="responsive" width={100} height={50} />

    </Container>

    
  );
}
