import { useMutation, useQuery } from "@tanstack/react-query";
import { Category } from "../backend.d";
import { useActor } from "./useActor";

export { Category };

export function useAllPackages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["packages", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePackagesByCategory(category: Category) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["packages", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPackagesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllGalleryImages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGalleryImages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      packageId,
      packageName,
      guestCount,
      preferredDate,
      message,
    }: {
      name: string;
      phone: string;
      packageId: bigint;
      packageName: string;
      guestCount: bigint;
      preferredDate: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitInquiry(
        name,
        phone,
        packageId,
        packageName,
        guestCount,
        preferredDate,
        message,
      );
    },
  });
}
