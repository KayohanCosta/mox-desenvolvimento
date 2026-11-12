import Image from "next/image";

export function PageHeroArt({ src }: { src: string }) {
  return (
    <div className="page-hero-art" aria-hidden="true">
      <Image
        src={src}
        alt=""
        width={1200}
        height={1200}
        priority
        sizes="(max-width: 1023px) 90vw, 45vw"
      />
    </div>
  );
}
