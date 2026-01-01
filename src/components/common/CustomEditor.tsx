// components/common/CustomEditor.tsx
"use client";

import React, { useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false }) as any;

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
  const quillRef = useRef<any>(null);

  // Helper to handle file upload and insertion
  const handleFileUpload = async (file: File, type: "image" | "video") => {
    try {
      console.log(`Starting ${type} upload for file:`, file.name);
      const uploadFunc = type === "image" ? onImageUpload : onVideoUpload;
      const downloadURL = await uploadFunc(file);
      console.log(`${type} uploaded successfully. URL:`, downloadURL);

      if (!downloadURL) {
        throw new Error("Upload returned empty URL");
      }

      // Robustly get the quill instance
      let quill = quillRef.current?.editor;
      if (!quill && quillRef.current?.getEditor) {
        quill = quillRef.current.getEditor();
      }

      if (quill) {
        // Ensure editor has focus or insert at end
        // If we lost focus (due to file dialog), getSelection might be null.
        const range = quill.getSelection(true); // true forces focus check? No, looks at current selection.

        let index = quill.getLength(); // Default to end
        if (range) {
          index = range.index;
        } else {
          // If no selection, we insert at the end.
          // But we try to safeguard against inserting "after" the trailing newline?
          // Quill usually handles index=length fine (appends).
        }

        console.log(`Inserting ${type} at index ${index}`);
        quill.insertEmbed(index, type, downloadURL);

        // Move cursor after the image
        quill.setSelection(index + 1);
      } else {
        console.error("Quill editor instance not found!");
      }
    } catch (error) {
      console.error(`${type} upload failed:`, error);
      alert(`Failed to upload ${type}. See console for details.`);
    }
  };


  useEffect(() => {
    let quill: any = null;
    if (quillRef.current) {
      // Handle different potential ref structures for ReactQuill
      quill = quillRef.current.editor || (quillRef.current.getEditor ? quillRef.current.getEditor() : null);
    }

    if (!quill) return;

    // Custom matcher to intercept base64 images from paste
    // This is a bit tricky with ReactQuill's module system, so we'll use a DOM listener approach
    // for paste and drop events on the editor container.

    // Handler for Paste
    const handlePaste = async (e: ClipboardEvent) => {
      // 1. Handle Files in Clipboard (e.g., Snipping Tool, direct image copy)
      if (e.clipboardData && e.clipboardData.items) {
        const items = Array.from(e.clipboardData.items);
        const imageItems = items.filter((item) => item.type.startsWith("image/"));

        if (imageItems.length > 0) {
          e.preventDefault(); // allow mostly for text, but manual handle images
          // Wait, if we preventDefault, text won't paste. 
          // We should only preventDefault if we are handling it.
          // Yet if there is mixed content, it's tricky. 
          // For now, if there is ANY image, we assume it's an image paste intent or we extract images.

          for (const item of imageItems) {
            const file = item.getAsFile();
            if (file) {
              await handleFileUpload(file, "image");
            }
          }
          return;
        }
      }

      // 2. Handle Base64 strings in HTML (if user copies from another web page)
      // This is harder to catch via 'items'. ReactQuill usually handles HTML paste.
      // We need a Matcher for this. See below.
    };

    // Handler for Drop
    const handleDrop = async (e: DragEvent) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter((f) => f.type.startsWith("image/"));
        const videoFiles = files.filter((f) => f.type.startsWith("video/"));

        if (imageFiles.length > 0 || videoFiles.length > 0) {
          e.preventDefault(); // Stop browser opening file

          for (const file of imageFiles) {
            await handleFileUpload(file, "image");
          }
          for (const file of videoFiles) {
            await handleFileUpload(file, "video");
          }
        }
      }
    };

    // Add Matcher to intercept Image Floats / Base64 pasted as HTML
    // This runs when Quill processes pasted HTML.
    quill.clipboard.addMatcher('IMG', (node: any, delta: any) => {
      // If the image source is Base64, we want to upload it (if technicaly possible synchronously?)
      // We CANNOT upload synchronously in a matcher.
      // So we have to allow it, AND THEN trigger an upload? 
      // OR we replace it with a placeholder, upload, and then replace placeholder.

      // For now, if it's base64, we might accept it but we really want to avoid it.
      // A better approach is: strip it out and manually upload?
      // Since we can't do async here, we'll let existing logic `handlePaste` catch raw files.
      // If it's an `<img>` tag pasted from another site, it has a URL. That URL is fine (hotlinked) or we might want to proxy it.
      // If it's a data: URL, we should kill it.

      if (node.src && node.src.startsWith('data:image')) {
        // Log warning or try to convert?
        // Blocking it is safer for performance.
        console.warn("Blocked Base64 image paste. Please upload the image file directly.");
        return new (window as any).Delta(); // Return empty delta for this node (removes it)
      }
      return delta;
    });

    const editorNode = quill.root;
    editorNode.addEventListener("paste", handlePaste);
    editorNode.addEventListener("drop", handleDrop);

    return () => {
      editorNode.removeEventListener("paste", handlePaste);
      editorNode.removeEventListener("drop", handleDrop);
    };
  }, [onImageUpload, onVideoUpload]);

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
        ref={quillRef}
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