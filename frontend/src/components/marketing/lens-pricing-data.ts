// Transcribed from the root-level bang-gia-*.html files and supplied price lists.
// The combined specialty table follows Bang_gia_trong_Anh_Thi 2.xlsx.
// Kính hai tròng 1.56 follows the separately supplied product information.
// Prices are VND per pair. EXFASH row spans intentionally match the source.
export type LensOfferCell =
  | { kind: "sph" | "cyl"; lines: string[]; rowSpan?: number }
  | { kind: "price"; amount: number; rowSpan?: number };

export type LensPriceProduct = {
  id: string;
  name: string;
  features: string[];
  badge?: string;
  specifications?: { label: string; value: string }[];
  coating?: string[];
  price?: number;
  offers?: LensOfferCell[][];
};

export type LensPriceCategory = {
  id: string;
  title: string;
  description: string;
  heading?: string;
  tagline?: string;
  sections: {
    id: string;
    title: string;
    description: string;
    specificationColumns?: string[];
    products: LensPriceProduct[];
  }[];
  notes: string[];
};

// “Bảng giá tròng”!B4:D5. Bifocal products in the combined specialty table.
const bifocalProducts: LensPriceProduct[] = [
  {
    id: "hai-trong-1",
    name: "Hai tròng (Basic)",
    features: [
      "Nhìn xa và gần trên cùng một tròng",
      "Lớp phủ giảm phản chiếu",
      "Hạn chế trầy, chống tia UV",
    ],
    price: 880000,
  },
  {
    id: "hai-trong-2",
    name: "Hai tròng CHỐNG ASX",
    features: [
      "Nhìn xa và gần trên cùng một tròng",
      "Lọc một phần ánh sáng xanh",
      "Hạn chế trầy, chống tia UV",
    ],
    price: 1460000,
  },
];

// “Bảng giá tròng”!B9:D10. Trim whitespace and correct the source typo “tôi ưu”.
const astigmatismProducts: LensPriceProduct[] = [
  {
    id: "loan-don-1",
    name: "Chiết suất 1.56",
    features: [
      "Chiết suất phổ thông",
      "Ngăn tia UV 400",
      "Hạn chế trầy xước, chói, bám bụi, vân tay, bám nước",
      "Tầm nhìn trong suốt, tối ưu, sắc nét",
    ],
    price: 880000,
  },
  {
    id: "loan-don-2",
    name: "Chiết suất 1.67",
    features: [
      "Ngăn tia UV 400",
      "Hạn chế trầy xước, chói, bám bụi, vân tay, bám nước",
      "Tròng kính phẳng mang lại tầm nhìn trong suốt, tối ưu, sắc nét",
      "Mỏng hơn 26% so với tròng thông thường",
    ],
    price: 2500000,
  },
];

