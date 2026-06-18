import { FACEBOOK_URL } from "@utils/site-constants";
import Image from "next/image";
import styles from "./SocialLink.module.scss";

export default function FacebookLink() {
  return (
    <a
      href={FACEBOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.facebookLink}
    >
      <Image src="/assets/facebook.svg" alt="Facebook" width={24} height={24} />
      <span>Facebook 粉絲專頁</span>
    </a>
  );
}
