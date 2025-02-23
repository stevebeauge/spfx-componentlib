import { ShinnyButton } from "@repo/shared";
import styles from "./MyWebPart.module.scss";

require("../../../../node_modules/@repo/shared/dist/components/ShinnyButton.module.css");

const MyWebPart: React.FC = () => {
  return (
    <div className={styles.myWebPart}>
      <h1>My Web Part</h1>
      <ShinnyButton />
    </div>
  );
};

export { MyWebPart };
