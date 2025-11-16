// components/common/CustomEditor.tsx
"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// *** IMPORTANT: Update the interface to include the new props ***
interface CustomEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  height?: string;
  // Define the new props here
  onImageUpload: (file: File) => Promise<string>;
  onVideoUpload: (file: File) => Promise<string>;
}

export default function CustomEditor({
  value,
  onChange,
  placeholder = "Write something...",
  readOnly = false,
  height = "300px",
  // *** Destructure the new props here ***
  onImageUpload,
  onVideoUpload,
}: CustomEditorProps) {

  // Image handler that uses the prop
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        try {
          // Call the passed-in prop function to handle the upload
          const downloadURL = await onImageUpload(file);
          const quill = (ReactQuill as any).editor;
          if (quill) {
            const range = quill.getSelection();
            quill.insertEmbed(range.index, "image", downloadURL);
          }
        } catch (error) {
          console.error("Image upload failed in CustomEditor:", error);
          // Optionally show a user-friendly error message
        }
      }
    };
  };

  // Video handler that uses the prop
  const videoHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        try {
          // Call the passed-in prop function to handle the upload
          const downloadURL = await onVideoUpload(file);
          const quill = (ReactQuill as any).editor;
          if (quill) {
            const range = quill.getSelection();
            quill.insertEmbed(range.index, "video", downloadURL);
          }
        } catch (error) {
          console.error("Video upload failed in CustomEditor:", error);
          // Optionally show a user-friendly error message
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["blockquote", "code-block"],
          ["link", "image", "video", "formula"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler, // Assign the internal handler
          video: videoHandler, // Assign the internal handler
        },
      },
    }),
    [imageHandler, videoHandler] // Dependencies for useMemo
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold", "italic", "underline", "strike",
    "blockquote", "code-block",
    "list",
    "indent", "script", "align",
    "color", "background",
    "link", "image", "video", "formula",
  ];

  return (
    <div style={{ height }}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={readOnly}
        style={{ height: "100%" }}
      />
    </div>
  );
}