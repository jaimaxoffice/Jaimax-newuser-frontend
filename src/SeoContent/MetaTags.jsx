import PropTypes from "prop-types";
import { useEffect } from "react";

/**
 * This component is used for adding title, meta description, and canonical link for SEO
 * @param {*} { title, description, canonical }
 * @return {*}
 */
const MetaTags = ({ title, description, canonical,schema  }) => {
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
const oldSchemaScripts = document.querySelectorAll(
      "script[data-meta-schema='true']"
    );
    oldSchemaScripts.forEach((node) => node.remove());

    if (schema) {
      const schemaArray = Array.isArray(schema) ? schema : [schema];

      schemaArray.forEach((schemaObj) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-meta-schema", "true");
        script.text = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      });
    }
  }, [title, description, canonical,schema]);

  return null;
};

MetaTags.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  canonical: PropTypes.string, // optional
   schema: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

export default MetaTags;
