import RootLayout from "./layout";

test("declares the smooth-scroll behavior used by the document", () => {
  const layout = RootLayout({ children: <main /> });

  expect(layout.props["data-scroll-behavior"]).toBe("smooth");
});
