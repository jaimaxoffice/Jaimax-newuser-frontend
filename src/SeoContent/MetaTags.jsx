import PropTypes from "prop-types";
import { useEffect } from "react";

/**
 * This component is used for adding title, meta description, and canonical link for SEO
 * @param {*} { title, description, canonical }
 * @return {*}
 */
const MetaTags = ({ title, description, canonical }) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Handle meta description
    let metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      metaDescription.content = description;
      document.head.appendChild(metaDescription);
    }

    // Handle canonical link
    let linkCanonical = document.querySelector("link[rel='canonical']");
    if (canonical) {
      if (linkCanonical) {
        linkCanonical.setAttribute("href", canonical);
      } else {
        linkCanonical = document.createElement("link");
        linkCanonical.rel = "canonical";
        linkCanonical.href = canonical;
        document.head.appendChild(linkCanonical);
      }
    } else if (linkCanonical) {
      // Remove canonical if not provided
      linkCanonical.remove();
    }

  }, [title, description, canonical]);

  return null;
};

MetaTags.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  canonical: PropTypes.string, // optional
};

export default MetaTags;
