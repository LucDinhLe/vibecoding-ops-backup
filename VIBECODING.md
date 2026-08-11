# BỘ QUY TẮC VIBE CODING HIỆU QUẢ

> Phiên bản 3.0 — quy tắc chuẩn để AI bắt đầu dự án mới hoặc tiếp quản công việc từ ChatGPT/AI khác
> Mục đích: giúp người hiểu nghiệp vụ giao việc cho AI nhanh, có bằng chứng, tiếp nối được giữa nhiều phiên và không đánh đổi an toàn vận hành.

## Cách dùng tài liệu

- AI phải đọc tài liệu này trước mọi phiên có thiết kế, viết, sửa, kiểm thử hoặc triển khai phần mềm.
- Nếu dự án có `AGENTS.md`, `CLAUDE.md` hoặc tài liệu nội quy riêng, AI phải đọc cả hai. Quy tắc dự án được bổ sung nhưng không được làm yếu các luật an toàn ở đây.
- Khi yêu cầu tức thời xung đột với tài liệu, AI phải nêu xung đột và hệ quả trước khi làm.
- Tài liệu này là luật nền. Quyết định cụ thể của từng dự án phải được ghi trong hồ sơ dự án, không chỉ nằm trong lịch sử chat.
- Khi tiếp quản công việc, repository/worktree và hệ thống đang chạy là nguồn bằng chứng hiện tại; chat cũ chỉ bổ sung mục tiêu, quyết định và lý do.
- Không bắt người dùng kể lại điều AI có thể kiểm tra trực tiếp từ project, Git, test, log hoặc tài liệu bàn giao.
- Cập nhật tài liệu sau mỗi sự cố, lần quay lui hoặc bài học vận hành đáng kể.

---

## 0. Giao ước trách nhiệm

### Người dùng quyết định

- Sản phẩm làm gì và dành cho ai.
- Luật nghiệp vụ và cách gọi tên thực thể nghiệp vụ.
- Dữ liệu nào được thu thập, giữ bao lâu và ai được xem.
- Mức rủi ro, chi phí và phụ thuộc nhà cung cấp có thể chấp nhận.
- Thứ tự ưu tiên và dự báo tương lai của công việc.
- Cách hệ thống phải cư xử khi thiếu dữ liệu, mất mạng hoặc một bước thất bại.

### AI quyết định

- Cách hiện thực hóa sau khi đã công bố lựa chọn có hệ quả.
- Cách chia tệp, viết test, tổ chức mã nguồn và dùng thư viện phụ trợ.
- Cách kiểm tra và chứng minh kết quả trong phạm vi môi trường thử nghiệm.

### AI không được tự quyết

- Cấu trúc dữ liệu có ảnh hưởng lâu dài.
- Mô hình xác thực, phân quyền và cách ly dữ liệu.
- Nhà cung cấp database, cloud, thanh toán hoặc lưu trữ.
- Nguồn sự thật của một dữ kiện nghiệp vụ.
- Hành vi khi hệ thống hỏng hoặc dữ liệu xung đột.
- Thao tác trực tiếp lên production.

**Nguyên tắc nền:** AI có thể tạo code rất nhanh nhưng không thức dậy lúc hai giờ sáng, không ký hợp đồng chịu trách nhiệm và không giữ toàn bộ lịch sử dự án trong đầu. Quy trình phải bù cho ba khoảng trống đó.

---

## 1. Cổng số 0: có nên xây không?

Với dự án mới, trước khi viết code AI phải hoàn tất hai câu hỏi chặn đầu. Với dự án đang tiếp quản, AI đọc quyết định đã ghi và chỉ hỏi lại khi chưa có câu trả lời hoặc phạm vi/rủi ro đã thay đổi.

### 1.1. Mua hay tự xây?

AI phải tìm và trình bày ngắn gọn:

1. Có phần mềm hoặc dịch vụ nào đã giải quyết phần lớn nhu cầu chưa?
2. Chi phí thuê theo tháng và theo năm là bao nhiêu?
3. Chi phí chuyển dữ liệu hoặc rời nhà cung cấp là gì?
4. Phần còn thiếu có thể giải quyết bằng cấu hình, tích hợp hoặc quy trình thủ công không?
5. Ngưỡng chi phí người dùng chấp nhận là bao nhiêu?

Nếu dịch vụ có sẵn đáp ứng đủ nhu cầu và rẻ hơn tổng chi phí xây, vận hành, bảo mật và bàn giao, mặc định là mua. Tự xây chỉ khi lợi ích khác biệt đủ rõ và người dùng chấp nhận nghĩa vụ vận hành.

### 1.2. Phân loại rủi ro

| Loại | Dấu hiệu | Cách làm mặc định |
|---|---|---|
| **A — Thử nghiệm** | Dưới 10 người nội bộ; dữ liệu nhập lại được; không tiền; không dữ liệu bên ngoài | Có thể giảm thủ tục vận hành, nhưng vẫn phải quản lý secret, Git, test chức năng chính và công bố quyết định |
| **B — Nghiệp vụ thật** | Có dữ liệu người dùng thật; dùng hằng ngày; mất dữ liệu gây gián đoạn nhưng chưa có thanh toán | Áp dụng toàn bộ tài liệu; bắt buộc staging, backup, restore test, auth, monitoring và runbook |
| **C — Trách nhiệm cao** | Thanh toán, dữ liệu nhạy cảm, sức khỏe, pháp lý, tài chính, trẻ em, hoặc mất dữ liệu có thể mất khách | Không tự xây một mình; ưu tiên dịch vụ đã được kiểm chứng hoặc thuê người/tổ chức chịu trách nhiệm bằng hợp đồng |

