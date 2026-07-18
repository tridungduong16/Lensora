"use client";

import { Check } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";

type AppointmentErrors = {
  name?: string;
  phone?: string;
};

const vietnamesePhone = /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/;

function validateAppointment(form: FormData): AppointmentErrors {
  const name = String(form.get("name") ?? "").trim();
  const phone = String(form.get("phone") ?? "").replace(/[\s.-]/g, "");
  const errors: AppointmentErrors = {};

  if (!name) {
    errors.name = "Nhập họ và tên của bạn.";
  }

  if (!vietnamesePhone.test(phone)) {
    errors.phone = "Nhập số điện thoại Việt Nam hợp lệ.";
  }

  return errors;
}

export function AppointmentForm() {
  const [errors, setErrors] = useState<AppointmentErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (errors.name) {
      nameInputRef.current?.focus();
    } else if (errors.phone) {
      phoneInputRef.current?.focus();
    }
  }, [errors]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAppointment(new FormData(event.currentTarget));
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    event.currentTarget.reset();
    setSubmitted(true);
  }

  return (
    <form className="appointment-form" noValidate onSubmit={handleSubmit}>
      <div className="appointment-fields">
        <div className="appointment-field">
          <label htmlFor="appointment-name">Họ và tên</label>
          <input
            aria-describedby={
              errors.name ? "appointment-name-error" : undefined
            }
            aria-invalid={errors.name ? "true" : undefined}
            id="appointment-name"
            name="name"
            placeholder="Nguyễn Anh"
            ref={nameInputRef}
            required
            type="text"
          />
          {errors.name ? (
            <span className="field-error" id="appointment-name-error">
              {errors.name}
            </span>
          ) : null}
        </div>

        <div className="appointment-field">
          <label htmlFor="appointment-phone">Số điện thoại</label>
          <input
            aria-describedby={
              errors.phone ? "appointment-phone-error" : undefined
            }
            aria-invalid={errors.phone ? "true" : undefined}
            id="appointment-phone"
            name="phone"
            placeholder="0900 000 000"
            ref={phoneInputRef}
            required
            type="tel"
          />
          {errors.phone ? (
            <span className="field-error" id="appointment-phone-error">
              {errors.phone}
            </span>
          ) : null}
        </div>

        <div className="appointment-field">
          <label htmlFor="appointment-need">Nhu cầu</label>
          <select defaultValue="eye-test" id="appointment-need" name="need">
            <option value="eye-test">Đo mắt và tư vấn kính thuốc</option>
            <option value="sunglasses">
              Tư vấn kính mát theo khuôn mặt
            </option>
            <option value="frames">
              Tìm gọng kính theo nhu cầu công việc
            </option>
          </select>
        </div>
      </div>

      <div className="appointment-actions">
        <button className="primary-button form-submit" type="submit">
          Gửi yêu cầu đặt lịch
          <Check aria-hidden="true" size={18} strokeWidth={1.75} />
        </button>
        {submitted ? (
          <p className="appointment-status" role="status">
            Thông tin đã được kiểm tra trên thiết bị này. Gọi Anh Thi để xác
            nhận lịch hẹn.
          </p>
        ) : (
          <p className="appointment-note">
            Chúng tôi chưa gửi dữ liệu lên máy chủ. Vui lòng gọi cửa hàng để
            xác nhận.
          </p>
        )}
        <a className="appointment-phone" href="tel:0908123456">
          Gọi 0908 123 456
        </a>
      </div>
    </form>
  );
}
