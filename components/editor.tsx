"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  editable?: boolean;
  initialContent?: string;
  onChangeContent: (value: string) => void;
}

const Editor = ({ editable, initialContent, onChangeContent }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const edgestore = useEdgeStore();

  const handleFileUpload = async (file: File) => {
    const response = await edgestore.edgestore.publicFiles.upload({ file });

    return response.url;
  };

  const editor: BlockNoteEditor | null = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleFileUpload,
  });

  return (
    <>
      <div>
        <BlockNoteView
          editable={editable}
          editor={editor}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          onChange={() => {
            onChangeContent(JSON.stringify(editor.document, null, 2));
          }}
        />
      </div>
    </>
  );
};

export default Editor;
