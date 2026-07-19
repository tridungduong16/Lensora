import nextConfig from "../../next.config";

test("allows the LAN dev origin used for device previews", () => {
  expect(nextConfig.allowedDevOrigins).toContain("192.168.68.115");
});
