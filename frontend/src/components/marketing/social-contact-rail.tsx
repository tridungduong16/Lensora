export const storefrontSocialProfiles = {
  zalo: "https://zalo.me/0858060789",
  facebook: "https://www.facebook.com/kinhthuocanhthi",
  tiktok: "https://www.tiktok.com/@kinhthuocanhthivl",
};

const channels = [
  { id: "zalo", name: "Zalo", action: "Nhắn qua Zalo" },
  { id: "facebook", name: "Facebook", action: "Xem Facebook Anh Thi" },
  { id: "tiktok", name: "TikTok", action: "Xem TikTok Anh Thi" },
] as const;

export function SocialContactRail() {
  return (
    <nav className="social-contact-rail" aria-label="Kết nối với Anh Thi">
      {channels.map(({ id, name, action }) => {
        const href = storefrontSocialProfiles[id];
        if (!href) return null;
        return (
          <a
            key={id}
            className={`social-contact-rail__link social-contact-rail__link--${id}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={action}
          >
            <img
              src={`/icons/social/${id}.svg`}
              width={24}
              height={24}
              alt=""
            />
            <span className="social-contact-rail__label">{name}</span>
          </a>
        );
      })}
    </nav>
  );
}
