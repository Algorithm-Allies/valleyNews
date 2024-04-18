const LINKS = {
  NEWS: {
    subCategories: {
      GOVERNMENT: "government",
      CRIME: "crime",
      EDUCATION: "education",
      "LOCAL NEWS": "local",
    },
  },
  SPORTS: {
    subCategories: {
      "HIGH SCHOOL SPORTS": "high-school",
      "LOCAL SPORTS": "local",
    },
  },
};
export const createArticleUrl = ({ category, subcategory, id }) => {
  return `${category.toLowerCase()}/${
    LINKS[category]["subCategories"][subcategory]
  }/${id}`;
};
