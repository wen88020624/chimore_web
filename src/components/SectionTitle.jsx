import Typography from "@mui/joy/Typography";
import styles from "./SectionTitle.module.scss";

export default function SectionTitle({ children, className = "" }) {
  return (
    <Typography
      level="h2"
      className={`${styles.sectionTitle} ${className}`.trim()}
      sx={{ textAlign: "center", width: "100%" }}
    >
      {children}
    </Typography>
  );
}
