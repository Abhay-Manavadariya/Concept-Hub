"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
//The useUser() hook is a convenient way to access the current User data where you need it. This hook provides the user data and helper methods to manage the current active session.
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentPage = () => {
  const userHook = useUser();
  const user = userHook.user;

  const create = useMutation(api.documents.create);
  const router = useRouter();

  const onCreate = () => {
    const promise = create({ title: "untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created 😊",
      error: "Failed to create a new note.❌",
    });
  };

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
          src="/empty.png"
          width="300"
          height="300"
          className="dark:hidden"
          alt="empty"
        />

        <Image
          src="/empty-dark.png"
          width="300"
          height="300"
          className="hidden dark:block"
          alt="empty"
        />
        <h2 className="text-lg font-medium">
          Welcome to {user ? user.firstName : ""}&apos;s concept Hub
        </h2>
        <Button onClick={onCreate}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Create a note
        </Button>
      </div>
    </>
  );
};

export default DocumentPage;
