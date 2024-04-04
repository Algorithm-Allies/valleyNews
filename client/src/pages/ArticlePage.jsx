import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../services/articleService";
import {
  CalendarDaysIcon,
  NewspaperIcon,
  UserCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

const ARTICLE_TEST_DATA = {
  source:
    "https://www.modbee.com/news/local/crime/article286999690.html#storylink=mainstage_lead",
  publisher: "The Modesto Bee",
  heading:
    "Modesto Police Review Board reports no bombshells in first 6 months — but makes suggestions",
  subheading: null,
  category: "NEWS",
  subcategory: "CRIME",
  author: "John Holland",
  date_published: "Updated March 23, 2024 11:55 AM",
  datetime: "2024-03-23T18:55:36.000Z",
  image: {
    src: "https://www.modbee.com/latest-news/tpkfzh/picture250807014/alternates/FREE_1140/MR_MPD_Protest.jpg",
    alt: "Thomas Helme (left) and Tom Crain attend a protest in front of the Modesto Police Department against the fatal shooting of Trevor Seever in Modesto, Calif., on Jan. 9, 2021.",
  },
  thumbnail:
    "https://www.modbee.com/latest-news/tpkfzh/picture250807014/alternates/LANDSCAPE_768/MR_MPD_Protest.jpg",
  paragraphs: [
    "The first detailed report is out on Modesto’s new system of police oversight.",
    "It shows no verified cases of major misconduct by officers from July through December 2023. The authors also sampled 22 complaints, such as discourtesy and false arrest, and found that managers generally dealt with them well.",
    "The report did question the “lenient” discipline for one officer, a woman accused of searching a female arrestee in a “sexually assaultive” manner. The officer was not named, and neither were the parties in other complaints.",
    "The report was compiled by a law firm hired last spring on a $451,000 contract over five years. It is guided by the Community Police Review Board, nine volunteers who do not work in law enforcement.",
    "The board voted unanimously Wednesday, March 20, to accept the report. It can be found seven pages into the agenda packet for the meeting. Future reports will cover full calendar years.",
    "The firm is the OIR Group, which is based near Los Angeles and specializes in police oversight. It does not do its own investigations into Modesto officer complaints but rather assesses how management handled the internal probes.",
    "It mostly did this job well, OIR Principal Stephen Connolly told the board. “They were very scrupulous about taking complaints,” he said. “The investigations were thorough.”",
    "The City Council launched the effort amid protests over shootings by officers in recent years.",
    "OIR’s reports will include shooting cases that complete MPD’s internal process during the reporting period. None fell into the July-December window for the document just presented to the board.",
    "Two recent shootings will be the subject of future OIR reporting. One happened last June 13 on Yosemite Boulevard and wounded Gordon Massey, 29. The other was Feb. 3 of this year and wounded Mark Coke Jr., 41, in west Modesto.",
    "The July-December report includes 22 times officers used various types of force. The firm concluded all were justified. They ranged from pulling a difficult suspect to the ground to firing a Taser to disable someone temporarily.",
    "OIR praised the department in general for using “deescalation” tactics to reduce force. They can include talking with an upset person or waiting for backup officers to arrive. The report urged that the options be clearly discussed on every such call.",
    "The firm noted rare occasions of profanity and other discourtesy by officers. This can be captured on their body-worn video cameras, which OIR can access as part of its review.",
    "The report said cameras have enhanced policing in general. It also noted that one was improperly turned off during parts of the search that prompted the sexual assault complaint against an officer. The lack of video evidence meant the claim could not be verified.",
    "OIR said this officer had a “low-level consequence” for the camera violation, which was not specified. The report said she had previous issues with keeping the camera on, and the latest discipline “seemed somewhat lenient to us.”",
    "MPD should insist that no officers turn off their cameras, said Darlene Ruiz, an activist since the shooting death of her son, Trevor Seever, by police in 2020.",
    "“It’s unconscionable that we allow this,” she told the board. “There’s no reason a body camera should be shut off.”",
    "Ruiz has said her son was under mental stress but did not pose a threat to police when he was shot outside a Woodland Avenue church.",
    "Officer Joseph Lamantia was cleared of manslaughter charges last July and is trying to get his job back. The city agreed in April to pay $7.5 million to settle a lawsuit from Seever’s family.",
    "Ruiz last year endorsed creation of the police oversight system, which also seeks to expand MPD’s practice of having social workers and other experts respond to certain calls.",
    "MPD already had statistics on officer complaints in its own annual reports. The most recent one, for 2022, showed 132 complaints amid 136,704 calls for service.",
    "This story was originally published March 23, 2024, 7:00 AM.",
  ],
};

export default function ArticlePage() {
  const {
    source,
    publisher,
    heading: headline,
    subheading,
    category,
    subcategory,
    author,
    date_published,
    image: { src: image_url },
    image: { alt: image_alt_description },
    paragraphs,
  } = ARTICLE_TEST_DATA;

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const id = useParams().id;
        const res = await getArticleById(id);
        if (res.ok) {
          setArticle(res.data);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, []);

  return (
    <div className="bg-brown-100 min-h-screen">
      <div className="max-w-3xl py-20 mx-auto text-stone-700 space-y-12">
        <article>
          <div className="space-y-1 mb-2">
            <h1 className="text-2xl font-bold text-pretty">{headline}</h1>
            {subheading && <p className="text-base">{subheading}</p>}
          </div>
          <div className="flex gap-1 items-center text-sm  mb-6">
            <p className="font-semibold">{category}</p>
            <ChevronRightIcon className="size-4 text-gray-500" />
            <p className="font-semibold">{subcategory}</p>
          </div>
          <img
            src={image_url}
            className="w-full h-[400px] object-cover rounded-md mb-3"
            alt={image_alt_description}
          />
          <div className="flex items-center gap-4 mb-6 text-sm text-stone-500">
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="size-4" />
              <p className="font-semibold">{date_published}</p>
            </div>

            <span className="block h-4 bg-brown-200 w-[2px]"></span>
            <div className="flex items-center gap-2">
              <NewspaperIcon className="size-4" />
              <p className="font-semibold">{publisher}</p>
            </div>
            <span className="block h-4 bg-brown-200 w-[2px]"></span>
            <div className="flex items-center gap-2">
              <UserCircleIcon className="size-4" />
              <p className="font-semibold">{author}</p>
            </div>
          </div>
          <div className="space-y-4 mb-6">
            {paragraphs.map((paragraph) => (
              <p className="text-base">{paragraph}</p>
            ))}
          </div>
          <a
            className="inline-flex rounded items-center px-4 h-10  bg-brown-400 text-white"
            href={source}
          >
            Original Article
          </a>
        </article>
        <div className="space-y-8">
          <CommentForm />
          <CommentList />
        </div>
      </div>
    </div>
  );
}
