import { PLACEHOLDER_IMAGE } from "@utils/site-constants";
import Image from "next/image";
import styles from "./CircularImage.module.scss";

export default function CircularImage({
  src = PLACEHOLDER_IMAGE,
  alt,
  size = 280,
}) {
  return (
    <div className={styles.wrapper} style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={styles.image}
      />
    </div>
  );
}
