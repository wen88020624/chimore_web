import { FACEBOOK_URL } from "@utils/site-constants";
import styles from "./SocialLink.module.scss";
import { FacebookIcon } from "./icons";

export default function FacebookLink() {
  return (
    <a
      href={FACEBOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.facebookLink}
    >
      <FacebookIcon size={22} />
      <span>Facebook 粉絲專頁</span>
    </a>
  );
}
