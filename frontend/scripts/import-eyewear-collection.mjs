import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Import only the owner's photographs. No remote image source is used.
const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(frontend, "../eyeglassed_collections");
const destination = path.join(frontend, "public/images/collections");
const groups = [
  {
    slug: "velocity-gong-kim-loai", brand: "Velocity", model: "Gọng kim loại bo tròn",
    shape: "Bo tròn", material: "Thép không gỉ", colors: ["Bạc", "Vàng hồng"], priceValue: 580000,
    description: "Gọng Velocity viền kim loại mảnh, dáng bo tròn và đệm mũi rời. Bộ ảnh gồm góc chụp riêng và các màu đặt cạnh nhau để bạn dễ so sánh.",
    photos: ["22-45-14", "22-45-28", "22-45-22", "22-45-25"],
  },
  {
    slug: "stance-gong-trong", brand: "Stance", model: "Gọng trong và chuyển màu",
    shape: "Bo vuông và mắt mèo", material: "Liên hệ tư vấn", colors: ["Xám trong", "Nâu trong", "Trong suốt", "Đen"], priceValue: null,
    description: "Bộ gọng Stance với sắc trong suốt, xám và nâu, cùng các dáng bo vuông và mắt mèo. Xem ảnh chụp từng gọng và ảnh nhiều mẫu tại cửa hàng.",
    photos: ["22-45-39", "22-45-42", "22-45-34", "22-45-37"],
  },
  {
    slug: "bolon-gong-vuong", brand: "BOLON", model: "Gọng vuông đen và đồi mồi",
    shape: "Vuông", material: "Liên hệ tư vấn", colors: ["Đen", "Đồi mồi"], priceValue: 3080000,
    description: "Gọng BOLON bản rõ nét với hai sắc đen và đồi mồi. Bộ ảnh có mặt trước và góc càng kính; giá trên tem là của gọng đen trong ảnh đầu.",
    photos: ["22-45-46", "22-46-00", "22-46-10", "22-46-13"],
  },
  {
    slug: "face2face-gong-kim-loai", brand: "FACE2FACE", model: "Gọng kim loại tông hồng",
    shape: "Bo tròn", material: "Thép không gỉ", colors: ["Vàng hồng", "Hồng", "Tím"], priceValue: null,
    description: "Gọng FACE2FACE có viền kim loại mảnh, đệm mũi rời và các tông hồng, tím. Xem ảnh riêng từng màu cùng ảnh các gọng đặt cạnh nhau.",
    photos: ["22-46-12", "22-46-14", "22-46-15"],
  },
  {
    slug: "bolon-gong-xam-trong", brand: "BOLON", model: "Gọng vuông xám trong",
    shape: "Vuông", material: "Liên hệ tư vấn", colors: ["Xám trong"], priceValue: null,
    description: "Gọng BOLON dáng vuông màu xám trong, phối càng tông kim loại. Hai ảnh chụp mặt trước và bên hông giúp bạn nhìn kỹ đường nét của gọng.",
    photos: ["22-46-17", "22-46-20"],
  },
  {
    slug: "exfash-kids", brand: "EXFASH", model: "Kids Special hồng và tím",
    shape: "Chữ nhật", material: "Liên hệ tư vấn", colors: ["Hồng", "Tím"], priceValue: null,
    description: "Dòng EXFASH Kids Special với gọng màu hồng và tím, kèm ảnh cận càng kính. Ghé cửa hàng để được kiểm tra độ vừa và căn chỉnh cho trẻ.",
    photos: ["23-02-28", "23-02-04", "23-02-05"],
  },
  {
    slug: "exfash-ef45402", brand: "EXFASH", model: "EF45402",
    shape: "Bo tròn", material: "Nhựa TR90", colors: ["Hồng trong", "Xanh", "Nâu trong"], priceValue: 680000,
    description: "Gọng EXFASH EF45402 bằng TR90, dáng bo tròn với ba sắc hồng trong, xanh và nâu trong. Bộ ảnh có từng màu riêng và ảnh đối chiếu ba màu.",
    photos: ["23-10-18", "23-10-24", "23-10-28", "23-10-31"],
  },
  {
    slug: "ziozia-gong-trong", brand: "ZIOZIA", model: "Gọng trong càng tím hồng",
    shape: "Bo tròn", material: "Liên hệ tư vấn", colors: ["Trong suốt", "Tím nhạt", "Hồng"], priceValue: null,
    description: "Gọng ZIOZIA có mặt trước trong suốt kết hợp càng tím, hồng. Xem ảnh hai gọng và góc cận để so sánh các chi tiết màu.",
    photos: ["23-10-36", "23-10-39"],
  },
  {
    slug: "stance-gong-tim-do", brand: "Stance", model: "Gọng chữ nhật tím và đỏ",
    shape: "Chữ nhật", material: "Ultem", colors: ["Tím", "Đỏ"], priceValue: null,
    description: "Gọng Stance dáng chữ nhật với hai màu tím và đỏ, có ảnh chụp riêng từng màu. Liên hệ Anh Thi để chọn kích thước và thử gọng phù hợp.",
    photos: ["23-10-47", "23-10-50", "23-10-43"],
  },
  {
    slug: "exfash-gong-chuyen-mau", brand: "EXFASH", model: "Gọng chữ nhật chuyển màu",
    shape: "Chữ nhật", material: "Nhựa TR90", colors: ["Xám", "Xanh", "Hồng"], priceValue: null,
    description: "Bộ gọng EXFASH TR90 với mặt trước chuyển từ màu sang trong suốt. Hai ảnh chụp nhóm cho thấy các sắc xám, xanh và hồng tại cửa hàng.",
    photos: ["23-10-56", "23-10-53"],
  },
  {
    slug: "flyar-gong-trong", brand: "Flyar", model: "Gọng trong xanh và hồng",
    shape: "Chữ nhật", material: "Liên hệ tư vấn", colors: ["Trong suốt", "Xanh ngọc", "Hồng nhạt"], priceValue: 480000,
    description: "Hai gọng Flyar mặt trong suốt, phối càng xanh ngọc và hồng nhạt trong ảnh chụp tại Anh Thi. Giá trên tem đọc được là của gọng hồng phía trước.",
    photos: ["23-37-43"],
  },
  {
    slug: "new-balance-gong-kim-loai", brand: "New Balance", model: "Gọng kim loại bo vuông",
    shape: "Bo vuông", material: "Kim loại", colors: ["Vàng hồng", "Đen", "Xám"], priceValue: 1700000,
    description: "Bộ gọng New Balance viền kim loại với sắc vàng hồng, đen và xám. Giá trên tem là của gọng vàng hồng trong ảnh đầu; xem các ảnh để so sánh những dáng gọng cùng bộ.",
    photos: ["23-37-46", "23-37-56", "23-37-59", "23-37-50", "23-38-02"],
  },
  {
    slug: "new-balance-gong-tron", brand: "New Balance", model: "Gọng tròn tông nâu",
    shape: "Tròn", material: "Kim loại", colors: ["Nâu"], priceValue: null,
    description: "Gọng New Balance dáng tròn tông nâu, viền kim loại mảnh và đệm mũi rời. Xem ảnh chụp tại cửa hàng và liên hệ Anh Thi để hỏi mã mẫu, kích thước và giá.",
    photos: ["23-38-06"],
  },
];

