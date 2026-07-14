import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppointmentForm } from "./appointment-form";

test("confirms a local appointment request", async () => {
  const user = userEvent.setup();

  render(<AppointmentForm />);

  await user.type(screen.getByLabelText("Họ và tên"), "Nguyễn Anh");
  await user.type(screen.getByLabelText("Số điện thoại"), "0900 000 000");
  await user.click(
    screen.getByRole("button", { name: "Gửi yêu cầu đặt lịch" }),
  );

  expect(screen.getByRole("status")).toHaveTextContent(
    "Anh Thi sẽ liên hệ lại để xác nhận lịch hẹn.",
  );
});
