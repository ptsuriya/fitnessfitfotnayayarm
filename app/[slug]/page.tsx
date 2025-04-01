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

  const getBMIMessage = (bmi: number, result: number) => {
    let message = `<h4><b>ดัชนีมวลกาย(BMI) ของคุณ</b> คือ ${bmi.toFixed(2)}.</h4> `;
    if (result == -1) {
      message += "คุณควรเพิ่มน้ำหนักโดยการทานอาหารที่มีประโยชน์และออกกำลังกายอย่างสม่ำเสมอ";
    } else if (result == 0) {
      message += "คุณมีน้ำหนักที่เหมาะสมแล้ว ควรดูแลรักษาสุขภาพให้ดีอยู่เสมอ";
    } else if (result == 1) {
      message += "คุณควรควบคุมน้ำหนักโดยการทานอาหารที่มีประโยชน์และออกกำลังกายอย่างสม่ำเสมอ";
    } else if (result == 2) {
      message += "คุณควรควบคุมน้ำหนักอย่างจริงจังโดยการปรึกษาแพทย์หรือผู้เชี่ยวชาญด้านโภชนาการ";
    } else {
      message += "คุณควรควบคุมน้ำหนักอย่างจริงจังโดยการปรึกษาแพทย์หรือผู้เชี่ยวชาญด้านโภชนาการโดยด่วน";
    }
    return message;
  };
  
  const getWaistMessage = (waist: number, result: number) => {
    let message = `<h4 class="mt-3"><b>รอบเอวของคุณ</b> คือ ${waist} ซม. </h4>`;
    if (result == 0) {
      message += "รอบเอวของคุณอยู่ในเกณฑ์มาตรฐาน ควรดูแลรักษาสุขภาพให้ดีอยู่เสมอ";
    } else {
      message += "รอบเอวของคุณเกินเกณฑ์มาตรฐาน ควรควบคุมอาหารและออกกำลังกายอย่างสม่ำเสมอ";
    }
    return message;
  };

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
      return "ต่ำมาก"; 
    } else if (result == 2) {
      return "ต่ำ"; 
    }else if (result == 3) {
      return "พอใช้"; 
    }else if (result == 4) {
      return "ปานกลาง"; 
    }else if (result == 5) {
      return "ดี"; 
    }else if (result == 6) {
      return "ดีมาก"; 
    } else {
      return "ดีเยี่ยม"; 
    }
  }
  const getHeartRateMessage = (result: number) => {
    let message = "";
    if (result >= 5) { // ดีเยี่ยม / ดีมาก / ดี
      message = `จากการวัดอัตราการเต้นหัวใจของท่าน แสดงว่า ท่านเคลื่อนไหวและออกกำลังกายอย่างสม่ำเสมอ จึงทำให้อัตราการเต้นหัวใจของท่านเต้นช้าลง ในระหว่างการออกกำลังกาย หรือขณะพักแสดงว่า หัวใจของท่านทำงานมีประสิทธิภาพมาก ลดความเสี่ยงต่อการเกิดโรคเรื้อรังและการตายก่อนวัยอันควร <br/><br/> <b>ข้อแนะนำ:</b> ควรออกกำลังกายแบบแอโรบิกอย่างสม่ำเสมอต่อไป`;
    } else if (result >= 3) { // ปานกลาง / พอใช้
      message = `จากการวัดอัตราการเต้นหัวใจของท่าน แสดงว่า ท่านเคลื่อนไหวและออกกำลังกายยังไม่ค่อยสม่ำเสมอ จึงทำให้อัตราการเต้นหัวใจของท่านยังค่อนข้างสูง ท่านมีความเสี่ยงเพิ่มขึ้นต่อการเกิดโรคเบาหวาน ความดันโลหิตสูง หลอดเลือดหัวใจตีบ และโรคเรื้อรังอื่นๆ <br/><br/> <b>ข้อแนะนำ:</b> ควรเคลื่อนไหวและออกกำลังกายอย่างสม่ำเสมอทุกวัน หรือเกือบทุกวัน อย่างน้อยให้เหนื่อยพอควร โดยหายใจกระชั้นขึ้น`;
    } else { // ต่ำ / ต่ำมาก
      message = `จากการวัดอัตราการเต้นหัวใจของท่าน แสดงว่า ท่านไม่ค่อยเคลื่อนไหวและออกกำลังกาย และเมื่อออกแรงหรือออกกำลังกายเล็กน้อย อัตราการเต้นหัวใจของท่านจึงสูงมาก ท่านมีความเสี่ยงสูงมากต่อการเกิดโรคเบาหวาน ความดันโลหิตสูง หลอดเลือดหัวใจตีบ และโรคเรื้อรังอื่นๆ และการตายก่อนวัยอันควร <br/><br/> <b>ข้อแนะนำ:</b> ถ้าท่านไม่ค่อยเคลื่อนไหวและออกกำลังกาย เริ่มแรกควรออกกำลังเบาๆ ที่ง่ายที่สุด คือ การเดิน ใช้เวลาน้อยๆ ก่อน จากนั้นค่อยๆ เพิ่มเวลาขึ้นในแต่ละสัปดาห์ โดยยังไม่เพิ่มความหนัก เมื่อร่างกายปรับตัวได้ จึงค่อยเพิ่มความหนักหรือความเหนื่อยตามที่ต้องการ ท้ายที่สุดท่านก็สามารถทำได้`;
    }
    return message;
  };

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

        </tbody>
      </Table>

      <div className="mt-4" dangerouslySetInnerHTML={{ __html: getBMIMessage(userData.BMI, userData.ResualtBMI) }} />
      <div className="mb-5" dangerouslySetInnerHTML={{ __html: getWaistMessage(userData.Waist, userData.ResualtWaist) }} />
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
        </tbody>
      </Table>
      <Row xs="1" lg="2" className="mb-5">
      <Col><Image className="mt-3 w-100" src="/1.jpg" alt="Test Image" layout="responsive" width={100} height={50} /></Col>
      <Col><Image className="mt-3 w-100" src={userData.Sex === "ชาย" ? "/2.1.jpg" : "/2.2.jpg"}  alt="Test Image" layout="responsive" width={100} height={50} /></Col>
      <Col><Image className="mt-3 w-100" src={userData.Sex === "ชาย" ? "/3.1.jpg" : "/3.2.jpg"}  alt="Test Image" layout="responsive" width={100} height={50} /></Col>
      </Row>
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
            <td>ทดสอบก้าวขึ้น-ลง 3 นาที</td>
            <td>{userData.Step}</td>
            <td><Badge bg={getBadgeVariantHeartrate(userData.ResualtStep)}>{tranVariantHeartrate(userData.ResualtStep)}</Badge></td>
          </tr>
        </tbody>
      </Table>
      <h2>ผลการวัดอัตราการเต้นหัวใจ: {tranVariantHeartrate(userData.ResualtStep)}</h2>
      <p dangerouslySetInnerHTML={{ __html: getHeartRateMessage(userData.ResualtStep) }} />
      <Row xs="1" lg="2" className="mb-5">
      <Col><Image className="my-3 w-100" src={userData.Sex === "ชาย" ? "/4.1.jpg" : "/4.2.jpg"} alt="Test Image" layout="responsive" width={100} height={50} /></Col>
      </Row>
    </Container>

    
  );
}
