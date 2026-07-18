import { render, screen } from "@testing-library/react";
import DoctorPage from "./page";

const milestones = [
  {
    title: "Tham dự Giỗ tổ ngành Mắt kính lần thứ 32",
    description:
      "Ngày 10/3/2026, tham dự Giỗ tổ ngành Mắt kính lần thứ 32, một sự kiện truyền thống nhằm tôn vinh nghề nghiệp và kết nối cộng đồng chuyên môn.",
  },
  {
    title: "Bằng khen Ngày Thầy thuốc Việt Nam 2026",
    description:
      "Dấu mốc ghi nhận thêm cho quá trình cống hiến trong ngành y, nhân dịp Ngày Thầy thuốc Việt Nam năm 2026.",
  },
  {
    title: "Hội nghị ngành Nhãn khoa Việt Nam (VIETCAN) tại Đà Nẵng",
    description:
      "Tham dự Hội nghị ngành Nhãn khoa Việt Nam tại Đà Nẵng, cập nhật kiến thức chuyên môn và trao đổi kinh nghiệm với đồng nghiệp trên cả nước.",
  },
  {
    title: "Nhận bằng khen của Chủ tịch UBND tỉnh Vĩnh Long",
    description:
      "Ngày 28/02/2025, vinh dự được trao bằng khen của Chủ tịch UBND tỉnh Vĩnh Long nhằm ghi nhận quá trình cống hiến trong công tác khám chữa bệnh.",
  },
  {
    title: "Trưởng khoa Bệnh viện Mắt Vĩnh Long",
    description:
      "Hơn 30 năm gắn bó với nhãn khoa, trực tiếp thăm khám và hướng dẫn chuyên môn cho đội ngũ y bác sĩ.",
  },
  {
    title: "Hội nghị Nhãn khoa tại Hong Kong",
    description:
      "Tham dự hội nghị nhãn khoa tại Hong Kong vào tháng 02/2018 để cập nhật xu hướng chuyên môn, mở rộng kết nối học thuật và trao đổi kinh nghiệm quốc tế.",
  },
  {
    title: "Nhận bằng Bác sĩ chuyên khoa 2: Đại học Y Dược TP.HCM",
    description:
      "Ngày 01/06/2014, hoàn thành chương trình đào tạo chuyên sâu và nhận bằng Bác sĩ chuyên khoa 2 tại Đại học Y Dược TP.HCM.",
  },
  {
    title: "Tham dự Hội nghị Nhãn khoa Toàn quốc",
    description:
      "Tham dự hội nghị chuyên ngành nhãn khoa toàn quốc để cập nhật kiến thức, trao đổi kinh nghiệm và kết nối chuyên môn với đồng nghiệp trong cả nước.",
  },
  {
    title: "Tốt nghiệp Bác sĩ đa khoa YK15: Đại học Y Dược Cần Thơ",
    description:
      "Niên khóa 1989 - 1995, lớp YK15. Nền tảng y khoa tổng quát, xây dựng tư duy lâm sàng toàn diện.",
  },
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
  expect(
    screen.getByText("ghi nhận nghề nghiệp qua danh hiệu Thầy thuốc ưu tú"),
  ).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Bác sĩ Nguyễn Anh Thi" })).toHaveAttribute(
    "data-priority",
    "true",
  );
});

test("renders all nine professional milestones with real photographs", () => {
  render(<DoctorPage />);

  expect(screen.getAllByRole("article")).toHaveLength(9);

  milestones.forEach(({ title, description }) => {
    expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: title })).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  expect(screen.getByText("10/03/2026")).toHaveAttribute("datetime", "2026-03-10");
  expect(screen.getByText("Công tác").tagName).toBe("SPAN");
});
