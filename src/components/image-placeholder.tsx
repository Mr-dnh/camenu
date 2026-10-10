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
      <div className="image-placeholder__hint" aria-hidden="true">
        <ImageIcon size={19} strokeWidth={1.4} />
        <span>تصویر شما</span>
      </div>
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