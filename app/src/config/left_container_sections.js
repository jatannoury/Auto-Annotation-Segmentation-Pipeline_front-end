import { AiTwotoneHome, AiFillThunderbolt } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { SiBookstack } from "react-icons/si";

let sections = {
  Projects: {
    link: "/Home",
    icon: <SiBookstack />,
  },
  "Instant Prediction": {
    link: "/Instant-Prediction",
    icon: <AiFillThunderbolt />,
  },
  Logout: {
    link: "/",
    icon: <ImExit />,
  },
};

export default sections;
