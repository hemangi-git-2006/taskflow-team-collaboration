import { useState } from "react";
import { FaTimes } from "react-icons/fa";

function TaskAttachments({ attachments = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!attachments.length) {
    return (
      <span className="text-xs text-slate-400">
        No images
      </span>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {attachments.map((attachment, index) => {
          const url =
            typeof attachment === "string"
              ? attachment
              : attachment?.url;

          const name =
            typeof attachment === "string"
              ? `Image ${index + 1}`
              : attachment?.filename || `Image ${index + 1}`;

          return (
            <button
              key={index}
              type="button"
              onClick={() =>
                setSelectedImage({
                  url,
                  name,
                })
              }
              className="rounded-lg overflow-hidden border border-slate-200"
            >
              <img
                src={url}
                alt={name}
                className="w-20 h-20 object-cover"
              />
            </button>
          );
        })}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white"
            >
              <FaTimes />
            </button>

            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="mx-auto max-h-[80vh] max-w-full object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TaskAttachments;