export const lensPriceCategories: LensPriceCategory[] = [
  {
    "id": "doi-mau",
    "title": "Tròng đổi màu",
    "description": "Trendy, Edition và Smart. So sánh lớp phủ, dải độ và giá theo từng dòng tròng.",
    "sections": [
      {
        "id": "trendy",
        "title": "Đổi màu Trendy SHMC",
        "description": "",
        "products": [
          {
            "id": "trendy-1",
            "name": "1.56 SHMC Đổi màu Trendy",
            "features": [
              "Lọc một phần ánh sáng xanh",
              "Đổi màu siêu nhanh với BST màu thời thượng",
              "Bảo vệ mắt khỏi tia UV"
            ],
            "coating": [
              "Elite",
              "Sapphire"
            ],
            "offers": [
              [
                {
                  "kind": "sph",
                  "lines": [
                    "PL ~ -6.00"
                  ]
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "PL ~ -2.00"
                  ]
                },
                {
                  "kind": "price",
                  "amount": 688000
                }
              ]
            ]
          }
        ]
      },
      {
        "id": "edition",
        "title": "Đổi màu Edition ASP",
        "description": "",
        "products": [
          {
            "id": "edition-1",
            "name": "1.56 ASP Edition 5",
            "features": [
              "Công nghệ lọc ánh sáng xanh Intelligent BlueSelect",
              "Đổi màu tối, đậm và đều hơn, dễ chịu cho mắt",
              "Hạn chế trầy xước gấp 3 lần, bền bỉ vượt trội"
            ],
            "coating": [
              "Crystal",
              "Sapphire"
            ],
            "offers": [
              [
                {
                  "kind": "sph",
                  "lines": [
                    "PL ~ -6.00",
                    "+6.00 ~ +0.25"
                  ]
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "PL ~ -2.00"
                  ]
                },
                {
                  "kind": "price",
                  "amount": 999000
                }
              ]
            ]
          },
          {
            "id": "edition-2",
            "name": "1.61 MR8 ASP Edition 8.0",
            "features": [
              "Công nghệ Spin Coating cho màu đậm và đều dưới trời",
              "Vật liệu chiết quang cao cấp giúp tròng trong suốt hơn",
              "Mỏng khoảng 15–20%",
              "Chống trầy và đổi màu nhanh"
            ],
            "coating": [
              "Crystal /",
              "Sapphire"
            ],
            "offers": [
              [
                {
                  "kind": "sph",
                  "lines": [
                    "PL ~ -10.00",
                    "+6.00 ~ +0.25"
                  ]
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "PL ~ -2.00"
                  ]
                },
                {
                  "kind": "price",
                  "amount": 1399000
                }
              ]
            ]
          },
          {
            "id": "edition-3",
            "name": "1.61 MR8 ASP Edition 10",
            "features": [
              "Công nghệ Spin Coating cho màu đậm và đều dưới trời",
              "Vật liệu chiết quang cao cấp, phôi tròng trong suốt với chiết suất mỏng nhẹ hơn 15–20%",
              "Công nghệ tiên tiến, cho khả năng đổi màu siêu nhanh",
              "Thiết kế tinh tế, cho trải nghiệm nhìn tối ưu"
            ],
            "coating": [
              "Crystal",
              "Sapphire"
            ],
            "offers": [
              [
                {
                  "kind": "sph",
                  "lines": [
                    "-10.00 ~ +6.00"
                  ]
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "0.00 ~ -2.00",
                    "(không có -0.25)"
                  ]
                },
                {
                  "kind": "price",
                  "amount": 3399000
                }
              ]
            ]
          }
        ]
      },
      {
        "id": "smart",
        "title": "Đổi màu Smart SHMC",
        "description": "",
        "products": [
          {
            "id": "smart-1",
            "name": "1.67 ASP Đổi màu Smart",
            "features": [
              "Siêu trong và trong suốt hơn các tròng thông thường",
              "Dễ dàng vệ sinh, hạn chế bám bẩn và hơi nước"
            ],
            "coating": [
              "Elite"
            ],
            "offers": [
              [
                {
                  "kind": "sph",
                  "lines": [
                    "PL ~ -10.00"
                  ]
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "PL ~ -2.00"
                  ]
                },
                {
                  "kind": "price",
                  "amount": 2286000
                }
              ]
            ]
          }
        ]
      }
    ],
    "notes": [
      "Giá trên chỉ mang tính tham khảo và có thể thay đổi tùy theo độ cận, viễn hoặc loạn của từng khách hàng."
    ]
  },
  {
    "id": "exfash",
    "title": "Tròng EXFASH",
    "description": "Các dòng Digital và Infinity đến từ Hàn Quốc, với giá theo chiết suất và dải độ.",
    "sections": [
      {
        "id": "digital",
        "title": "EXFASH Digital",
        "description": "Tròng kính đổi màu khói, lọc ánh sáng xanh.",
        "products": [
          {
            "id": "digital-1",
            "name": "EXFASH 1.60 ASP SENSATION UV 420 BLUE RAY",
            "features": [
              "Tròng đổi màu khói thế hệ thứ 7, tiện nghi và thích hợp cho người dùng trong mọi hoạt động",
              "Lớp phủ Infinity Coating hạn chế trầy xước, chói, bám bụi, vân tay, bám nước, mang lại tầm nhìn trong suốt",
              "Lọc ánh sáng xanh có hại từ thiết bị điện tử"
            ],
            "offers": [
              [
                {
                  "kind": "sph",
                  "lines": [
                    "-0.00 → -8.00"
                  ]
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "-0.00 → -2.00"
                  ]
                },
                {
                  "kind": "price",
                  "amount": 1500000
                }
              ]
            ]
          }
        ]
      },
      {
        "id": "infinity",
        "title": "EXFASH Infinity",
        "description": "Tròng kính trong suốt, công nghệ lớp phủ Infinity.",
        "products": [
          {
            "id": "infinity-1",
            "name": "EXFASH 1.56 INFINITY COATING",
            "features": [
              "Ngăn tia UV 400",
              "Hạn chế trầy xước, chói, bám bụi, vân tay, bám nước",
              "Tầm nhìn trong suốt, tối ưu, sắc nét"
            ],
            "offers": [
              [
                {
                  "kind": "sph",
                  "lines": [
                    "-8.00 → +6.00"
                  ]
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "0.00 → -2.00"
                  ]
                },
                {
                  "kind": "price",
                  "amount": 360000
                }
              ],
              [
                {
                  "kind": "sph",
                  "lines": [
                    "0.00 → -6.00"
                  ]
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "-2.25 → -4.00"
                  ]
                },
                {
                  "kind": "price",
                  "amount": 420000
                }
              ]
            ]
          },
          {
            "id": "infinity-2",
            "name": "EXFASH 1.60 INFINITY COATING",
            "features": [
              "Ngăn tia UV 400",
              "Hạn chế trầy xước, chói, bám bụi, vân tay, bám nước",
              "Tầm nhìn trong suốt, tối ưu, sắc nét",
              "Mỏng hơn 15% so với tròng thông thường"
            ],
            "offers": [
              [
                {
                  "kind": "sph",
                  "lines": [
                    "-10.00 → +6.00"
                  ]
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "0.00 → -2.00"
                  ]
                },
                {
                  "kind": "price",
                  "amount": 600000
                }
              ],
              [
                {
                  "kind": "sph",
                  "lines": [
                    "0.00 → -6.00"
                  ]
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "-2.25 → -4.00"
                  ]
                },
                {
                  "kind": "price",
                  "amount": 660000
                }
              ]
            ]
          },
          {
            "id": "infinity-3",
            "name": "EXFASH 1.67 INFINITY COATING",
            "features": [
              "Ngăn tia UV 400",
              "Hạn chế trầy xước, chói, bám bụi, vân tay, bám nước",
              "Tròng kính phẳng mang lại tầm nhìn trong suốt, tối ưu, sắc nét",
              "Mỏng hơn 26% so với tròng thông thường"
            ],
            "offers": [
              [
                {
                  "kind": "sph",
                  "lines": [
                    "-2.00 → -12.00"
                  ]
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "-0.50 → -2.00"
                  ]
                },
                {
                  "kind": "price",
                  "amount": 1080000,
                  "rowSpan": 2
                }
              ],
              [
                {
                  "kind": "sph",
                  "lines": [
                    "-12.50, -13.00,",
                    "-13.50, -14.00,",
                    "-14.50, -15.00"
                  ],
                  "rowSpan": 2
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "Không có loạn -0.25"
                  ],
                  "rowSpan": 2
                }
              ],
              [
                {
                  "kind": "price",
                  "amount": 1200000,
                  "rowSpan": 2
                }
              ],
              [
                {
                  "kind": "sph",
                  "lines": [
                    "-2.00 → -10.00"
                  ]
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "-2.25 → -4.00"
                  ]
                }
              ]
            ]
          },
          {
            "id": "infinity-4",
            "name": "EXFASH 1.74 INFINITY COATING",
            "features": [
              "Ngăn tia UV 400",
              "Hạn chế trầy xước, chói, bám bụi, vân tay, bám nước",
              "Tròng kính phẳng mang lại tầm nhìn trong suốt, tối ưu, sắc nét",
              "Mỏng hơn 35% so với tròng thông thường"
            ],
            "offers": [
              [
                {
                  "kind": "sph",
                  "lines": [
                    "-4.00 → -12.00"
                  ]
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "-0.50 → -2.00"
                  ]
                },
                {
                  "kind": "price",
                  "amount": 2700000,
                  "rowSpan": 2
                }
              ],
              [
                {
                  "kind": "sph",
                  "lines": [
                    "-12.50, -13.00,",
                    "-13.50, -14.00,",
                    "-14.50, -15.00"
                  ],
                  "rowSpan": 2
                },
                {
                  "kind": "cyl",
                  "lines": [
                    "Không có loạn -0.25"
                  ],
                  "rowSpan": 2
                }
              ],
              [
                {
                  "kind": "price",
                  "amount": 2800000
                }
              ]
            ]
          }
        ]
      }
    ],
    "notes": [
      "1.56: Từ -6.25 không có loạn -0.25",
      "1.60: Từ -6.25 và độ viễn không có loạn -0.25",
      "Đơn vị tính: Giá lẻ / cặp",
      "Phân phối độc quyền bởi Công ty TNHH TM Một Không Một"
    ]
  },
  {
    "id": "chuyen-biet",
    "title": "Hai tròng, đa tròng & loạn đơn",
    "description": "Các lựa chọn cho nhiều khoảng nhìn và tròng cần gia công theo đơn kính.",
    "sections": [
      {
        "id": "hai-trong",
        "title": "Hai tròng",
        "description": "Tròng kính có hai vùng nhìn riêng biệt, hỗ trợ nhìn xa và nhìn gần.",
        "products": bifocalProducts
      },
      {
        "id": "da-trong",
        "title": "Đa tròng",
        "description": "Tròng kính tích hợp nhiều vùng nhìn, giúp quan sát ở khoảng cách xa, trung gian và gần mà không có đường phân chia rõ rệt.",
        "products": [
          {
            "id": "da-trong-1",
            "name": "Đa tròng CHỐNG UV",
            "features": [
              "Nhìn rõ xa, trung gian, gần",
              "Lớp phủ giảm phản chiếu",
              "Hạn chế trầy, chống tia UV"
            ],
            "price": 1660000
          },
          {
            "id": "da-trong-2",
            "name": "Đa tròng 1.61 CHỐNG ASX - SHMC Ultraview",
            "features": [
              "Thiết kế FREEFORM 4K cho trải nghiệm nhìn sắc nét",
              "Intelligent BlueSelect lọc ánh sáng xanh thông minh",
              "Tầm nhìn rộng với độ rõ nét hoàn hảo, dễ sử dụng ngay từ lần đầu tiên",
              "Mỏng đến 20%, hạn chế trầy ưu việt, tăng thẩm mỹ"
            ],
            "price": 2580000
          },
          {
            "id": "da-trong-3",
            "name": "Đa tròng ĐỔI MÀU",
            "features": [
              "Công nghệ FreeForm tiên tiến kết hợp Smooth Optics.",
              "Tròng kính hạn chế trầy xước, chuyển vùng nhìn mượt mà, ổn định.",
              "Tầm nhìn XA – TRUNG GIAN – GẦN linh hoạt.",
              "Tròng kính hạn chế trầy xước.",
              "Chống tia UV và đổi màu thông minh theo điều kiện ánh sáng.",
              "Hình ảnh sắc nét, chân thực."
            ],
            "price": 3260000
          }
        ]
      },
      {
        "id": "loan-don",
        "title": "Loạn đơn",
        "description": "Tròng kính dành cho người có độ loạn thị cao, thường cần đặt gia công riêng theo đơn kính.",
        "products": astigmatismProducts
      }
    ],
    "notes": [
      "Giá áp dụng cho một cặp tròng kính, mang tính tham khảo và có thể thay đổi tùy theo độ kính, chiết suất và yêu cầu gia công.",
      "Tròng đa tròng cần đo chính xác các thông số lắp kính và có thể cần thời gian thích nghi.",
      "Khả năng lọc ánh sáng xanh, chống tia UV, chống phản quang và đổi màu phụ thuộc vào từng sản phẩm và công nghệ sản xuất."
    ]
  },
  {
    id: "hai-trong",
    title: "Hai tròng 1.56",
    heading: "Bảng giá kính hai tròng",
    tagline: "Nhìn xa rõ, nhìn gần rõ – chỉ với một chiếc kính.",
    description: "Hai tròng 1.56 và Hai tròng Invisible SHMC 1.56. So sánh thông số, tính năng và giá theo cặp.",
    sections: [
      {
        id: "kinh-hai-trong",
        title: "Các dòng kính hai tròng",
        description: "",
        specificationColumns: ["Chiết suất", "SPH", "CYL", "ADD"],
        products: [
          {
            id: "kinh-hai-trong-156-basic",
            name: "HAI TRÒNG 1.56",
            price: 360000,
            specifications: [
              { label: "Chiết suất", value: "1.56" },
              { label: "SPH", value: "-8.00 → +6.00" },
              { label: "CYL", value: "0.00 → -2.00" },
              { label: "ADD", value: "Chưa có thông tin" },
            ],
            features: [
              "Kết hợp hai vùng nhìn xa và gần trên cùng một tròng kính.",
              "Hạn chế việc phải thay đổi giữa hai cặp kính.",
              "Phù hợp với nhiều mức độ cận thị và viễn thị.",
              "Tiện lợi cho việc đọc sách, xem điện thoại và sinh hoạt hằng ngày.",
              "Chi phí tiết kiệm, phù hợp với nhu cầu sử dụng cơ bản.",
            ],
          },
          {
            id: "kinh-hai-trong-156-invisible-shmc",
            name: "HAI TRÒNG INVISIBLE SHMC 1.56",
            badge: "BEST CHOICE",
            price: 590000,
            specifications: [
              { label: "Chiết suất", value: "1.56" },
              { label: "SPH", value: "-2.00 → +3.00" },
              { label: "ADD", value: "+1.00 → +3.00" },
              { label: "Công nghệ", value: "Chống Asx · Coating Elite (theo poster)" },
            ],
            features: [
              "Kết hợp hai vùng nhìn xa và gần trên cùng một tròng kính.",
              "Thiết kế Invisible giúp hạn chế lộ đường phân chia, tăng tính thẩm mỹ.",
              "Lớp phủ SHMC hỗ trợ giảm phản chiếu và giúp vệ sinh tròng kính dễ dàng hơn, tùy thông số nhà sản xuất.",
              "Hỗ trợ lọc ánh sáng xanh nếu có lớp lọc chuyên dụng.",
              "Thuận tiện khi đọc sách, sử dụng điện thoại và sinh hoạt hằng ngày.",
              "Phù hợp với người ưu tiên tính thẩm mỹ và chất lượng lớp phủ.",
            ],
          },
        ],
      },
    ],
    notes: [
      "Giá áp dụng cho một cặp tròng kính, mang tính tham khảo và có thể thay đổi tùy theo độ kính, chiết suất và yêu cầu gia công.",
      "Khả năng lọc ánh sáng xanh, chống tia UV, chống phản quang và đổi màu phụ thuộc vào từng sản phẩm và công nghệ sản xuất.",
    ],
  }
];
