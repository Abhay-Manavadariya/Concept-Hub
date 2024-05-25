"use client";
import { ImageIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: CoverProps) => {
  const edgestore = useEdgeStore();
  const coverImage = useCoverImage();
  const params = useParams();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (url) {
      await edgestore.edgestore.publicFiles.delete({
        url: url,
      });
    }

    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <>
      <div
        className={cn(
          "relative w-full h-[35vh] group",
          !url ? "h-[12vh]" : "bg-muted"
        )}
      >
        {/* !! is for working with boolean value. */}
        {!!url && (
          <Image src={url} fill alt="Cover Image" className="object-cover" />
        )}
        {url && !preview && (
          <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground text-xs"
              onClick={() => coverImage.onReplace(url)}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Change cover
            </Button>
            <Button
              onClick={onRemove}
              variant="outline"
              size="sm"
              className="text-muted-foreground text-xs"
            >
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cover;

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
