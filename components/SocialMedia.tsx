import SocialIcon from "./SocialIcon";

const SocialMedia = () => {
  return (
    <div className="hidden mx-16 px-6 py-8 lg:flex flex-row flex-wrap items-end justify-end gap-2 max-w-full bg-background rounded-b-4xl">
      <p className="text-muted-foreground">Proximamente Siguenos</p>
      <SocialIcon network="Facebook" className="w-6 h-6 fill-accent" />
      <SocialIcon network="Instagram" className="w-6 h-6 fill-accent" />
      <SocialIcon network="Youtube" className="w-6 h-6 fill-accent" />
    </div>
  );
};

export default SocialMedia;
