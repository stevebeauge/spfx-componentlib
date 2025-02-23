import { ShinnyButton } from "@repo/shared";
import styles from "./MyWebPart.module.scss";


const MyWebPart: React.FC = () => {
  return (
    <div className={styles.myWebPart}>
      <h1>My Web Part</h1>
      <ShinnyButton />
    </div>
  );
};

export { MyWebPart };
