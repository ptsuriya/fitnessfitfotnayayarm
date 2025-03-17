import axios from "axios";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxowWaMo8-hrJU8daMK09bzNrgjkRYSxgm87fq7lA_CJoBIJ1cCdR8vDp3XoQecr1D7Dw/exec";

export interface UserData {
  ID: string;
  Name: string;
  Sex: string;
  weight: number;
  height: number;
  BMI: number;
  ResualtBMI: number;
  Waist: number;
  ResualtWaist: number;
  Age: string;
  RightHand: number;
  ResualtRightHand: number;
  LeftHand: number;
  ResualtLeftHand: number;
  Handstange: number;
  ResualtHandstange: number;
  Sit: number;
  ResualtSit: number;
  Step: number;
  ResualtStep: number;
}

// ฟังก์ชันดึงข้อมูลจาก API
export const fetchUserData = async (slug: string): Promise<UserData | null> => {
  try {
    const response = await axios.get(API_URL, {
      params: { path: "API", action: "read" },
    });

    const user = response.data.data.find((user: UserData) => user.ID == slug);
    return user || null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
