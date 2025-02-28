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
import { data } from './products'

const DUMMY_PRODUCTS = data satisfies Product[]
// Static collections
export const DUMMY_COLLECTIONS: Collection[] = [
  {
    handle: "featured-products",
    title: "Featured Products",
    description: "Our handpicked selection of featured products.",
    seo: {
      title: "Featured Products - Our Store",
      description: "Discover our handpicked selection of featured products.",
    },
    updatedAt: "2025-02-20T10:00:00Z",
    path: "/products/featured-products",
  },
  {
    handle: "new-arrivals",
    title: "New Arrivals",
    description: "Check out our latest products.",
    seo: {
      title: "New Arrivals - Our Store",
      description: "Discover our latest product additions.",
    },
    updatedAt: "2025-02-22T14:30:00Z",
    path: "/products/new-arrivals",
  },
  {
    handle: "sale",
    title: "On Sale",
    description: "Products currently on sale with special discounts.",
    seo: {
      title: "Sale Items - Our Store",
      description: "Shop our sale items with special discounts.",
    },
    updatedAt: "2025-02-15T09:15:00Z",
    path: "/products/sale",
  },
];

export const DUMMY_PAGES: Page[] = [
  {
    id: "gid://shopify/Page/1",
    title: "About Us",
    handle: "about",
    body: "We are a company dedicated to providing high-quality products at affordable prices. Our mission is to make premium products accessible to everyone.",
    bodySummary: "Learn about our company's mission and values.",
    seo: {
      title: "About Us - Our Store",
      description: "Learn about our company's mission and values.",
    },
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2025-01-20T14:45:00Z",
  },
  {
    id: "gid://shopify/Page/2",
    title: "Contact Us",
    handle: "contact",
    body: "Have questions? Contact our customer support team at support@example.com or call us at (555) 123-4567.",
    bodySummary: "Contact our customer support team.",
    seo: {
      title: "Contact Us - Our Store",
      description: "Get in touch with our customer support team.",
    },
    createdAt: "2024-01-15T09:30:00Z",
    updatedAt: "2025-01-25T11:20:00Z",
  },
  {
    id: "gid://shopify/Page/3",
    title: "Shipping & Returns",
    handle: "shipping-returns",
    body: "We offer free shipping on all orders over $50. Returns are accepted within 30 days of purchase.",
    bodySummary: "Information about our shipping and return policies.",
    seo: {
      title: "Shipping & Returns - Our Store",
      description: "Learn about our shipping and return policies.",
    },
    createdAt: "2024-01-20T10:15:00Z",
    updatedAt: "2025-02-10T16:30:00Z",
  },
];


// Helper functions to create dummy data
const createDummyMoney = (
  amount: string = "10.00",
  currencyCode: string = "USD",
): Money => ({
  amount,
  currencyCode,
});

const createDummyPageInfo = (hasMore: boolean = true): PageInfo => ({
  hasNextPage: hasMore,
  hasPreviousPage: false,
  endCursor: "cursor123456789",
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

const createDummyCartItem = (productId: number): CartItem => {
  const product = DUMMY_PRODUCTS.find(p => p.id === `gid://shopify/Product/${productId}`) || DUMMY_PRODUCTS[0];
  const variant = product.variants[0];
  
  return {
    id: `gid://shopify/CartLine/${productId}`,
    quantity: 1,
    cost: {
      totalAmount: variant.price,
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product,
    },
  };
};


const createDummyCart = (id: string): Cart => ({
  id: id || "gid://shopify/Cart/123456789",
  checkoutUrl: "https://example.myshopify.com/checkout",
  cost: {
    subtotalAmount: createDummyMoney("129.95"),
    totalAmount: createDummyMoney("142.95"),
    totalTaxAmount: createDummyMoney("13.00"),
  },
  lines: [
    createDummyCartItem(1),
    createDummyCartItem(3),
  ],
  totalQuantity: 2,
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
  // Cart functions
  createCart: (id: string = "gid://shopify/Cart/123456789") => createDummyCart(id),
  
  // Product functions
  getProduct: (handle: string): Product | undefined => {
    return DUMMY_PRODUCTS.find(p => p.handle === handle);
  },
  getProductById: (id: string): Product | undefined => {
    return DUMMY_PRODUCTS.find(p => p.id === id);
  },
  getProducts: (count: number = DUMMY_PRODUCTS.length): Product[] => {
    return DUMMY_PRODUCTS.slice(0, count);
  },
  getProductRecommendations: (productId: string): Product[] => {
    // Return a different set of products than the current one
    return DUMMY_PRODUCTS.filter(p => p.id !== productId).slice(0, 4);
  },
  
  // Collection functions
  getCollection: (handle: string): Collection | undefined => {
    return DUMMY_COLLECTIONS.find(c => c.handle === handle);
  },
  getCollections: (): Collection[] => {
    return DUMMY_COLLECTIONS;
  },
  getCollectionProducts: (handle: string): Product[] => {
    // Simulate different products for different collections
    if (handle === "featured-products") {
      return DUMMY_PRODUCTS.filter(p => p.tags.includes("featured"));
    } else if (handle === "new-arrivals") {
      return DUMMY_PRODUCTS.slice(0, 3);
    } else if (handle === "sale") {
      return DUMMY_PRODUCTS.filter(p => 
        parseFloat(p.compareAtPriceRange.maxVariantPrice.amount) > 
        parseFloat(p.priceRange.minVariantPrice.amount)
      );
    }
    return DUMMY_PRODUCTS.slice(0, 4);
  },
  
  // Page functions
  getPage: (handle: string): Page | undefined => {
    return DUMMY_PAGES.find(p => p.handle === handle);
  },
  getPages: (): Page[] => {
    return DUMMY_PAGES;
  },
  
  // Other helper functions
  createPageInfo: (hasMore: boolean = true) => createDummyPageInfo(hasMore),
  getUser: () => createDummyUser(),
  getMenu: () => createDummyMenu(),
  getVendors: () => [
    { vendor: "Fashion Brand", productCount: 2 },
    { vendor: "Leather Goods Co.", productCount: 1 },
    { vendor: "AudioTech", productCount: 1 },
    { vendor: "Organic Tea Co.", productCount: 1 },
    { vendor: "Ceramic Artisan", productCount: 1 },
  ],
  getHighestPrice: () => createDummyMoney("129.99"),
};

