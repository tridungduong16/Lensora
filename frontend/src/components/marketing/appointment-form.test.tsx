import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppointmentForm } from "./appointment-form";

test("shows field-level errors for incomplete appointment details", async () => {
  const user = userEvent.setup();
  render(<AppointmentForm />);

  await user.click(screen.getByRole("button", { name: "Kiểm tra thông tin" }));

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
  expect(screen.getByLabelText("Họ và tên")).toHaveFocus();
});

test("focuses the first invalid field after submission", async () => {
  const user = userEvent.setup();
  render(<AppointmentForm />);

  await user.type(screen.getByLabelText("Họ và tên"), "Nguyễn Anh");
  await user.click(screen.getByRole("button", { name: "Kiểm tra thông tin" }));

  expect(screen.getByLabelText("Số điện thoại")).toHaveFocus();
  expect(
    screen.getByText("Nhập số điện thoại Việt Nam hợp lệ."),
  ).toBeInTheDocument();
});

test("keeps entered values when validation fails", async () => {
  const user = userEvent.setup();
  render(<AppointmentForm />);

  await user.type(screen.getByLabelText("Họ và tên"), "Nguyễn Anh");
  await user.type(screen.getByLabelText("Số điện thoại"), "123");
  await user.click(screen.getByRole("button", { name: "Kiểm tra thông tin" }));

  expect(screen.getByLabelText("Họ và tên")).toHaveValue("Nguyễn Anh");
  expect(screen.getByLabelText("Số điện thoại")).toHaveValue("123");
});

test("confirms only local validation and provides a phone fallback", async () => {
  const user = userEvent.setup();
  render(<AppointmentForm />);

  await user.type(screen.getByLabelText("Họ và tên"), "Nguyễn Anh");
  await user.type(screen.getByLabelText("Số điện thoại"), "0900 000 000");
  await user.click(screen.getByRole("button", { name: "Kiểm tra thông tin" }));

  expect(screen.getByRole("status")).toHaveTextContent(
    "Thông tin hợp lệ. Lịch hẹn chỉ được xác nhận qua điện thoại.",
  );
  expect(
    screen.getByRole("link", { name: "Gọi +84 85 806 0789" }),
  ).toHaveAttribute("href", "tel:+84858060789");
});
