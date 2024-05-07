export const LINKS = {
  NEWS: {
    subcategories: {
      GOVERNMENT: "government",
      CRIME: "crime",
      EDUCATION: "education",
      "LOCAL NEWS": "local",
    },
  },
  SPORTS: {
    subcategories: {
      "HIGH SCHOOL SPORTS": "high-school",
      "LOCAL SPORTS": "local",
    },
  },
};
export const createArticleUrl = ({ category, subcategory, id }) => {
  return `${category.toLowerCase()}/${
    LINKS[category]["subcategories"][subcategory]
  }/${id}`;
};

export const isValidArticleLink = ({ category, subcategory }) => {
  return (
    category.toUpperCase() in LINKS &&
    Object.values(LINKS[category.toUpperCase()]["subcategories"]).includes(
      subcategory
    )
  );
};
