import { AppointmentForm } from "@/components/marketing/appointment-form";
import { StorefrontFooter } from "@/components/marketing/storefront-footer";
import { StorefrontHeader } from "@/components/marketing/storefront-header";
import { storefrontNavigation } from "@/components/marketing/storefront-navigation";
import { eyeServices } from "@/components/marketing/storefront-data";

export function EyeExamPage() {
  return (
    <div className="site-shell">
      <StorefrontHeader navItems={storefrontNavigation} />

      <main id="main-content">
        <section className="section service-section" aria-labelledby="eye-exam-title">
          <div className="section-heading">
            <h1 id="eye-exam-title">Đo mắt</h1>
            <p>Đặt lịch trước để có đủ thời gian đo mắt, thử gọng và nhận tư vấn riêng.</p>
          </div>

          <div className="service-grid">
            {eyeServices.map((service) => {
              const Icon = service.icon;

              return (
                <article className="service-item" key={service.title}>
                  <Icon aria-hidden="true" size={24} strokeWidth={1.6} />
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              );
            })}
          </div>

          <AppointmentForm />
        </section>
      </main>

      <StorefrontFooter />
    </div>
  );
}
