"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserData, UserData } from "@/utils/fetchData";

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

  if (loading) return <p className="text-center">กำลังโหลดข้อมูล...</p>;
  if (!userData) return <p className="text-center text-red-500">ไม่พบข้อมูล</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">ข้อมูลสุขภาพของคุณ</h1>
      <div className="bg-white p-6 shadow-md rounded-lg">
        <p><strong>ชื่อ:</strong> {userData.Name}</p>
        <p><strong>เพศ:</strong> {userData.Sex}</p>
        <p><strong>อายุ:</strong> {userData.Age}</p>
        <p><strong>น้ำหนัก:</strong> {userData.weight} กก.</p>
        <p><strong>ส่วนสูง:</strong> {userData.height} ซม.</p>
        <p><strong>BMI:</strong> {userData.BMI.toFixed(2)}</p>
        <p><strong>รอบเอว:</strong> {userData.Waist} ซม.</p>
        <p><strong>แรงมือขวา:</strong> {userData.RightHand}</p>
        <p><strong>แรงมือซ้าย:</strong> {userData.LeftHand}</p>
        <p><strong>แรงแขน:</strong> {userData.Handstange}</p>
        <p><strong>นั่งงอเข่า:</strong> {userData.Sit}</p>
        <p><strong>ก้าวขึ้นลง:</strong> {userData.Step}</p>
      </div>
    </div>
  );
}
