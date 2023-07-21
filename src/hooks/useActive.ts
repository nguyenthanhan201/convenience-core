import { useState } from "react";

const useActive = () => {
  const [active, setActive] = useState(false);
  const test = 1;
  return { active, setActive, test };
};

export default useActive;
