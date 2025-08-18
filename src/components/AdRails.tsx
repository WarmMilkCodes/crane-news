import LocalAd from "@/components/ads/LocalAd";
// import GoogleAd from "@/components/ads/GoogleAd"; // when ready

const ENABLE_ADS = false; // 🔒 flip to true when you want ads live

export default function AdRails() {
  if (!ENABLE_ADS) return null;

  return (
    <>
      <aside className="rail rail-left space-y-4">
        <LocalAd
          image="/ads/pizza-depot-300x250.jpg"
          url="https://example.com"
          alt="Pizza Depot"
        />
        <LocalAd
          image="/ads/hardware-300x600.jpg"
          url="https://example.com"
          alt="Crane Hardware"
        />
      </aside>

      <aside className="rail rail-right space-y-4">
        <LocalAd
          image="/ads/insurance-300x250.jpg"
          url="https://example.com"
          alt="Farm & Home Insurance"
        />
      </aside>
    </>
  );
}
