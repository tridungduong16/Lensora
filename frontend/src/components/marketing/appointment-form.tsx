"use client";

import { Check } from "lucide-react";
import { FormEvent, useState } from "react";

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSubmitted(true);
  }

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div className="appointment-fields">
        <label>
          Họ và tên
          <input name="name" placeholder="Nguyễn Anh" required type="text" />
        </label>
        <label>
          Số điện thoại
          <input name="phone" placeholder="0900 000 000" required type="tel" />
        </label>
        <label>
          Nhu cầu
          <select defaultValue="eye-test" name="need">
            <option value="eye-test">Đo mắt và tư vấn kính thuốc</option>
            <option value="sunglasses">Tư vấn kính mát theo khuôn mặt</option>
            <option value="frames">Tìm gọng kính theo nhu cầu công việc</option>
          </select>
        </label>
      </div>

      <div className="appointment-actions">
        <button className="primary-button form-submit" type="submit">
          Gửi yêu cầu đặt lịch
          <Check aria-hidden="true" size={18} strokeWidth={1.75} />
        </button>
        {submitted ? (
          <p className="appointment-status" role="status">
            Đã ghi nhận yêu cầu. Anh Thi sẽ liên hệ lại để xác nhận lịch hẹn.
          </p>
        ) : (
          <p className="appointment-note">Chúng tôi sẽ xác nhận thời gian phù hợp qua điện thoại.</p>
        )}
      </div>
    </form>
  );
}
