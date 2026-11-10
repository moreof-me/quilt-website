// ============================================================
//  EDIT THIS FILE to manage your shop. No other code changes needed.
// ============================================================

const SITE = {
  email: "yourname@example.com",
  phone: "(555) 123-4567",
  shipping: "Local pickup, or shipping available at cost"
};

// For each quilt:
//   image:   path to a photo, e.g. "images/lone-star.jpg" (put photos in an /images folder)
//            Leave it out and a patchwork placeholder is drawn from `colors`.
//   images:  optional extra photos shown in the detail view
//   sold:    true to show a "Sold" badge
const QUILTS = [
  {
    id: "lone-star",
    name: "Lone Star Heirloom",
    price: 450,
    size: "Queen",
    dimensions: "90 × 100 in",
    pattern: "Lone Star",
    materials: "100% cotton top, cotton batting",
    description: "A classic Texas lone star in warm reds and creams, hand-quilted borders.",
    colors: ["#9b2d30", "#e8d9bd", "#2f4858", "#d98e3f"]
  },
  {
    id: "garden-path",
    name: "Garden Path",
    price: 320,
    size: "Twin",
    dimensions: "68 × 88 in",
    pattern: "Nine Patch",
    materials: "Cotton, flannel backing",
    description: "Soft greens and florals in a cheerful nine-patch layout. Cozy flannel back.",
    colors: ["#6a994e", "#f2e8cf", "#bc4749", "#a7c957"]
  },
  {
    id: "ocean-waves",
    name: "Ocean Waves",
    price: 380,
    size: "Full",
    dimensions: "80 × 92 in",
    pattern: "Flying Geese",
    materials: "Cotton, cotton batting",
    description: "Blues and whites rolling across the quilt in a flying geese design.",
    colors: ["#1d4e89", "#a8dadc", "#f1faee", "#457b9d"]
  },
  {
    id: "baby-bunnies",
    name: "Baby Bunnies",
    price: 95,
    size: "Crib",
    dimensions: "36 × 46 in",
    pattern: "Patchwork",
    materials: "Cotton, minky backing",
    description: "A gentle pastel crib quilt, perfect for a nursery or baby shower gift.",
    colors: ["#f7cad0", "#cdeac0", "#fff1c1", "#c8b6ff"]
  },
  {
    id: "autumn-harvest",
    name: "Autumn Harvest",
    price: 410,
    size: "Queen",
    dimensions: "88 × 98 in",
    pattern: "Log Cabin",
    materials: "Cotton, wool-blend batting",
    description: "Rich oranges, golds, and browns in a traditional log cabin block.",
    colors: ["#c1440e", "#e9a23b", "#5c3d2e", "#f3e3c3"]
  },
  {
    id: "midnight-stars",
    name: "Midnight Stars",
    price: 275,
    size: "Lap",
    dimensions: "52 × 64 in",
    pattern: "Star Blocks",
    materials: "Cotton, cotton batting",
    description: "Deep navy with bright star blocks. A great couch throw.",
    colors: ["#14213d", "#fca311", "#e5e5e5", "#3a506b"],
    sold: true
  }
];
