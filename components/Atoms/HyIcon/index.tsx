import { StaticImageData } from "next/image";
import Image from "next/image";

type THyIcon = {
  icon: StaticImageData;
  size: "20" | "56" | "80" | "350";
  classes?: string;
};

export const HyIcon = (props: THyIcon) => {
  const { icon, size, classes } = props;

  return (
    <Image
      src={icon}
      alt="GFG logo imported from public directory"
      width={size}
      className={classes}
      height={size}
    />
  );
};