### 1.3. Điều kiện dừng

AI phải dừng và yêu cầu quyết định rõ khi:

- Chưa biết ai là người dùng hoặc nguồn sự thật của dữ liệu.
- Yêu cầu mâu thuẫn nhau.
- Có dữ liệu cá nhân nhưng chưa xác định mục đích thu thập và quyền truy cập.
- Có thanh toán nhưng chưa chọn nhà cung cấp và quy tắc hoàn tiền/đối soát.
- Có migration phá hủy dữ liệu mà chưa backup và thử đường quay lui.
- Người dùng yêu cầu ghi thẳng lên production.

---

## 1.4. Tiếp quản công việc từ ChatGPT hoặc AI khác

Mục tiêu của tiếp quản không phải là “đọc được bản tóm tắt”, mà là **tái lập đúng trạng thái công việc và chứng minh có thể tiếp tục từ đó**.

### 1.4.1. Gói bàn giao tối thiểu

Người dùng chỉ cần cung cấp nguồn trực tiếp đang có, ưu tiên theo thứ tự:

1. Đường dẫn project/repository trên máy hoặc URL repository.
2. Branch, worktree, commit hoặc pull request đang làm.
3. Link/exports của ChatGPT Work, tài liệu bàn giao hoặc nội dung quyết định chưa có trong repo.
4. Mục tiêu tiếp theo nếu đã chốt.

AI tự lấy các thông tin còn lại từ nguồn trực tiếp. Nếu phải tạo tài liệu bàn giao, dùng khuôn:

```text
Mục tiêu sản phẩm:
Việc đang làm:
Trạng thái đã xác minh:
Branch/commit/worktree:
File đã sửa nhưng chưa commit:
Test/build đã chạy và kết quả:
Lỗi hoặc blocker hiện tại:
Quyết định nghiệp vụ đã chốt:
Giả định chưa được xác nhận:
Dịch vụ/môi trường liên quan (không ghi giá trị secret):
Bước nhỏ tiếp theo:
```

### 1.4.2. Thứ tự nguồn sự thật

Khi các nguồn mâu thuẫn, AI không âm thầm chọn. Dùng thứ tự sau và nêu xung đột:

1. Quyết định hiện tại, rõ ràng của người dùng.
2. Đặc tả và quyết định đã được duyệt trong project.
3. Test và trạng thái hệ thống có thể chạy lại.
4. Code, schema, cấu hình và lịch sử Git hiện tại.
5. Tài liệu bàn giao hoặc chat cũ.
6. Suy luận của AI.

Test cho biết hệ thống đang làm gì; đặc tả cho biết hệ thống phải làm gì. Nếu hai thứ khác nhau, đó là lỗi hoặc thay đổi chưa được phê duyệt, không phải lý do để AI tự đổi luật nghiệp vụ.

### 1.4.3. Quy trình tiếp quản bắt buộc

Trước khi sửa code, AI phải:

1. **Định vị đúng project:** xác nhận đường dẫn, repository, branch/worktree và remote; không làm trong thư mục gần giống tên.
2. **Đọc luật project:** đọc `AGENTS.md`, `CLAUDE.md`, README và các file đặc tả/quyết định có liên quan.
3. **Bảo toàn việc dang dở:** kiểm tra file đã sửa, file chưa theo dõi, stash và diff; không reset, checkout đè hoặc dọn sạch thay đổi của AI/người trước.
4. **Đọc lịch sử gần nhất:** xác định các commit gần đây, mục tiêu đang làm và thay đổi chưa hoàn tất.
5. **Đối chiếu bàn giao:** so mục tiêu trong chat/tài liệu với code, test và Git; liệt kê điểm khớp và điểm lệch.
6. **Chạy đường cơ sở:** chạy lệnh build/test/lint hoặc bước tái hiện lỗi phù hợp trước khi thay đổi. Không tự ý cài lại toàn bộ hoặc nâng version dependency.
7. **Phân loại trạng thái:**
   - **Xanh:** baseline đạt, trạng thái rõ, có thể tiếp tục.
   - **Vàng:** có lỗi đã biết hoặc tài liệu thiếu nhưng vẫn khoanh vùng được.
   - **Đỏ:** sai project/branch, không chạy được baseline, mất secret/cấu hình, có thay đổi nguy hiểm hoặc mâu thuẫn nghiệp vụ.
8. **Báo cáo tiếp quản:** nêu trạng thái thực tế, bằng chứng, rủi ro, thay đổi chưa commit và bước nhỏ tiếp theo.
9. **Tiếp tục ngay** nếu trạng thái xanh/vàng và bước kế tiếp không cần quyết định nghiệp vụ mới. Chỉ hỏi một câu khi thật sự bị chặn.

### 1.4.4. Khuôn báo cáo tiếp quản

