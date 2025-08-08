import ImageGallery from "@/components/ImageGallery";

export const metadata = {
  title: "Home",
}

{/* This is the home page, I tried my best to keep all the functionality in components/context */}
export default function Home() {
  return (
    <div className={"Home"}>
      <ImageGallery />
    </div>
  );
}
