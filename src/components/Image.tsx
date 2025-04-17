const images = import.meta.glob("/src/assets/**/*.{png,svg}", { eager: true });

const getImageByName = (name: string) => {
  const key = Object.keys(images).find((k) => k.endsWith(`/${name}`));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return key ? (images[key] as any).default : "";
};

export const Image = ({ imageName }: { imageName: string }) => {
  const imageSrc = getImageByName(imageName);

  return <img src={imageSrc} alt={imageName} />;
};