await mkdir(destination, { recursive: true });
const used = new Set();
const catalog = [];
for (const { photos, ...group } of groups) {
  const images = [];
  for (const [index, stamp] of photos.entries()) {
    const original = `photo_2026-10-17_${stamp}.jpg`;
    if (used.has(original)) throw new Error(`Duplicate photograph: ${original}`);
    used.add(original);
    const filename = original.replace(/\.jpg$/, ".webp");
    await sharp(path.join(source, original)).rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 84 }).toFile(path.join(destination, filename));
    images.push({
      src: `/images/collections/${filename}`,
      sourceFile: `eyeglassed_collections/${original}`,
      alt: `${group.brand} ${group.model}, ảnh ${index + 1} chụp tại Kính thuốc Anh Thi`,
    });
  }
  catalog.push({ ...group, name: `${group.brand} ${group.model}`, category: "Gọng kính",
    tag: group.shape, images, sourceName: "Kính thuốc Anh Thi", checkedAt: "2026-10-17" });
}
const originals = (await readdir(source)).filter((filename) => /\.jpe?g$/i.test(filename));
const missing = originals.filter((filename) => !used.has(filename));
if (missing.length) throw new Error(`Unassigned photographs: ${missing.join(", ")}`);
await writeFile(path.join(frontend, "src/data/eyewear-catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Imported ${used.size} owner photographs into ${catalog.length} collections.`);
