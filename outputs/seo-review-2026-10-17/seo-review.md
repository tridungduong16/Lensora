# SEO địa phương cho Kính thuốc Anh Thi

Kiểm tra ngày 17/10/2026 trên bản build production chạy local. Chưa triển khai lên website công khai hoặc gửi dữ liệu tới Search Console.

## Nhóm tìm kiếm và trang đích

| Nhu cầu tìm kiếm | Trang chính | Nội dung |
| --- | --- | --- |
| Kính thuốc Vĩnh Long | `/` | Tiêu đề, H1, giới thiệu cửa hàng, sản phẩm và liên kết dịch vụ |
| Đo mắt Vĩnh Long | `/do-mat` | Thông tin dịch vụ, quy trình, chuẩn bị lịch hẹn và liên hệ |
| Khám mắt ở Vĩnh Long | `/do-mat` | Câu hỏi hướng dẫn trao đổi nhu cầu, xác nhận dịch vụ và lịch bác sĩ trước khi đến |
| Cửa hàng kính thuốc Vĩnh Long | `/cua-hang` | Địa chỉ, số điện thoại, giờ mở cửa, bản đồ |
| Gọng kính Vĩnh Long | `/gong-kinh` | Ảnh, chất liệu, thương hiệu và giá tham khảo |
| Kính mát Vĩnh Long | `/kinh-ram` | Các mẫu kính mát và thông tin xác nhận mẫu, màu |
| Bác sĩ Nguyễn Anh Thi Vĩnh Long | `/bac-si` | Hồ sơ chuyên môn hiện có và liên hệ lịch hẹn |

Không tạo thêm các trang sao chép chỉ khác từ khóa. Nội dung đo mắt không khẳng định cửa hàng mở phòng khám, cung cấp mọi dịch vụ khám chuyên khoa hoặc có bác sĩ trực toàn bộ giờ mở cửa.

## Các thay đổi đã thực hiện

- Metadata riêng theo trang: title, description, canonical, Open Graph và Twitter Card; tên miền chuẩn `https://kinhthuocanhthi.com`.
- Metadata được xuất trong `<head>` của HTML ban đầu cho cả trình duyệt và crawler. Tắt metadata streaming do bản kiểm tra đầu phát hiện description nằm trong body trên trang chủ động.
- `/robots.txt` cho phép crawler truy cập và trỏ đến `/sitemap.xml`.
- Sitemap có 23 URL chính và 24 ảnh sản phẩm. `/kinh-mat` dùng canonical `/gong-kinh`; các bộ lọc trên trang chủ dùng canonical trang chủ, không sinh URL sitemap theo query.
- JSON-LD `Optician` và `WebSite` dùng số `+84858060789`, địa chỉ 85 Phạm Thái Bường, Phường 4, Vĩnh Long, tọa độ được cung cấp và giờ mở cửa 09:00–20:30. Dữ liệu `Service` mô tả đo mắt/tư vấn kính; breadcrumb hỗ trợ trang dịch vụ, cửa hàng, danh mục và sản phẩm.
- Không đưa giá tham khảo của nhà bán lẻ vào Offer của Anh Thi; không tạo đánh giá, dịch vụ khám hoặc hồ sơ mạng xã hội chưa được xác nhận.
- Ảnh chia sẻ 1200 × 630: `frontend/public/images/anh-thi-vinh-long.png`.

## Kiểm tra

- **78 tests** trên 23 file đạt; build production, kiểm tra TypeScript và `git diff --check` đạt.
- 24 trang trả HTTP 200, có một H1, description, canonical, thông tin chia sẻ và JSON-LD hợp lệ. Canonical được kiểm tra theo tên miền công khai.
- Ba URL không tồn tại trả HTTP 404; không có soft 404 trong các trường hợp thử.
- Không phát hiện tràn ngang trên trang nội dung mới ở 375, 768 và 1280px. Câu hỏi native disclosure hoạt động bằng bàn phím.
- Lighthouse mobile: **SEO 100**, accessibility 100, best practices 100, performance 91. LCP giả lập 3,2 giây; CLS 0,092; TBT 0ms.
- Báo cáo máy đọc được: `validation.json`. Báo cáo Lighthouse: `lighthouse-home.report.html`.

## Sau khi triển khai

1. Kiểm tra trực tiếp canonical, robots, sitemap, số điện thoại và địa chỉ trên tên miền công khai.
2. Dùng Rich Results Test kiểm tra dữ liệu có cấu trúc và URL Inspection trong Search Console của chủ sở hữu.
3. Gửi sitemap công khai trong Search Console; theo dõi việc thu thập và lập chỉ mục.
4. Giữ thông tin địa chỉ, số điện thoại và giờ mở cửa trên Google Business Profile nhất quán với website. Xác nhận lại giờ mở cửa, địa chỉ hành chính và lịch bác sĩ khi thông tin thay đổi.

Điểm kiểm tra kỹ thuật không xác nhận thứ hạng hay việc Google đã lập chỉ mục. Việc thu thập và hiển thị được đánh giá sau khi triển khai.

## Tài liệu tham chiếu

- [Google: Local Business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google: canonical và URL trùng lặp](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: title links](https://developers.google.com/search/docs/appearance/title-link)
- [Next.js: metadata và ảnh chia sẻ](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js: htmlLimitedBots và metadata streaming](https://nextjs.org/docs/app/api-reference/config/next-config-js/htmlLimitedBots)
- [Schema.org: Optician](https://schema.org/Optician)
