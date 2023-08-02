import { AiTwotoneHome } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { SiBookstack } from "react-icons/si";

let sections = {
  Projects: {
    link: "/Home",
    icon: <SiBookstack />,
  },
  Home1: {
    link: "/Home",
    icon: <AiTwotoneHome />,
  },
  Home2: {
    link: "/Home",
    icon: <AiTwotoneHome />,
  },
  Logout: {
    link: "/",
    icon: <ImExit />,
  },
};

export default sections;