```text
Project/branch:
Mục tiêu em hiểu:
Trạng thái Git:
Baseline đã chạy:
Kết quả thực tế:
Việc ChatGPT/AI trước đã hoàn tất:
Việc còn dang dở hoặc mâu thuẫn:
Rủi ro/giả định:
Bước nhỏ em sẽ làm tiếp:
Câu hỏi duy nhất cần anh quyết định (nếu có):
```

AI không được nói “đã tiếp quản” nếu chưa kiểm tra Git và chưa chạy được ít nhất một bằng chứng nền phù hợp. Nếu môi trường không cho phép chạy, phải nói rõ chưa xác minh được gì.

### 1.4.5. Bàn giao ngược sau phiên

Trước khi kết thúc một phiên đang dang dở, AI cập nhật `PROGRESS.md` hoặc tài liệu tương đương với:

- Mục tiêu và trạng thái hiện tại.
- File đã thay đổi và lý do.
- Test/build thực tế đã chạy.
- Commit hoặc diff chưa commit.
- Quyết định mới và ai đã quyết định.
- Lỗi còn lại, cách tái hiện và log liên quan.
- Bước nhỏ tiếp theo đủ rõ để một AI khác bắt đầu mà không đoán.

---

## 2. Hồ sơ tối thiểu của một dự án

Không để toàn bộ dự án chỉ tồn tại trong lịch sử chat. Mỗi dự án loại B hoặc C phải có các tệp sau; loại A có thể gộp chúng nhưng không được bỏ nội dung cốt lõi.

| Tệp | Nội dung bắt buộc |
|---|---|
| `README.md` | App làm gì, ai dùng, cách chạy, môi trường, liên hệ khi lỗi |
| `PRODUCT.md` | Vấn đề, người dùng, phạm vi MVP, điều không làm, tiêu chí thành công |
| `SPEC.md` | Đầu vào, đầu ra, luật nghiệp vụ, trạng thái, lỗi, trường hợp biên |
| `ARCHITECTURE.md` | Thành phần, luồng dữ liệu, database, dịch vụ ngoài, nguồn sự thật |
| `DECISIONS.md` | Các quyết định cửa một chiều, phương án bỏ qua và lý do |
| `AGENTS.md` | Quy tắc AI phải đọc, lệnh test/build, naming, điều cấm, cấu trúc dự án |
| `TEST_PLAN.md` | Test tự động, nghiệm thu thủ công, dữ liệu thử, tiêu chí đạt |
| `RUNBOOK.md` | Deploy, rollback, backup, restore, cảnh báo, xử lý khi app sập |
| `CHANGELOG.md` | Thay đổi bằng ngôn ngữ người vận hành hiểu được |
| `PROGRESS.md` | Việc đang làm, việc đã xác minh, blocker và bước kế tiếp |

### Luật cập nhật hồ sơ

- Thay đổi kiến trúc phải cập nhật `ARCHITECTURE.md` và `DECISIONS.md` trong cùng commit.
- Thay đổi nghiệp vụ phải cập nhật `SPEC.md` trước hoặc cùng lúc với code.
- Hoàn thành tính năng phải cập nhật test, changelog và phạm vi ảnh hưởng.
- Một quyết định quan trọng chỉ tồn tại trong chat được coi là chưa được ghi nhận.

---

## 3. Công bố quyết định có hệ quả

### 3.1. Sáu nhóm phải đưa ra ánh sáng

| Nhóm | Câu hỏi nghiệp vụ thật sự |
|---|---|
| Mua hay tự làm | Phần khác biệt có đáng với chi phí vận hành không? |
| Tổng quát hay gắn cứng | Trong 12–24 tháng sẽ có thêm bao nhiêu trường hợp? |
| Cửa một chiều hay hai chiều | Nếu sai, sửa lại tốn bao nhiêu tiền, thời gian và rủi ro? |
| Nguồn sự thật | Khi hai nơi lệch nhau thì tin nơi nào? |
| Hỏng thì làm gì | Chặn, thử lại, xếp hàng, ghi nợ hay cho qua? |
| Tên và trạng thái nghiệp vụ | “Đã huỷ”, “đã xoá”, “hết hạn” có ý nghĩa khác nhau thế nào? |

Cửa một chiều thường gồm schema, phân quyền, nhà cung cấp, định dạng lưu trữ và API công khai. Giao diện, bố cục, tên biến và thư viện nhỏ thường là cửa hai chiều.

### 3.2. Khuôn công bố bốn dòng

1. **Tôi đang định chọn gì** — một câu, không dùng thuật ngữ nếu có thể.
2. **Vận hành sẽ khác thế nào** — ai phải làm gì, khi nào và nếu hỏng thì sao.
3. **Phương án còn lại và giá của nó** — thời gian, tiền, độ phức tạp hoặc phụ thuộc.
4. **Một câu hỏi duy nhất cho người dùng** — câu hỏi dự báo hoặc nghiệp vụ mà AI không thể tự trả lời.

### 3.3. Luật cứng

- Không giấu quyết định cửa một chiều dù đang vội.
- Không biến sự mơ hồ nghiệp vụ thành mặc định kỹ thuật.
- Nói bằng hệ quả vận hành, không dùng thuật ngữ để che hệ quả.
- Không đưa năm câu hỏi một lúc nếu một câu hỏi có thể mở nút thắt chính.
- Sau khi người dùng quyết định, ghi lại trong `DECISIONS.md`.

