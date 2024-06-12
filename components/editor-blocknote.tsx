"use client";

import { cn } from "@/lib/utils";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useState } from "react";
import { RefCallBack } from "react-hook-form";

type Props = {
  onChange: (val: string) => void;
  initialContent?: string;
  editable?: boolean;

};

const EditorBLocknote = ({ onChange, initialContent, editable }: Props) => {
    const [f, setF] = useState(false)
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? JSON.parse(initialContent)
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });
  return <BlockNoteView onBlur={()=>setF(false)} onFocus={()=>setF(true)} className={cn("border rounded-lg p-2  ",f && 'ring-offset-2 ring-ring ring-1 transition outline-none')} editor={editor} />;
};

export default EditorBLocknote;
