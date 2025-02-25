// dummyData.ts
import type {
  Cart,
  CartItem,
  Collection,
  Image,
  Menu,
  Page,
  PageInfo,
  Product,
  ProductVariant,
  Money,
  user,
  CustomerError,
} from "./types";

// Helper functions to create dummy data
const createDummyMoney = (
  amount: string = "10.00",
  currencyCode: string = "USD",
): Money => ({
  amount,
  currencyCode,
});

const createDummyImage = (index: number | string = 0): Image => ({
  url: `https://picsum.photos/300/300?random=${index}`,
  altText: `${index}`,
  width: 300,
  height: 300,
});

const createDummyVariant = (id: number): ProductVariant => ({
  id: `gid://shopify/ProductVariant/${id}`,
  title: `Variant ${id}`,
  availableForSale: true,
  selectedOptions: [
    {
      name: "Size",
      value: ["Small", "Medium", "Large"][id % 3],
    },
    {
      name: "Color",
      value: ["Red", "Blue", "Green", "Black"][id % 4],
    },
  ],
  price: createDummyMoney(`${(19.99 + id * 10).toFixed(2)}`),
});

const createDummyProduct = (id: number): Product => ({
  id: `gid://shopify/Product/${id}`,
  handle: `dummy-product-${id}`,
  availableForSale: true,
  title: `Dummy Product ${id}`,
  description: `This is a description for dummy product ${id}. It contains all the important details you would want to know.`,
  descriptionHtml: `<p>This is a description for dummy product ${id}. It contains all the important details you would want to know.</p>`,
  options: [
    {
      id: `gid://shopify/ProductOption/${id}1`,
      name: "Size",
      values: ["Small", "Medium", "Large"],
    },
    {
      id: `gid://shopify/ProductOption/${id}2`,
      name: "Color",
      values: ["Red", "Blue", "Green", "Black"],
    },
  ],
  priceRange: {
    maxVariantPrice: createDummyMoney(`${(49.99 + id * 10).toFixed(2)}`),
    minVariantPrice: createDummyMoney(`${(19.99 + id * 10).toFixed(2)}`),
  },
  compareAtPriceRange: {
    maxVariantPrice: createDummyMoney(`${(69.99 + id * 10).toFixed(2)}`),
  },
  variants: [
    createDummyVariant(id * 3 + 1),
    createDummyVariant(id * 3 + 2),
    createDummyVariant(id * 3 + 3),
  ],
  featuredImage: createDummyImage(id),
  images: [
    createDummyImage("Red"),
    createDummyImage("Blue"),
    createDummyImage("Green"),
    createDummyImage("Black"),
  ],
  seo: {
    title: `Buy Dummy Product ${id} - Our Store`,
    description: `Shop our exclusive Dummy Product ${id}. High quality and affordable price.`,
  },
  tags: ["featured", "new", "sale", `tag-${id}`],
  updatedAt: new Date().toISOString(),
  vendor: ["Brand A", "Brand B", "Brand C"][id % 3],
  collections: null,
});

const createDummyCartItem = (id: number): CartItem => ({
  id: `gid://shopify/CartLine/${id}`,
  quantity: 1 + (id % 3),
  cost: {
    totalAmount: createDummyMoney(
      `${((19.99 + id * 10) * (1 + (id % 3))).toFixed(2)}`,
    ),
  },
  merchandise: {
    id: `gid://shopify/ProductVariant/${id}`,
    title: `Variant ${id}`,
    selectedOptions: [
      {
        name: "Size",
        value: ["Small", "Medium", "Large"][id % 3],
      },
      {
        name: "Color",
        value: ["Red", "Blue", "Green", "Black"][id % 4],
      },
    ],
    product: createDummyProduct(id),
  },
});

const createDummyCart = (id: string): Cart => ({
  id: id || "gid://shopify/Cart/123456789",
  checkoutUrl: "https://example.myshopify.com/checkout",
  cost: {
    subtotalAmount: createDummyMoney("129.95"),
    totalAmount: createDummyMoney("142.95"),
    totalTaxAmount: createDummyMoney("13.00"),
  },
  lines: [createDummyCartItem(1), createDummyCartItem(2)],
  totalQuantity: 3,
});

const createDummyCollection = (id: number): Collection => ({
  handle: `dummy-collection-${id}`,
  title: `Dummy Collection ${id}`,
  description: `This is a description for dummy collection ${id}`,
  seo: {
    title: `Dummy Collection ${id} - Our Store`,
    description: `Shop our exclusive Dummy Collection ${id}. High quality products at affordable prices.`,
  },
  image: createDummyImage(id),
  updatedAt: new Date().toISOString(),
  path: `/products/dummy-collection-${id}`,
});

const createDummyPage = (id: number): Page => ({
  id: `gid://shopify/Page/${id}`,
  title: `Dummy Page ${id}`,
  handle: `dummy-page-${id}`,
  body: `This is the content of dummy page ${id}. It contains all the important information you would want to know.`,
  bodySummary: `This is the summary of dummy page ${id}.`,
  seo: {
    title: `Dummy Page ${id} - Our Store`,
    description: `Learn more about our company on Dummy Page ${id}.`,
  },
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
});

const createDummyPageInfo = (hasMore: boolean = true): PageInfo => ({
  hasNextPage: hasMore,
  hasPreviousPage: false,
  endCursor: "cursor123456789",
});

const createDummyMenu = (): Menu[] => [
  { title: "Home", path: "/" },
  { title: "Products", path: "/search" },
  { title: "Collections", path: "/search" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const createDummyUser = (): user => ({
  customer: {
    id: "gid://shopify/Customer/12345",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1-555-555-5555",
    acceptsMarketing: true,
  },
});

const createDummyCustomerError = (): CustomerError => ({
  code: "CUSTOMER_ERROR",
  field: ["email"],
  message: "Email already exists in the system",
});

// Export all dummy data creation functions
export const DummyData = {
  createCart: (id: string = "gid://shopify/Cart/123456789") =>
    createDummyCart(id),
  createProduct: (id: number = 1) => createDummyProduct(id),
  createProducts: (count: number = 10) =>
    Array.from({ length: count }, (_, i) => createDummyProduct(i + 1)),
  createCollection: (id: number = 1) => createDummyCollection(id),
  createCollections: (count: number = 5) =>
    Array.from({ length: count }, (_, i) => createDummyCollection(i + 1)),
  createPage: (id: number = 1) => createDummyPage(id),
  createPages: (count: number = 3) =>
    Array.from({ length: count }, (_, i) => createDummyPage(i + 1)),
  createMenu: () => createDummyMenu(),
  createPageInfo: (hasMore: boolean = true) => createDummyPageInfo(hasMore),
  createUser: () => createDummyUser(),
  createCustomerError: () => createDummyCustomerError(),
  createVendors: () => [
    { vendor: "Brand A", productCount: 15 },
    { vendor: "Brand B", productCount: 8 },
    { vendor: "Brand C", productCount: 12 },
  ],
  createHighestPrice: () => createDummyMoney("299.99"),
};