---

## 4. Chọn nền tảng và kiến trúc

**Mỗi lớp hạ tầng tự dựng là một lớp phải được theo dõi, vá lỗi, sao lưu và phục hồi.**

| Rủi ro | Mặc định ưu tiên |
|---|---|
| Dữ liệu chỉ nằm trên máy cá nhân | Managed database có backup tự động và khôi phục theo thời điểm |
| Người dùng có thể thấy dữ liệu nhau | Managed auth và kiểm soát quyền ở server/database, không chỉ ẩn trên giao diện |
| Secret lộ trong code | Biến môi trường; `.env` chỉ ở máy; `.gitignore` từ commit đầu |
| Chỉ chạy trên máy người xây | Managed deployment có domain, TLS và log triển khai |
| App chết không ai biết | Error tracking, uptime check và cảnh báo vào kênh thực sự được đọc |
| Sửa schema gây mất dữ liệu | Migration có review, backup trước thay đổi và rollback được diễn tập |
| Sửa một chỗ gãy chỗ khác | Nhánh riêng, test tự động và staging tách production |
| Phụ thuộc nhà cung cấp | Tài liệu export dữ liệu, định dạng lưu trữ và kế hoạch thoát |

### Nguyên tắc đơn giản hóa

- Chọn kiến trúc nhỏ nhất đáp ứng rủi ro hiện tại và dự báo đã được người dùng xác nhận.
- Không dựng microservice chỉ vì “sau này có thể lớn”.
- Không thêm cache, queue hoặc abstraction trước khi có vấn đề đo được.
- Không phát minh hệ thống auth, thanh toán hoặc mã hóa riêng.
- Mỗi dịch vụ ngoài phải có chủ sở hữu, chi phí, giới hạn, hành vi khi lỗi và cách thay thế.

---

## 5. Quy trình từ ý tưởng đến đặc tả

### Giai đoạn 1 — Xác minh vấn đề

- Viết một câu mô tả người dùng, vấn đề và kết quả mong muốn.
- Tìm giải pháp có sẵn và chi phí.
- Xác định quy trình thủ công hiện tại.
- Nêu bằng chứng nhu cầu và giả thuyết chưa được kiểm chứng.
- Chọn loại rủi ro A/B/C.

**Hoàn thành khi:** người dùng có thể giải thích tại sao cần làm và tại sao chưa mua giải pháp có sẵn.

### Giai đoạn 2 — Chốt MVP

`PRODUCT.md` phải có:

- Một nhóm người dùng chính.
- Một luồng giá trị chính.
- Danh sách “phải có”, “có thì tốt”, “không làm trong phiên bản này”.
- Chỉ số thành công có thể quan sát.
- Điều kiện ngừng hoặc quay lại quy trình thủ công.

**Hoàn thành khi:** bỏ thêm một tính năng sẽ làm hỏng giá trị cốt lõi; thêm một tính năng khác không còn cần thiết cho MVP.

### Giai đoạn 3 — Viết đặc tả

Mỗi tính năng phải ghi:

- Đầu vào và nguồn đầu vào.
- Đầu ra và người nhận đầu ra.
- Quy tắc nghiệp vụ.
- Trạng thái hợp lệ và chuyển trạng thái.
- Quyền xem, tạo, sửa, xoá.
- Hành vi khi dữ liệu rỗng, trùng, sai định dạng hoặc quá giới hạn.
- Hành vi khi mất mạng, timeout, gửi lặp hoặc xử lý một phần.
- Tiêu chí nghiệm thu có thể bấm hoặc đo.

**Hoàn thành khi:** người chưa đọc code vẫn phân biệt được đúng và sai.

### Giai đoạn 4 — Thiết kế kỹ thuật

AI đề xuất tối đa ba phương án, ưu tiên phương án đơn giản nhất. Mỗi phương án phải nói rõ:

- Dữ liệu nằm đâu và nguồn sự thật.
- Xác thực và phân quyền diễn ra ở đâu.
- Dịch vụ quản lý sẵn nào được dùng.
- Chi phí ước tính ở mức sử dụng hiện tại và mức tăng dự kiến.
- Cách backup, restore, rollback và rời nhà cung cấp.
- Điều gì chưa chắc và cần thử nghiệm nhỏ trước.

**Hoàn thành khi:** mọi cửa một chiều đã được người dùng quyết định và ghi vào `DECISIONS.md`.

### Giai đoạn 5 — Chia kế hoạch thực hiện

- Chia thành lát cắt nhỏ tạo ra hành vi quan sát được.
- Mỗi bước có file dự kiến chạm vào, test cần viết, lệnh xác minh và điều kiện dừng.
- Không gom refactor không liên quan vào cùng tính năng.
- Mỗi bước phải đủ nhỏ để hoàn tác trong vài phút.

**Hoàn thành khi:** mỗi bước có thể làm, chạy, hiểu, test và commit độc lập.

---

## 6. Vòng làm việc trong từng phiên

### 6.1. Trước khi sửa code

AI phải:

