import React from "react";
import AboutUsCard from "../components/AboutUsCard";

import MobinImg from "../assets/Mobin.jpg";
import ManuelImg from "../assets/Manuel.jpg";
import AlanImg from "../assets/Alan.jpg";
import AlissonImg from "../assets/Alisson.jpg";
import WilliamImg from "../assets/William.jpg";
import JonathanImg from "../assets/Jonathan.jpg";
import ChazzImg from "../assets/Chazz.jpg";

function AboutUs() {
  const aboutUsDummyData = [
    {
      name: "Mobin Nicokar",
      role: "Team Lead",
      image:
        MobinImg,
      imageAltText: "Mobin",
      githubLink: "https://github.com/mnicokar",
      linkedInLink: "https://www.linkedin.com/in/mnicokar/",
      websiteLink: "",
    },
    {
      name: "Manuel Manriquez",
      role: "FullStack Developer",
      image: ManuelImg,
      imageAltText: "Manuel",
      githubLink: "https://github.com/manriquezmanny",
      linkedInLink: "https://www.linkedin.com/in/manuel-manriquez-b2b8b3235/",
      websiteLink: "",
    },
    {
      name: "Alan Ibarra",
      role: "FullStack Developer",
      image: AlanImg,
      imageAltText: "Alan",
      githubLink: "https://github.com/Ibarra11",
      linkedInLink: "https://www.linkedin.com/in/alanjibarra/",
      websiteLink: "",
    },
    {
      name: "Alisson Ross",
      role: "Frontend Developer",
      image: AlissonImg,
      imageAltText: "Alisson",
      githubLink: "https://github.com/AlissonRoss",
      linkedInLink: "",
      websiteLink: "",
    },
    {
      name: "William Velichko",
      role: "FullStack Developer",
      image:
        WilliamImg,
      imageAltText: "William",
      githubLink: "https://github.com/williamvelichko",
      linkedInLink: "https://www.linkedin.com/in/williamvelichko/",
      websiteLink: "",
    },
    {
      name: "Jonathan Oliver",
      role: "FullStack Developer",
      image:
        JonathanImg,
      imageAltText: "Jonathan",
      githubLink: "https://github.com/jonoliver1997",
      linkedInLink: "https://www.linkedin.com/in/jonathan-oliver-webdev/",
      websiteLink: "",
    },
    {
      name: "Chazz Carrizales",
      role: "Frontend Developer",
      image:
        ChazzImg,
      imageAltText: "Chazz",
      githubLink: "https://github.com/czcarrizales",
      linkedInLink: "https://www.linkedin.com/in/chazz-carrizales/",
      websiteLink: "",
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-4">
      {aboutUsDummyData.map((data) => (
        <AboutUsCard
          key={data.name}
          name={data.name}
          role={data.role}
          image={data.image}
          imageAltText={data.imageAltText}
          githubLink={data.githubLink}
          linkedInLink={data.linkedInLink}
        />
      ))}
    </div>
  );
}

export default AboutUs;
