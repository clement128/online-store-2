// index.mock.ts - Replace your index.ts with this for testing
import { DummyData } from "./dummyData";
import type {
  Cart,
  Collection,
  Menu,
  Page,
  PageInfo,
  Product,
  user,
  CustomerInput,
} from "./types";

// Mock cart operations
export async function createCart(): Promise<Cart> {
  return DummyData.createCart();
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  // Add items to the cart and return updated cart
  const cart = DummyData.createCart(cartId);
  return cart;
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  // Remove items from the cart and return updated cart
  return DummyData.createCart(cartId);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  // Update cart items and return updated cart
  return DummyData.createCart(cartId);
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  // Return a cart if cartId is valid, otherwise undefined
  return cartId ? DummyData.createCart(cartId) : undefined;
}

// Mock collection operations
export async function getCollection(
  handle: string,
): Promise<Collection | undefined> {
  // Return a collection based on handle
  return DummyData.getCollection(handle);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
  filterCategoryProduct,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
  filterCategoryProduct?: any[];
}): Promise<{ pageInfo: PageInfo | null; products: Product[] }> {
  // Return products for a collection
  const products = DummyData.getCollectionProducts(collection);
  const pageInfo = DummyData.createPageInfo(false); // Set to false to indicate no more pages
  return {
    pageInfo,
    products,
  };
}

// Mock customer operations
export async function createCustomer(input: CustomerInput): Promise<any> {
  // Create a customer and return result
  const customer = DummyData.createUser().customer;
  const customerCreateErrors = [];

  return { customer, customerCreateErrors };
}

export async function getCustomerAccessToken({
  email,
  password,
}: Partial<CustomerInput>): Promise<any> {
  // Return token if valid credentials
  const token = "dummyAccessToken123456";
  const customerLoginErrors = [];

  return { token, customerLoginErrors };
}

export async function getUserDetails(accessToken: string): Promise<user> {
  // Return user details if valid token
  return DummyData.getUser();
}

// Mock collections operations
export async function getCollections(): Promise<Collection[]> {
  // Return all collections
  return DummyData.getCollections();
}

// Mock menu operations
export async function getMenu(handle: string): Promise<Menu[]> {
  // Return menu items
  return DummyData.getMenu();
}

// Mock page operations
export async function getPage(handle: string): Promise<Page> {
  // Return page by handle
  return DummyData.getPage(parseInt(handle.split("-").pop() || "1"));
}

export async function getPages(): Promise<Page[]> {
  // Return all pages
  return DummyData.getPages();
}

// Mock product operations
export async function getProduct(handle: string): Promise<Product | undefined> {
  // Return product by handle
  return DummyData.getProduct(handle);
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  // Return recommended products
  return DummyData.getProductRecommendations(productId);
}

export async function getVendors({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<{ vendor: string; productCount: number }[]> {
  // Return vendor information
  return DummyData.getVendors();
}

export async function getTags({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  // Return products with tags
  return DummyData.getProducts();
}

export async function getProducts({
  query,
  reverse,
  sortKey,
  cursor,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  cursor?: string;
}): Promise<{ pageInfo: PageInfo; products: Product[] }> {
  // Return products with pagination
  let filteredProducts = DummyData.getProducts();
  
  // Simple query filtering
  if (query) {
    const lowerQuery = query.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.title.toLowerCase().includes(lowerQuery) || 
      product.vendor.toLowerCase().includes(lowerQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
  
  // Sort if needed
  if (sortKey) {
    // Implement sorting logic based on sortKey
    // This is a simplified example
    if (sortKey === "TITLE") {
      filteredProducts = filteredProducts.sort((a, b) => 
        reverse ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
      );
    } else if (sortKey === "PRICE") {
      filteredProducts = filteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
        const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
        return reverse ? priceB - priceA : priceA - priceB;
      });
    }
  }
  
  const pageInfo = DummyData.createPageInfo(false);
  
  return {
    pageInfo,
    products: filteredProducts,
  };
}

export async function getHighestProductPrice(): Promise<{
  amount: string;
  currencyCode: string;
} | null> {
  // Return highest product price
  return DummyData.getHighestPrice();
}
