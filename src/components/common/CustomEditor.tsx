// components/common/CustomEditor.tsx
"use client";

import React, { useMemo, useRef, useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import { processEditorImage } from "@/utils/imageProcessor";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false }) as any;

interface CustomEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  height?: string;
  onImageUpload: (file: File) => Promise<string>;
  onVideoUpload: (file: File) => Promise<string>;
}

export default function CustomEditor({
  value,
  onChange,
  placeholder = "Write something...",
  readOnly = false,
  height = "300px",
  onImageUpload,
  onVideoUpload,
}: CustomEditorProps) {
  const quillRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper to get the Quill editor instance
  const getQuillInstance = () => {
    if (!quillRef.current) return null;

    // Try different ways to access the Quill instance
    if (quillRef.current.getEditor) {
      return quillRef.current.getEditor();
    }
    if (quillRef.current.editor) {
      return quillRef.current.editor;
    }
    if (quillRef.current.quill) {
      return quillRef.current.quill;
    }

    return quillRef.current;
  };

  // Handle editor initialization
  const handleEditorReady = () => {
    setEditorReady(true);
  };

  // Helper to handle file upload and insertion - FIXED VERSION
  const handleFileUpload = useCallback(async (file: File, type: "image" | "video") => {
    try {
      console.log(`Starting ${type} upload for file:`, file.name);

      let fileToUpload = file;

      // Process images: convert to WebP and compress
      if (type === "image") {
        console.log('Processing image:', file.name, `(${(file.size / 1024).toFixed(2)} KB)`);
        fileToUpload = await processEditorImage(file);
        console.log('Processed image:', fileToUpload.name, `(${(fileToUpload.size / 1024).toFixed(2)} KB)`);
      }

      const uploadFunc = type === "image" ? onImageUpload : onVideoUpload;
      const downloadURL = await uploadFunc(fileToUpload);
      console.log(`${type} uploaded successfully. URL:`, downloadURL);

      if (!downloadURL) {
        throw new Error("Upload returned empty URL");
      }

      // Get the Quill instance
      const quill = getQuillInstance();

      // Method 1: Use Quill's API if available
      if (quill && quill.insertEmbed && typeof quill.insertEmbed === 'function') {
        try {
          // Try to get selection, fallback to end
          let index = 0;

          if (quill.getSelection && typeof quill.getSelection === 'function') {
            const range = quill.getSelection();
            index = range ? range.index : quill.getLength();
          } else if (quill.getLength && typeof quill.getLength === 'function') {
            index = quill.getLength();
          }

          console.log(`Inserting ${type} at index ${index} using insertEmbed`);
          quill.insertEmbed(index, type, downloadURL);

          // Move cursor after the inserted content
          setTimeout(() => {
            if (quill.setSelection && typeof quill.setSelection === 'function') {
              quill.setSelection(index + 1, 0);
            }
          }, 100);

          return;
        } catch (error) {
          console.warn("Quill insertEmbed failed, trying alternative method:", error);
        }
      }

      // Method 2: Use dangerouslyPasteHTML to preserve existing content
      if (quill && quill.clipboard && quill.clipboard.dangerouslyPasteHTML) {
        try {
          // Get current cursor position
          let index = 0;
          if (quill.getSelection && typeof quill.getSelection === 'function') {
            const range = quill.getSelection();
            index = range ? range.index : quill.getLength();
          } else if (quill.getLength && typeof quill.getLength === 'function') {
            index = quill.getLength();
          }

          const embedHtml = type === 'image'
            ? `<img src="${downloadURL}" alt="${file.name}" />`
            : `<video controls><source src="${downloadURL}" type="${file.type}"></video>`;

          console.log(`Inserting ${type} at index ${index} using dangerouslyPasteHTML`);
          quill.clipboard.dangerouslyPasteHTML(index, embedHtml);
          return;
        } catch (error) {
          console.warn("dangerouslyPasteHTML failed, trying final method:", error);
        }
      }

      // Method 3: Fallback - get current HTML content, insert image, and update
      const currentHtml = value || '';
      const embedHtml = type === 'image'
        ? `<img src="${downloadURL}" alt="${file.name}" />`
        : `<video controls><source src="${downloadURL}" type="${file.type}"></video>`;

      // Get cursor position from the DOM if possible
      const editorElement = document.querySelector('.ql-editor');
      if (editorElement) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(editorElement);
          preCaretRange.setEnd(range.startContainer, range.startOffset);
          const caretPosition = preCaretRange.toString().length;

          // Insert at caret position
          const newHtml = currentHtml.slice(0, caretPosition) + embedHtml + currentHtml.slice(caretPosition);
          onChange(newHtml);
          return;
        }
      }

      // Last resort: append to the end
      console.log("Appending image to the end");
      const newHtml = currentHtml + embedHtml;
      onChange(newHtml);

    } catch (error) {
      console.error(`${type} upload failed:`, error);
      alert(`Failed to upload ${type}. See console for details.`);
    }
  }, [onImageUpload, onVideoUpload, value, onChange]);

  useEffect(() => {
    if (!editorReady) return;

    const quill = getQuillInstance();
    if (!quill) return;

    // Handler for Paste
    const handlePaste = async (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.items) {
        const items = Array.from(e.clipboardData.items);
        const imageItems = items.filter((item) => item.type.startsWith("image/"));

        if (imageItems.length > 0) {
          e.preventDefault(); // Prevent default to handle manually

          // Process each image
          for (const item of imageItems) {
            const file = item.getAsFile();
            if (file) {
              await handleFileUpload(file, "image");
            }
          }
          return;
        }
      }
    };

    // Handler for Drop
    const handleDrop = async (e: DragEvent) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter((f) => f.type.startsWith("image/"));
        const videoFiles = files.filter((f) => f.type.startsWith("video/"));

        if (imageFiles.length > 0 || videoFiles.length > 0) {
          e.preventDefault();
          e.stopPropagation();

          for (const file of imageFiles) {
            await handleFileUpload(file, "image");
          }
          for (const file of videoFiles) {
            await handleFileUpload(file, "video");
          }
        }
      }
    };

    // Check if clipboard methods exist before using them
    if (quill.clipboard && quill.clipboard.addMatcher) {
      quill.clipboard.addMatcher('IMG', (node: any, delta: any) => {
        if (node.src && node.src.startsWith('data:image')) {
          console.warn("Blocked Base64 image paste. Please upload the image file directly.");
          return new (window as any).Delta();
        }
        return delta;
      });
    }

    const editorNode = quill.root || quill.container;
    if (editorNode) {
      editorNode.addEventListener("paste", handlePaste);
      editorNode.addEventListener("drop", handleDrop);
    }

    return () => {
      if (editorNode) {
        editorNode.removeEventListener("paste", handlePaste);
        editorNode.removeEventListener("drop", handleDrop);
      }
    };
  }, [editorReady, handleFileUpload]);

  // Image handler that uses the prop
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        await handleFileUpload(file, "image");
      }
    };
  }, [handleFileUpload]);

  // Video handler that uses the prop
  const videoHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        await handleFileUpload(file, "video");
      }
    };
  }, [handleFileUpload]);

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
          image: imageHandler,
          video: videoHandler,
        },
      },
    }),
    [imageHandler, videoHandler]
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

  // Only render ReactQuill on the client
  if (!isClient) {
    return <div style={{ height, border: "1px solid #ccc" }} />;
  }

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
        onFocus={handleEditorReady}
        style={{
          height: "calc(100% - 42px)",
          minHeight: "200px"
        }}
      />
    </div>
  );
}