1. Đọc `AGENTS.md`, `PRODUCT.md`, `SPEC.md`, `ARCHITECTURE.md`, `DECISIONS.md` và phần liên quan trong `PROGRESS.md`.
2. Nói lại mục tiêu của đúng một việc trong phiên.
3. Liệt kê giả định và chỗ chưa chắc.
4. Nêu file dự kiến thay đổi và phạm vi có thể bị ảnh hưởng.
5. Xác nhận test sẽ chứng minh hành vi nào.
6. Kiểm tra trạng thái Git và tạo điểm quay lui nếu cần.

### 6.2. Trong khi code

Áp dụng vòng nhỏ:

1. Viết hoặc cập nhật test mô tả hành vi cần có.
2. Chạy test để chứng minh test có thể phát hiện thiếu sót.
3. Viết thay đổi nhỏ nhất làm test đạt.
4. Chạy test liên quan.
5. Chạy toàn bộ bộ test phù hợp.
6. Tự phản biện: cách này có lỗi gì, có đơn giản hơn không, đánh đổi gì?
7. Kiểm tra diff, secret và thay đổi ngoài phạm vi.
8. Giải thích phần người dùng chưa hiểu.
9. Commit khi trạng thái đã chạy được.

### 6.3. Sau mỗi tính năng

AI phải báo cáo bằng bằng chứng:

- Đã thay đổi hành vi gì.
- File nào bị chạm.
- Test nào đã chạy và kết quả thực tế.
- Tính năng nào có thể bị ảnh hưởng.
- Giả định nào còn tồn tại.
- Tài liệu nào đã cập nhật.
- Commit hoặc điểm quay lui nằm đâu.

Không dùng “xong”, “đã sửa” hoặc “hoạt động” nếu chưa chạy bước xác minh tương ứng.

### 6.4. Quản lý ngữ cảnh

- Mỗi phiên một mục tiêu; sang mục tiêu mới thì mở phiên mới hoặc làm sạch context.
- Trước phiên mới, cập nhật `PROGRESS.md` để người tiếp theo không phụ thuộc lịch sử chat.
- Khi AI biểu hiện nhầm file, lặp lỗi hoặc mất mục tiêu, dừng, cập nhật hồ sơ rồi bắt đầu context sạch.
- Không dùng memory bank như bãi chứa; tài liệu lỗi thời nguy hiểm hơn thiếu tài liệu.

### 6.5. Ghi log liên tục và bám sát kế hoạch

- Mọi phiên coding phải có kế hoạch đang hiệu lực trong `PLAN.md`, `PROGRESS.md` hoặc công cụ quản lý tương đương. AI chỉ thực hiện bước nhỏ đang được đánh dấu hiện tại.
- Trước khi sửa, AI nêu bước kế hoạch đang làm, điều kiện hoàn thành và bằng chứng sẽ chạy.
- Phát hiện việc ngoài kế hoạch thì dừng nhánh việc đó, nêu hệ quả và cập nhật kế hoạch sau khi người dùng đồng ý. Không âm thầm mở rộng phạm vi.
- Mọi ranh giới có thể lỗi phải để lại dấu vết: gọi API, nhận webhook, parse dữ liệu, đọc/ghi database hoặc Sheet, upload file, migration, deploy và tích hợp dịch vụ ngoài.
- Dùng ba mức: `info` cho mốc bắt đầu/kết thúc quan trọng, `warn` cho bất thường còn phục hồi được, `error` cho thất bại hoặc exception.
- “Ghi log liên tục” nghĩa là ghi ở các mốc có giá trị điều tra, không ghi từng dòng hoặc mọi helper thuần túy gây nhiễu, tốn quota và làm chậm hệ thống.
- Mỗi log phải có thời gian, mức, tên hàm/thành phần, thông điệp cụ thể và context đã làm sạch. Không ghi token, mật khẩu, cookie, dữ liệu cá nhân không cần thiết hoặc toàn bộ payload chưa lọc.
- Context dạng object phải serialize an toàn, giới hạn độ dài và xử lý được circular reference.
- Mọi `catch` tại ranh giới hệ thống phải gọi logger; không nuốt lỗi im lặng. Nếu chính logger lỗi, dùng kênh dự phòng cục bộ như execution log/console và không tạo vòng lặp lỗi.
- Backend phải ghi `error` trước khi trả kết quả thất bại như `{ok:false}`, kể cả frontend dùng `no-cors` và không đọc được response.
- Cuối mỗi bước, AI cập nhật `PROGRESS.md`: việc đã làm, file đổi, log/test thực tế, commit/diff, lỗi còn lại và bước kế tiếp.

---

## 7. Git và kiểm soát thay đổi

- Có repository từ đầu dự án.
- `.gitignore` và quy tắc secret có từ commit đầu tiên.
- Mỗi tính năng hoặc sửa lỗi ở nhánh riêng nếu dự án có người dùng thật.
- Commit nhỏ, mô tả hành vi, không mô tả chung chung kiểu “update”.
- Không trộn format toàn dự án với thay đổi nghiệp vụ.
- Không force-push, xoá lịch sử hoặc rewrite branch chung nếu chưa được người dùng đồng ý.
- Trước merge: xem diff, chạy test, rà secret, rà migration và cập nhật changelog.
- Mỗi release phải ánh xạ được về commit/tag và quay lại bản trước được.

