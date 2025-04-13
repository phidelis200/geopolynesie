"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Quote,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      // Using StarterKit as base but overriding list-related extensions
      StarterKit.configure({
        // Disable the built-in list extensions from StarterKit
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      // Add our custom list implementations
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-6",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-6",
        },
      }),
      // Add other extensions
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-800 underline",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 border-gray-300 pl-4 italic my-4",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Subscript,
      Superscript,
      Underline,
      Strike,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const setLink = () => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL:", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor?.chain().focus().unsetLink().run();
      return;
    }

    editor?.chain().focus().setLink({ href: url }).run();
  };

  if (!editor) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b p-2 flex gap-2 flex-wrap">
        {/* Heading buttons */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 1 })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 3 })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>

        {/* Text formatting buttons */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${
            editor.isActive("underline") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Underline"
        >
          <UnderlineIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded ${
            editor.isActive("strike") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={`p-2 rounded ${
            editor.isActive("superscript") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Superscript"
        >
          <SuperscriptIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={`p-2 rounded ${
            editor.isActive("subscript") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Subscript"
        >
          <SubscriptIcon size={18} />
        </button>

        {/* List buttons */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>

        {/* Block formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${
            editor.isActive("blockquote") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Blockquote"
        >
          <Quote size={18} />
        </button>

        {/* Link button */}
        <button
          onClick={setLink}
          className={`p-2 rounded ${
            editor.isActive("link") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Add Link"
        >
          <LinkIcon size={18} />
        </button>
      </div>
      <EditorContent editor={editor} className="prose max-w-none p-4" />
    </div>
  );
};

export default RichTextEditor;
