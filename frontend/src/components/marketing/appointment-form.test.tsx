import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppointmentForm } from "./appointment-form";

test("shows field-level errors for incomplete appointment details", async () => {
  const user = userEvent.setup();
  render(<AppointmentForm />);

  await user.click(
    screen.getByRole("button", { name: "Gửi yêu cầu đặt lịch" }),
  );

  expect(screen.getByText("Nhập họ và tên của bạn.")).toBeInTheDocument();
  expect(
    screen.getByText("Nhập số điện thoại Việt Nam hợp lệ."),
  ).toBeInTheDocument();
  expect(screen.getByLabelText("Họ và tên")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  expect(screen.getByLabelText("Số điện thoại")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
});

test("keeps entered values when validation fails", async () => {
  const user = userEvent.setup();
  render(<AppointmentForm />);

  await user.type(screen.getByLabelText("Họ và tên"), "Nguyễn Anh");
  await user.type(screen.getByLabelText("Số điện thoại"), "123");
  await user.click(
    screen.getByRole("button", { name: "Gửi yêu cầu đặt lịch" }),
  );

  expect(screen.getByLabelText("Họ và tên")).toHaveValue("Nguyễn Anh");
  expect(screen.getByLabelText("Số điện thoại")).toHaveValue("123");
});

test("confirms only local validation and provides a phone fallback", async () => {
  const user = userEvent.setup();
  render(<AppointmentForm />);

  await user.type(screen.getByLabelText("Họ và tên"), "Nguyễn Anh");
  await user.type(screen.getByLabelText("Số điện thoại"), "0900 000 000");
  await user.click(
    screen.getByRole("button", { name: "Gửi yêu cầu đặt lịch" }),
  );

  expect(screen.getByRole("status")).toHaveTextContent(
    "Thông tin đã được kiểm tra trên thiết bị này. Gọi Anh Thi để xác nhận lịch hẹn.",
  );
  expect(screen.getByRole("link", { name: "Gọi 0908 123 456" })).toHaveAttribute(
    "href",
    "tel:0908123456",
  );
});