---

## 8. Dữ liệu, bảo mật và quyền riêng tư

### 8.1. Luật không có ngoại lệ

- AI không ghi trực tiếp vào production.
- Backup trước mọi thao tác có thể đổi hoặc xoá dữ liệu.
- Secret, token, mật khẩu và connection string không nằm trong code, log, ảnh chụp hoặc prompt công khai.
- Xác thực ở đâu chưa đủ; mọi thao tác phải kiểm tra người đó được phép làm gì.
- Mọi truy vấn dữ liệu người dùng phải được giới hạn theo danh tính/quyền ở phía đáng tin cậy.
- Không dựa vào việc ẩn nút trên giao diện để bảo vệ dữ liệu.
- Dữ liệu đầu vào phải được kiểm tra; dữ liệu đầu ra phải được mã hóa/hiển thị an toàn theo ngữ cảnh.
- Upload phải giới hạn kích thước, loại file, nơi lưu và quyền tải xuống.
- Log không được chứa secret hoặc dữ liệu cá nhân không cần thiết.

### 8.2. Quyền riêng tư

Nếu lưu dữ liệu cá nhân, trước phát hành phải xác định:

- Mục đích thu thập và căn cứ xử lý.
- Dữ liệu bắt buộc và dữ liệu tùy chọn.
- Ai có thể truy cập.
- Thời hạn lưu giữ.
- Cách người dùng truy cập, sửa, xoá hoặc rút lại đồng ý khi pháp luật yêu cầu.
- Nhà cung cấp phụ và vị trí xử lý dữ liệu.
- Quy trình khi có sự cố dữ liệu.

Nghĩa vụ pháp lý phải được kiểm tra theo quy định hiện hành và tư vấn chuyên môn khi rủi ro cao; AI không phải luật sư.

### 8.3. Rà soát bảo mật định kỳ

Tối thiểu kiểm tra:

- Secret có bị commit hoặc log ra không?
- Endpoint nào thiếu xác thực hoặc phân quyền?
- Có truy vấn nào quên giới hạn theo người dùng/tenant không?
- Có chỗ nào cho phép injection, XSS, path traversal hoặc upload nguy hiểm không?
- Dependency nào có cảnh báo nghiêm trọng?
- CORS, cookie, session và token có cấu hình phù hợp không?
- Error message có làm lộ dữ liệu nội bộ không?

---

## 9. Chiến lược kiểm thử

### 9.1. Test tự động

Mỗi tính năng cần mức test phù hợp:

- Unit test cho luật nghiệp vụ thuần.
- Integration test cho database, API và dịch vụ ngoài.
- Authorization test cho từng vai trò và từng tài nguyên.
- Regression test cho mỗi lỗi đã sửa.
- End-to-end test cho luồng giá trị chính nếu app loại B/C.

Test là hợp đồng về hành vi, không phải con số coverage để trang trí.

### 9.2. Mười phép nghiệm thu thủ công bắt buộc

1. **Cách ly người dùng:** tài khoản A không nhìn thấy hoặc sửa dữ liệu của B.
2. **Đổi ID/URL:** thay ID tài nguyên sang của người khác phải bị chặn ở server.
3. **Phiên hết hiệu lực:** đăng xuất rồi mở lại link cũ phải bị chặn.
4. **Ký tự bất thường:** tiếng Việt, emoji, dấu nháy, khoảng trắng, chuỗi rất dài.
5. **Giá trị biên:** rỗng, âm, 0, cực lớn, ngày không hợp lệ hoặc ngoài phạm vi.
6. **Gửi lặp:** bấm lưu hai lần, retry hoặc webhook lặp không tạo hậu quả kép ngoài ý muốn.
7. **Mất mạng giữa chừng:** không để dữ liệu ở trạng thái nửa vời mà không có cách phục hồi.
8. **Tải lại trang:** reload/back/forward giữa quy trình phải có hành vi rõ, nhất là tiền và tồn kho.
9. **Cạnh tranh cập nhật:** nhiều người sửa cùng lúc phải có quy tắc phát hiện hoặc giải quyết ghi đè.
10. **Tệp bất thường:** tệp quá lớn, sai loại, tên nguy hiểm hoặc file thực thi đổi đuôi.

Phép 1–3 luôn bắt buộc. Với thanh toán hoặc tồn kho, phép 6–9 cũng là điều kiện chặn phát hành.

### 9.3. Test phục hồi

- Backup chỉ được coi là tồn tại sau khi restore thử thành công.
- Rollback chỉ được coi là có sau khi diễn tập trên staging.
- Runbook chỉ được coi là dùng được khi một người không viết hệ thống có thể làm theo.

---

## 10. Định nghĩa “Xong”

### 10.1. Xong một thay đổi

- [ ] Hành vi khớp `SPEC.md`.
- [ ] Có test mới hoặc lý do rõ vì sao không cần.
- [ ] Test liên quan đã chạy và đạt.
- [ ] Bộ test hồi quy phù hợp đã chạy và đạt.
- [ ] Không có secret hoặc thay đổi ngoài phạm vi trong diff.
- [ ] Phạm vi ảnh hưởng đã được báo cáo.
- [ ] Tài liệu và changelog đã cập nhật.
- [ ] Có commit/điểm quay lui rõ ràng.

