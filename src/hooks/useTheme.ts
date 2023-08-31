import { useState } from "react";

const useTheme = () => {
  const [dark, setDark] = useState<boolean>(true);

  const toDark = () => {
    setDark(true);
  };

  const toLight = () => {
    setDark(false);
  };

  return { dark, toDark, toLight };
};

export default useTheme;
