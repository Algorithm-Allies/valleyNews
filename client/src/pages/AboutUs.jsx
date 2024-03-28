import React from "react";
import AboutUsCard from "../components/AboutUsCard";

function AboutUs() {
  const aboutUsDummyData = [
    {
      name: 'Cloud Strife',
      role: 'Frontend Lead',
      image: 'https://practicaltyping.com/wp-content/uploads/2023/05/cloud-strife-ff7remake.jpg',
      imageAltText: 'cloud strife',
      githubLink: '',
      linkedInLink: '',
      websiteLink: ''
    },
    {
      name: 'Aerith Gainsborough',
      role: 'Backend Lead',
      image: 'https://media.zenfs.com/en/bbc_us_articles_995/2c134d15668cbd52a684884512dc776f',
      imageAltText: 'aerith gainsborough',
      githubLink: '',
      linkedInLink: '',
      websiteLink: ''
    },
    {
      name: 'Barrett Wallace',
      role: 'Frontend Engineer',
      image: 'https://pbs.twimg.com/media/ExvZ1LlXMAAXgti.jpg',
      imageAltText: 'barrett wallace',
      githubLink: '',
      linkedInLink: '',
      websiteLink: ''
    },
    {
      name: 'Tifa Lockhart',
      role: 'Frontend Designer',
      image: 'https://www.gamespot.com/a/uploads/screen_kubrick/1581/15811374/3653723-final%20fantasy%20vii%20remake_20200410133520.jpg',
      imageAltText: 'tifa lockhart',
      githubLink: '',
      linkedInLink: '',
      websiteLink: ''
    },
    {
      name: 'Yuffie Kisaragi',
      role: 'QA Tester',
      image: 'https://cdn.vox-cdn.com/thumbor/nwO7aRQg8TefrPX1k5E-qSPK5uU=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22658754/ff7rintergrade_aprilscreenshot_01_EeZEkS9e0.jpg',
      imageAltText: 'yuffie kisaragi',
      githubLink: '',
      linkedInLink: '',
      websiteLink: ''
    },
    {
      name: 'Zack Fair',
      role: 'Journalist',
      image: 'https://editors.dexerto.com/wp-content/uploads/2023/10/24/Copy-of-dexerto-feature-images-with-correct-dimensions-2023-10-24T140246.633.jpg',
      imageAltText: 'zack fair',
      githubLink: '',
      linkedInLink: '',
      websiteLink: ''
    },
  ]
  return <div className="grid grid-cols-3 auto-cols-fr gap-6">
    {
      aboutUsDummyData.map((data => {
        return (
          <AboutUsCard name={data.name} role={data.role} image={data.image} imageAltText={data.imageAltText} />
        )
      }))
    }
  </div>;
}

export default AboutUs;