### 10.2. Xong để người thật dùng

- [ ] Có Git và lịch sử commit có ý nghĩa.
- [ ] Không có secret trong code hoặc lịch sử được phát hành.
- [ ] Có authentication và authorization thực sự ở server/database.
- [ ] Dữ liệu được cách ly theo người dùng hoặc tenant.
- [ ] Có managed database phù hợp, backup tự động và restore test thành công.
- [ ] Có staging tách production.
- [ ] Đã chạy test tự động và nghiệm thu thủ công phù hợp.
- [ ] Có monitoring, error tracking và cảnh báo tới kênh được đọc.
- [ ] Có tài liệu app làm gì, dữ liệu ở đâu và ai xử lý khi sập.
- [ ] Có rollback được diễn tập.
- [ ] Có quy trình thủ công dự phòng cho nghiệp vụ quan trọng.
- [ ] Đã rà bảo mật và nghĩa vụ pháp lý.
- [ ] Người dùng giải thích được luồng dữ liệu khi bấm nút lưu.

App loại C chỉ được phát hành khi có người hoặc tổ chức đủ năng lực nhận trách nhiệm ngoài AI.

---

## 11. Quy trình phát hành

### Trước phát hành

1. Chốt phạm vi release và commit/tag.
2. Backup dữ liệu; xác nhận backup đọc được.
3. Chạy migration trên staging với dữ liệu gần giống thật.
4. Chạy test tự động và checklist nghiệm thu.
5. Rà secret, quyền truy cập, dependency và cấu hình môi trường.
6. Viết kế hoạch rollback có người thực hiện và thời gian mục tiêu.
7. Xác nhận monitoring và cảnh báo hoạt động.
8. Thông báo thời điểm, ảnh hưởng và quy trình thủ công dự phòng.

### Trong phát hành

- Ghi lại thời điểm và phiên bản.
- Theo dõi log, error rate, latency và luồng nghiệp vụ chính.
- Không sửa nóng nhiều thứ cùng lúc nếu chưa biết nguyên nhân.
- Vượt ngưỡng lỗi đã định thì rollback, không tranh luận với production.

### Sau phát hành

- Chạy smoke test bằng tài khoản thử.
- Kiểm tra dữ liệu và quyền truy cập, không chỉ kiểm tra giao diện mở được.
- Theo dõi đủ lâu theo mức rủi ro.
- Cập nhật changelog, runbook và bài học.

---

## 12. Sự cố và vận hành

### Khi app sập

1. Bảo vệ người dùng và dữ liệu trước, tìm nguyên nhân sau.
2. Dừng thao tác phá hủy hoặc phát hành tiếp.
3. Chuyển sang quy trình thủ công nếu có.
4. Xác định phạm vi: ai bị ảnh hưởng, dữ liệu nào, từ khi nào.
5. Rollback nếu đường quay lui an toàn và nhanh hơn sửa nóng.
6. Lưu bằng chứng: log, thời gian, phiên bản và thao tác đã làm.
7. Thông báo bằng sự thật đã biết; không đoán nguyên nhân.
8. Sau phục hồi, viết postmortem không đổ lỗi và thêm biện pháp ngăn tái diễn.

### Nội dung postmortem

- Điều gì xảy ra và tác động thực tế.
- Vì sao hệ thống cho phép nó xảy ra.
- Vì sao test/monitoring không phát hiện sớm hơn.
- Điều gì đã giúp phục hồi.
- Hành động sửa hệ thống, quy trình và tài liệu; có chủ sở hữu và hạn hoàn thành.

---

## 13. Chi phí và phụ thuộc

Theo dõi ít nhất mỗi tháng:

- Token và gói AI.
- Database, storage, bandwidth và logging.
- Dịch vụ auth, email, SMS, monitoring và domain.
- Thời gian người dùng dành để kiểm tra, sửa và vận hành.
- Chi phí gián đoạn và quy trình thủ công.
- Chi phí rời nhà cung cấp.

Định kỳ so tổng chi phí sở hữu với giá thuê phần mềm có sẵn. Nếu lợi thế tự xây không còn, phải đưa phương án dừng hoặc chuyển đổi ra bàn.

---

## 14. Lộ trình năng lực của người sở hữu app

### Mức 1 — Sống sót

Hoàn thành trước khi cho người khác dùng:

- Git: commit, branch, diff, revert.
- Secret và cấu hình: `.env`, `.gitignore`, phân biệt code với cấu hình.
- HTTP cơ bản: 401, 403, 404, 409, 422, 500.
- Đọc cấu trúc dự án và lần theo một yêu cầu từ giao diện tới dữ liệu.
- Chạy test và đọc lỗi trước khi gửi cho AI.

### Mức 2 — Vận hành được

Hoàn thành trước khi có người dùng thật:

- Database: bảng, quan hệ, index, migration, transaction, backup và restore.
- Authentication khác authorization như thế nào.
- Cách ly dữ liệu theo người dùng/tenant.
- Deploy, biến môi trường, domain và TLS.
- Đọc log, monitoring và thực hiện rollback.

### Mức 3 — Sở hữu được hệ thống

Khi app trở thành nghiệp vụ nghiêm túc:

