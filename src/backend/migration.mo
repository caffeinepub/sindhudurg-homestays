import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";

module {
  type OldCategory = {
    #couples;
    #family;
    #friends;
    #prewedding;
    #monsoon;
  };

  type OldPackage = {
    id : Nat;
    name : Text;
    category : OldCategory;
    description : Text;
    pricePerPerson : Nat;
    priceGroup : Nat;
    inclusions : [Text];
    duration : Text;
    maxGuests : Nat;
    isAvailable : Bool;
  };

  type OldGalleryImage = {
    id : Nat;
    category : OldCategory;
    imageUrl : Text;
    caption : Text;
  };

  type OldTestimonial = {
    id : Nat;
    name : Text;
    location : Text;
    rating : Nat;
    message : Text;
    category : OldCategory;
    date : Text;
  };

  type OldInquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    packageId : Nat;
    packageName : Text;
    guestCount : Nat;
    preferredDate : Text;
    message : Text;
    submittedAt : Int;
  };

  type OldActor = {
    packages : Map.Map<Nat, OldPackage>;
    galleryImages : Map.Map<Nat, OldGalleryImage>;
    testimonials : Map.Map<Nat, OldTestimonial>;
    inquiries : Map.Map<Nat, OldInquiry>;
  };

  type NewCategory = {
    #couples;
    #family;
    #friends;
    #prewedding;
    #monsoon;
    #senior;
  };

  type NewPackage = {
    id : Nat;
    name : Text;
    category : NewCategory;
    description : Text;
    pricePerPerson : Nat;
    priceGroup : Nat;
    inclusions : [Text];
    duration : Text;
    maxGuests : Nat;
    isAvailable : Bool;
  };

  type NewGalleryImage = {
    id : Nat;
    category : NewCategory;
    imageUrl : Text;
    caption : Text;
  };

  type NewTestimonial = {
    id : Nat;
    name : Text;
    location : Text;
    rating : Nat;
    message : Text;
    category : NewCategory;
    date : Text;
  };

  type NewInquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    packageId : Nat;
    packageName : Text;
    guestCount : Nat;
    preferredDate : Text;
    message : Text;
    submittedAt : Int;
  };

  type NewActor = {
    packages : Map.Map<Nat, NewPackage>;
    galleryImages : Map.Map<Nat, NewGalleryImage>;
    testimonials : Map.Map<Nat, NewTestimonial>;
    inquiries : Map.Map<Nat, NewInquiry>;
  };

  func convertCategory(oldCategory : OldCategory) : NewCategory {
    switch (oldCategory) {
      case (#couples) { #couples };
      case (#family) { #family };
      case (#friends) { #friends };
      case (#prewedding) { #prewedding };
      case (#monsoon) { #monsoon };
    };
  };

  func convertPackage(oldPackage : OldPackage) : NewPackage {
    { oldPackage with category = convertCategory(oldPackage.category) };
  };

  func convertGalleryImage(oldImage : OldGalleryImage) : NewGalleryImage {
    {
      oldImage with category = convertCategory(oldImage.category);
    };
  };

  func convertTestimonial(oldTestimonial : OldTestimonial) : NewTestimonial {
    {
      oldTestimonial with category = convertCategory(oldTestimonial.category);
    };
  };

  public func run(old : OldActor) : NewActor {
    {
      packages = old.packages.map<Nat, OldPackage, NewPackage>(
        func(_id, oldPackage) { convertPackage(oldPackage) }
      );
      galleryImages = old.galleryImages.map<Nat, OldGalleryImage, NewGalleryImage>(
        func(_id, oldImage) { convertGalleryImage(oldImage) }
      );
      testimonials = old.testimonials.map<Nat, OldTestimonial, NewTestimonial>(
        func(_id, oldTestimonial) { convertTestimonial(oldTestimonial) }
      );
      inquiries = old.inquiries.map<Nat, OldInquiry, NewInquiry>(
        func(_id, oldInquiry) { oldInquiry }
      );
    };
  };
};
