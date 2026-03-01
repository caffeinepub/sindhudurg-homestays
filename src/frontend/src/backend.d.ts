import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Package {
    id: bigint;
    duration: string;
    priceGroup: bigint;
    name: string;
    isAvailable: boolean;
    pricePerPerson: bigint;
    description: string;
    inclusions: Array<string>;
    category: Category;
    maxGuests: bigint;
}
export interface Inquiry {
    id: bigint;
    packageName: string;
    guestCount: bigint;
    name: string;
    submittedAt: bigint;
    message: string;
    preferredDate: string;
    phone: string;
    packageId: bigint;
}
export interface GalleryImage {
    id: bigint;
    imageUrl: string;
    caption: string;
    category: Category;
}
export interface Testimonial {
    id: bigint;
    date: string;
    name: string;
    message: string;
    category: Category;
    rating: bigint;
    location: string;
}
export enum Category {
    couples = "couples",
    prewedding = "prewedding",
    senior = "senior",
    monsoon = "monsoon",
    friends = "friends",
    family = "family"
}
export interface backendInterface {
    getAllGalleryImages(): Promise<Array<GalleryImage>>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllPackages(): Promise<Array<Package>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getGalleryImagesByCategory(category: Category): Promise<Array<GalleryImage>>;
    getPackageById(id: bigint): Promise<Package | null>;
    getPackagesByCategory(category: Category): Promise<Array<Package>>;
    getTestimonialsByCategory(category: Category): Promise<Array<Testimonial>>;
    seed(): Promise<void>;
    submitInquiry(name: string, phone: string, packageId: bigint, packageName: string, guestCount: bigint, preferredDate: string, message: string): Promise<bigint>;
}