- Kiến trúc và ranh giới giữa giao diện, nghiệp vụ và dữ liệu.
- Thiết kế API và hợp đồng tương thích.
- Hiệu năng dựa trên đo lường.
- Chiến lược test và quản lý dữ liệu thử.
- Bảo mật có hệ thống, tối thiểu hiểu các nhóm rủi ro phổ biến của OWASP.
- Incident response, postmortem và quản lý nhà cung cấp.

Học theo lỗi gặp phải nhưng phải có bản đồ để biết lỗ hổng nào chưa tự giới thiệu.

---

## 15. Những việc AI chưa thay thế được

1. Chịu trách nhiệm pháp lý và tài chính bằng tên thật.
2. Hiểu toàn bộ ngữ cảnh ngầm của tổ chức nếu chưa được nói ra.
3. Quyết định mức rủi ro mà doanh nghiệp và khách hàng chấp nhận.
4. Nhận ra một tính năng đúng kỹ thuật nhưng sai chiến lược.
5. Vận hành hệ thống trong sự cố dài, thiếu dữ liệu và nhiều bên liên quan.
6. Bảo đảm tương lai của nhà cung cấp, luật pháp hoặc mô hình kinh doanh.
7. Thay thế người có chuyên môn trong lĩnh vực trách nhiệm cao.

Khi một trong các việc trên quyết định thành bại, phải mời người thật phù hợp vào cuộc.

---

## 16. Khuôn dùng nhanh

### 16.1. Mở đầu một dự án

```text
1. Người dùng chính là ai?
2. Vấn đề hiện tại và quy trình thủ công là gì?
3. Có dịch vụ làm sẵn nào, giá bao nhiêu?
4. App thuộc loại A, B hay C?
5. Dữ liệu nào được lưu và ai được xem?
6. Một luồng giá trị chính của MVP là gì?
7. Nếu app sập, công việc tiếp tục bằng cách nào?
```

### 16.2. Mở đầu một tính năng

```text
Mục tiêu duy nhất:
Đầu vào:
Đầu ra:
Luật nghiệp vụ:
Ai được phép làm:
Trường hợp biên:
Hành vi khi lỗi/mất mạng/gửi lặp:
Tiêu chí nghiệm thu:
Điều không làm trong lần này:
```

### 16.3. Báo cáo sau thay đổi

```text
Đã thay đổi:
Hệ quả người dùng nhìn thấy:
File bị chạm:
Test đã chạy và kết quả:
Phạm vi có thể bị ảnh hưởng:
Giả định/rủi ro còn lại:
Tài liệu đã cập nhật:
Điểm quay lui:
```

### 16.4. Công bố quyết định

```text
Tôi đang định chọn:
Hệ quả vận hành:
Phương án còn lại và giá của nó:
Một câu hỏi cần anh quyết định:
```

---

## 17. Nguồn tham khảo và nguyên tắc bản quyền

Bản 2.0 này được viết lại bằng ngôn ngữ riêng, lấy tài liệu gốc của người dùng làm nền và chỉ tổng hợp các **ý tưởng/quy trình ở mức khái niệm** từ những nguồn dưới đây. Không sao chép nguyên văn template, đoạn hướng dẫn hoặc phần trình bày có tính sáng tạo từ các repository không cấp phép.

| Nguồn | Giấy phép được GitHub nhận diện khi tổng hợp | Cách sử dụng trong tài liệu này |
|---|---|---|
| https://github.com/filipecalegario/awesome-vibe-coding | CC0-1.0 | Tham khảo bản đồ hệ sinh thái và nhóm công cụ |
| https://github.com/KhazP/vibe-coding-prompt-template | MIT | Tham khảo chuỗi nghiên cứu → yêu cầu → thiết kế → hồ sơ agent → MVP |
| https://github.com/EnzeD/vibe-coding | Không thấy giấy phép | Chỉ tham khảo ý tưởng chung về kế hoạch từng bước và duy trì bối cảnh; không sao chép câu chữ/template |
| https://github.com/analyticalrohit/awesome-vibe-coding-guide | MIT | Tham khảo nguyên tắc chia nhỏ, giữ phiên tập trung, test và commit thường xuyên |
| https://github.com/cporter202/vibe-coding-for-dummies | Không thấy giấy phép | Chỉ dùng để đối chiếu cách tiếp cận cho người mới; không sao chép nội dung khóa học |
| https://github.com/2025Emma/vibe-coding-cn | MIT | Chỉ tham khảo phạm vi chủ đề; không nhập prompt/skill bên ngoài vào tài liệu |

Nếu sau này sao chép một file, template hoặc đoạn nội dung thực tế từ nguồn MIT, phải giữ thông báo bản quyền và giấy phép theo yêu cầu của nguồn. Với nguồn không có giấy phép, mặc định không sao chép, phân phối hoặc tạo bản phái sinh từ cách thể hiện của họ nếu chưa có sự cho phép.

Tài liệu này dành cho sử dụng nội bộ. Trước khi công bố hoặc bán như một sản phẩm độc lập, nên rà soát lại nguồn, mức độ tương đồng và lựa chọn giấy phép cho tài liệu.

---

*Quy tắc cuối: tốc độ chỉ có giá trị khi người sở hữu vẫn hiểu, kiểm soát và quay lui được hệ thống.*
