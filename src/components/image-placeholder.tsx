import { Image as ImageIcon } from "lucide-react";

type ImagePlaceholderProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function ImagePlaceholder({
  src,
  alt,
  className = "",
  imageClassName = "",
  priority = false,
}: ImagePlaceholderProps) {
  return (
    <div className={`image-placeholder ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={imageClassName}
        loading={priority ? "eager" : "lazy"}
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}