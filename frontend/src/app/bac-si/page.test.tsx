import { render, screen } from "@testing-library/react";
import DoctorPage from "./page";

const milestoneTitles = [
  "Tham dự Giỗ tổ ngành Mắt kính lần thứ 32",
  "Bằng khen Ngày Thầy thuốc Việt Nam 2026",
  "Hội nghị ngành Nhãn khoa Việt Nam (VIETCAN)",
  "Nhận bằng khen của Chủ tịch UBND tỉnh Vĩnh Long",
  "Trưởng khoa Bệnh viện Mắt Vĩnh Long",
  "Hội nghị Nhãn khoa tại Hong Kong",
  "Nhận bằng Bác sĩ chuyên khoa 2 — Đại học Y Dược TP.HCM",
  "Tham dự Hội nghị Nhãn khoa Toàn quốc",
  "Tốt nghiệp Bác sĩ đa khoa YK15 — Đại học Y Dược Cần Thơ",
];

test("renders the approved doctor profile and actions", () => {
  render(<DoctorPage />);

  expect(
    screen.getByRole("heading", { level: 1, name: "Bác sĩ Nguyễn Anh Thi" }),
  ).toBeInTheDocument();
  expect(screen.getByText("30+", { selector: "strong" })).toBeInTheDocument();
  expect(screen.getByText("CKII", { selector: "strong" })).toBeInTheDocument();
  expect(screen.getByText("Ưu tú", { selector: "strong" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Đặt lịch khám" })).toHaveAttribute(
    "href",
    "/#eye-exam",
  );
  expect(screen.getByRole("link", { name: "Xem hành trình" })).toHaveAttribute(
    "href",
    "#hanh-trinh",
  );
});

test("renders all nine professional milestones with real photographs", () => {
  render(<DoctorPage />);

  expect(screen.getAllByRole("article")).toHaveLength(9);

  milestoneTitles.forEach((title) => {
    expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: title })).toBeInTheDocument();
  });
});
