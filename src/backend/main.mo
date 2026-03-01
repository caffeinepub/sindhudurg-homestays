import Text "mo:core/Text";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Category = {
    #couples;
    #family;
    #friends;
    #prewedding;
    #monsoon;
    #senior;
  };

  module Category {
    public func compare(category1 : Category, category2 : Category) : Order.Order {
      switch (category1, category2) {
        case (#couples, #couples) { #equal };
        case (#couples, _) { #less };
        case (_, #couples) { #greater };
        case (#family, #family) { #equal };
        case (#family, _) { #less };
        case (_, #family) { #greater };
        case (#friends, #friends) { #equal };
        case (#friends, _) { #less };
        case (_, #friends) { #greater };
        case (#prewedding, #prewedding) { #equal };
        case (#prewedding, _) { #less };
        case (_, #prewedding) { #greater };
        case (#monsoon, #monsoon) { #equal };
        case (#monsoon, _) { #less };
        case (_, #monsoon) { #greater };
        case (#senior, #senior) { #equal };
      };
    };
  };

  type Package = {
    id : Nat;
    name : Text;
    category : Category;
    description : Text;
    pricePerPerson : Nat;
    priceGroup : Nat;
    inclusions : [Text];
    duration : Text;
    maxGuests : Nat;
    isAvailable : Bool;
  };

  type GalleryImage = {
    id : Nat;
    category : Category;
    imageUrl : Text;
    caption : Text;
  };

  type Testimonial = {
    id : Nat;
    name : Text;
    location : Text;
    rating : Nat;
    message : Text;
    category : Category;
    date : Text;
  };

  type Inquiry = {
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

  let packages = Map.empty<Nat, Package>();
  let galleryImages = Map.empty<Nat, GalleryImage>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let inquiries = Map.empty<Nat, Inquiry>();

  func seedPackages() {
    packages.add(
      1,
      {
        id = 1;
        name = "Romantic Tarkarli Stay";
        category = #couples;
        description = "Couple's getaway in Tarkarli with beachside stay, candlelight dinner, and couple activities.";
        pricePerPerson = 4000;
        priceGroup = 7000;
        inclusions = [
          "Beachside homestay",
          "Candlelight dinner",
          "Couples spa",
          "Kayaking",
          "Breakfast",
        ];
        duration = "3 days 2 nights";
        maxGuests = 2;
        isAvailable = true;
      },
    );

    packages.add(
      2,
      {
        id = 2;
        name = "Family Adventure Package";
        category = #family;
        description = "Family package with kids activities, dolphin ride, boat tour, and local cuisine.";
        pricePerPerson = 3500;
        priceGroup = 12000;
        inclusions = [
          "Homestay accommodation",
          "Dolphin ride",
          "Kids games & activities",
          "Boat trip",
          "Local food",
        ];
        duration = "4 days 3 nights";
        maxGuests = 6;
        isAvailable = true;
      },
    );

    packages.add(
      3,
      {
        id = 3;
        name = "Friends Beach Bash";
        category = #friends;
        description = "Group package for friends with water sports, BBQ, bonfire, and adventure activities.";
        pricePerPerson = 3000;
        priceGroup = 11000;
        inclusions = [
          "Homestay stay (4+ people)",
          "Water sports",
          "Beach BBQ",
          "Bonfire party",
          "Trekking",
        ];
        duration = "3 days 2 nights";
        maxGuests = 8;
        isAvailable = false;
      },
    );

    packages.add(
      4,
      {
        id = 4;
        name = "Prewedding Shoot Experience";
        category = #prewedding;
        description = "Professional prewedding photoshoot with styling, backdrops, and romantic activities.";
        pricePerPerson = 10000;
        priceGroup = 18000;
        inclusions = [
          "Professional photographer",
          "Styling & makeup",
          "Beachside locations",
          "Couple experiences",
        ];
        duration = "2 days 1 night";
        maxGuests = 2;
        isAvailable = true;
      },
    );

    packages.add(
      5,
      {
        id = 5;
        name = "Monsoon Magic Package";
        category = #monsoon;
        description = "Explore Sindhudurg in the lush monsoon season with nature walks, waterfalls, and local experiences.";
        pricePerPerson = 2500;
        priceGroup = 8000;
        inclusions = [
          "Homestay stay",
          "Nature walks",
          "Waterfall trek",
          "Local cuisine",
          "Cultural experiences",
        ];
        duration = "2 days 1 night";
        maxGuests = 4;
        isAvailable = true;
      },
    );

    packages.add(
      6,
      {
        id = 6;
        name = "Senior Citizen Tranquility Package";
        category = #senior;
        description = "Peaceful coastal retreat designed for senior citizens with comfortable accommodation, gentle nature walks, temple visits, Ayurvedic wellness, and local culture experiences.";
        pricePerPerson = 3500;
        priceGroup = 12000;
        inclusions = [
          "Comfortable air-conditioned homestay",
          "Temple & heritage tours",
          "Gentle beach walks",
          "Ayurvedic massage",
          "Local cuisine & healthy meals",
          "Assisted sightseeing",
          "Medical support on call",
        ];
        duration = "3 days 2 nights";
        maxGuests = 4;
        isAvailable = true;
      },
    );
  };

  func seedGalleryImages() {
    let images : [GalleryImage] = [
      {
        id = 1;
        category = #couples;
        imageUrl = "https://example.com/romantic1.jpg";
        caption = "Romantic beachside dinner setup";
      },
      {
        id = 2;
        category = #family;
        imageUrl = "https://example.com/family1.jpg";
        caption = "Family enjoying dolphin ride in Tarkarli";
      },
      {
        id = 3;
        category = #friends;
        imageUrl = "https://example.com/friends1.jpg";
        caption = "Group of friends at bonfire party";
      },
      {
        id = 4;
        category = #prewedding;
        imageUrl = "https://example.com/prewedding1.jpg";
        caption = "Prewedding shoot at Sindhudurg fort";
      },
      {
        id = 5;
        category = #monsoon;
        imageUrl = "https://example.com/monsoon1.jpg";
        caption = "Waterfall hike during monsoon season";
      },
      {
        id = 6;
        category = #senior;
        imageUrl = "https://example.com/senior1.jpg";
        caption = "Peaceful homestay retreat for seniors";
      },
    ];

    for (image in images.values()) {
      galleryImages.add(image.id, image);
    };
  };

  func seedTestimonials() {
    let testimonialsArray : [Testimonial] = [
      {
        id = 1;
        name = "Priya Sharma";
        location = "Mumbai";
        rating = 5;
        message = "Had an amazing couples experience, highly recommend!";
        category = #couples;
        date = "2024-04-03";
      },
      {
        id = 2;
        name = "Rajesh Patil";
        location = "Pune";
        rating = 4;
        message = "Great family trip, kids loved the dolphin ride!";
        category = #family;
        date = "2024-03-28";
      },
      {
        id = 3;
        name = "Ankita Joshi";
        location = "Nagpur";
        rating = 5;
        message = "Awesome friends getaway, loved the adventure activities!";
        category = #friends;
        date = "2024-02-15";
      },
      {
        id = 4;
        name = "Usha Kulkarni";
        location = "Kolhapur";
        rating = 5;
        message = "Wonderful experience, staff is very caring. Highly recommend for all seniors!";
        category = #senior;
        date = "2024-05-10";
      },
    ];

    for (testimonial in testimonialsArray.values()) {
      testimonials.add(testimonial.id, testimonial);
    };
  };

  public shared ({ caller }) func seed() : async () {
    if (packages.size() != 0) { Runtime.trap("Seed data already exists") };

    seedPackages();
    seedGalleryImages();
    seedTestimonials();
  };

  public query ({ caller }) func getAllPackages() : async [Package] {
    packages.values().toArray();
  };

  public query ({ caller }) func getPackagesByCategory(category : Category) : async [Package] {
    let filtered = List.fromIter<Package>(
      packages.values().filter(
        func(p) { p.category == category }
      )
    );
    filtered.toArray();
  };

  public query ({ caller }) func getPackageById(id : Nat) : async ?Package {
    packages.get(id);
  };

  public query ({ caller }) func getGalleryImagesByCategory(category : Category) : async [GalleryImage] {
    let images = List.fromIter<GalleryImage>(
      galleryImages.values().filter(
        func(image) { image.category == category }
      )
    );
    images.toArray();
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };

  public query ({ caller }) func getTestimonialsByCategory(category : Category) : async [Testimonial] {
    let testimonialsList = List.fromIter<Testimonial>(
      testimonials.values().filter(
        func(testimonial) { testimonial.category == category }
      )
    );
    testimonialsList.toArray();
  };

  public shared ({ caller }) func submitInquiry(name : Text, phone : Text, packageId : Nat, packageName : Text, guestCount : Nat, preferredDate : Text, message : Text) : async Nat {
    let id = inquiries.size() + 1;
    let inquiry : Inquiry = {
      id;
      name;
      phone;
      packageId;
      packageName;
      guestCount;
      preferredDate;
      message;
      submittedAt = Time.now();
    };
    inquiries.add(id, inquiry);
    id;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray();
  };

  public query ({ caller }) func getAllGalleryImages() : async [GalleryImage] {
    galleryImages.values().toArray();
  };
};
