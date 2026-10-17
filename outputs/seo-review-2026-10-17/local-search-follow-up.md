# Theo dõi SEO “đo mắt ở Vĩnh Long”

Kiểm tra ngày 17/10/2026 trên website công khai https://kinhthuocanhthi.com.

## Kết quả kiểm tra trực tiếp

- `/do-mat` trả HTTP 200; canonical là `https://kinhthuocanhthi.com/do-mat`, robots `index, follow`, không có header X-Robots-Tag chặn lập chỉ mục.
- `/robots.txt` cho phép truy cập và trỏ đến sitemap. `/sitemap.xml` có URL `/do-mat`.
- Trang dịch vụ có nội dung đo mắt, quy trình, thông tin chuẩn bị, số điện thoại và liên kết bác sĩ/cửa hàng. Không thêm giá, thiết bị, thời gian khám hoặc lịch bác sĩ chưa được xác nhận.
- Google Search Console của tài khoản đang đăng nhập chưa hiển thị thuộc tính website. Người dùng xác nhận chưa có Search Console. Đã chuẩn bị URL-prefix `https://kinhthuocanhthi.com/`; chưa tạo hoặc xác minh quyền sở hữu.
- Tìm được hồ sơ Google Maps công khai “Kính Thuốc Anh Thi”, số +84 858 060 789, địa chỉ 85 Phạm Thái Bường, Phước Hậu, Vĩnh Long. Hồ sơ có nút “Add website”, chưa hiển thị liên kết website.
- Maps ghi giờ thứ Hai–thứ Sáu 11:00–12:00 và 17:00–19:00; thứ Bảy–Chủ nhật 08:30–11:00 và 17:00–19:00. Website đang ghi 09:00–20:30 mỗi ngày. Đang chờ chủ cửa hàng xác nhận giờ thực tế; chưa sửa hồ sơ Maps hay giờ trên website.
- Vị trí ghim Maps khác tọa độ Bing đã được cung cấp. Cần xác nhận trước khi đồng bộ tọa độ.

[Hồ sơ Maps được kiểm tra](https://www.google.com/maps/place/K%C3%ADnh+Thu%E1%BB%91c+Anh+Thi/@10.2447966,105.9781691,17z/data=!3m1!4b1!4m6!3m5!1s0x310a9d36d070260f:0x567248273943003f!8m2!3d10.2447966!4d105.9781691!16s%2Fg%2F11g886z6bg)

## Việc ưu tiên và cách xác nhận

1. **Xác minh Search Console** bằng tài khoản chủ sở hữu được người dùng xác nhận. Gửi `https://kinhthuocanhthi.com/sitemap.xml`; kiểm tra URL `/do-mat` bằng URL Inspection và yêu cầu lập chỉ mục nếu phù hợp. Lưu kết quả thực tế, không suy ra tình trạng lập chỉ mục từ điểm Lighthouse hoặc kết quả tìm kiếm của một công cụ khác.
2. **Đồng bộ hồ sơ doanh nghiệp**: xác nhận đúng hồ sơ, giờ mở cửa cửa hàng và lịch bác sĩ; thêm website chính thức từ tài khoản có quyền quản lý hồ sơ. Chỉ dùng danh mục đúng với dịch vụ thực tế, không đổi tên doanh nghiệp để nhồi từ khóa.
3. **Tăng chất lượng trang đích** khi có dữ liệu từ cửa hàng: quy trình thực tế, người thực hiện, chi phí và dịch vụ bao gồm, lịch tiếp nhận, ảnh thật. Thông tin khám chuyên khoa cần xác nhận với bác sĩ. Không tạo các trang sao chép chỉ khác tên phường/từ khóa.
4. **Phát triển tín hiệu địa phương**: ảnh thật cập nhật và đánh giá tự nguyện từ khách đã sử dụng dịch vụ. Không tạo đánh giá giả hoặc đổi quà để lấy đánh giá. Các liên kết đề cập doanh nghiệp nên đến từ đối tác/nguồn địa phương có liên quan thực tế.
5. **Đo kết quả** bằng Search Console sau khi có dữ liệu: trang `/do-mat`, quốc gia Việt Nam, nhóm truy vấn “đo mắt”, “đo mắt Vĩnh Long”, “đo mắt ở Vĩnh Long”. Theo dõi impressions, clicks, CTR và average position; so sánh các giai đoạn đủ dữ liệu. Xem “khám mắt” riêng để tránh trộn nhu cầu khám bệnh với nhu cầu làm kính.

Chưa có dữ liệu Search Console hoặc bằng chứng thứ hạng hiện tại. Chưa xác nhận Google đã lập chỉ mục hay website nằm trong top tìm kiếm. Sitemap và yêu cầu lập chỉ mục không bảo đảm thứ hạng; kết quả Maps còn phụ thuộc khoảng cách người tìm kiếm.

## Thay đổi nhỏ trên website

Liên kết “Đo mắt” và “Cửa hàng” ở chân trang được trỏ trực tiếp đến trang dịch vụ `/do-mat` và trang địa điểm `/cua-hang`, giúp khách và crawler đi tới đúng nội dung chi tiết.

## Mốc tìm kiếm Google và tên miền

- Kiểm tra trực tiếp truy vấn “đo mắt ở vĩnh long” trên Google, giao diện tiếng Việt và quốc gia Việt Nam (`hl=vi&gl=vn`). Trang kết quả hiển thị khu vực Vĩnh Long nhưng phiên tìm kiếm vẫn có cá nhân hóa và vị trí thiết bị ở Úc. Không dùng quan sát này để khẳng định thứ hạng của mọi khách hàng ở Vĩnh Long.
- Trang kết quả đầu tiên quan sát được có ba kết quả Maps và chín kết quả web; chưa thấy `kinhthuocanhthi.com` trong các kết quả đó. Kết quả web gồm website Bệnh viện Chuyên khoa Mắt Vĩnh Long, eMed, Docosan, Doctogo, Bệnh viện Xuyên Á và các trang khác. Điều này chưa chứng minh website chưa được lập chỉ mục.
- Cần cải thiện thông tin doanh nghiệp và nội dung dịch vụ thật, gồm chi phí, người thực hiện và lịch tiếp nhận đã được cửa hàng xác nhận. Không bổ sung tên bác sĩ vào vai trò tác giả hoặc người duyệt nếu chưa thực sự được bác sĩ duyệt nội dung.
- Kiểm tra URL phát hiện HTTPS `www.kinhthuocanhthi.com/do-mat` đang trả nội dung HTTP 200 trên chính host `www`, trong khi canonical là host không `www`. HTTP đã chuyển lên HTTPS và đường dẫn có dấu `/` cuối đã được chuẩn hóa.
- Thêm chuyển hướng vĩnh viễn 308 trong Next.js, chỉ khớp host `www.kinhthuocanhthi.com`, về `https://kinhthuocanhthi.com`. Đường dẫn và query được giữ lại. Host chính và localhost không khớp quy tắc này. Kết quả kiểm tra trên tên miền thật được lưu riêng trong thư mục `outputs/deployment-2026-10-17/`.

## Tài liệu Google

- [Cải thiện thứ hạng địa phương](https://support.google.com/business/answer/7091?hl=en)
- [Yêu cầu Google thu thập lại URL](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Câu hỏi về thu thập và lập chỉ mục](https://developers.google.com/search/help/crawling-index-faq)
- [Chuyển hướng và Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Nội dung hữu ích, đáng tin cậy và thông tin tác giả chính xác](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
