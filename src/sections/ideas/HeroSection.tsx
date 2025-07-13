interface HeroSectionProps {
  image?: string;
}

const HeroSection = (props: HeroSectionProps) => {
  return (
    <div className="w-full h-[calc(100vh-200px)] md:h-[calc(100vh-150px)] sm:h-[calc(100vh-100px)]">
      <div
        className="w-full h-full flex items-center justify-center relative"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 75%, 0% 100%)" }}
      >
        <img
          src={props.image}
          alt="hero-image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-black/40"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)",
          }}
        ></div>
        <div className="relative px-4">
          <h1 className="text-center text-slate-50 text-3xl md:text-4xl font-medium">
            Ideas <br />
            <span className="font-normal text-xl md:text-2xl mt-2 block">
              Where all our great things begin
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
