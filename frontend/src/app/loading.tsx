export default function Loading() {
  return (
    <main
      id="main-content"
      className="page-loading"
      aria-busy="true"
      aria-label="Đang tải nội dung"
    >
      <div className="loading-placeholder loading-placeholder--heading" />
      <div className="loading-placeholder loading-placeholder--hero" />
      <div className="loading-placeholder" />
      <span className="sr-only">Đang tải nội dung Anh Thi…</span>
    </main>
  );
}
