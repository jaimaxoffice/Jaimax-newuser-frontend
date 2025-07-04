import { Helmet } from 'react-helmet-async';
import seoContent from './seoContent';

const Seo = ({ page }) => {
  const content = seoContent[page] || seoContent.dashboard;

  console.log("SEO page:", page);
  console.log("Title:", content.title);
  console.log("Description:", content.description);
const keywords =
  "Jaimax, Jaimax crypto, Jaimax coin, JMC token, invest in Jaimax, best crypto India, crypto investment India, future of crypto, blockchain India, new crypto coin, low price crypto 2025, decentralized finance, cryptocurrency opportunity, best crypto to invest 2025, Jaimax blockchain, buy Jaimax coin, digital currency India, Jaimax project, Indian crypto brand";
  return (
    <Helmet>
      <title>{content.title}</title>
      <meta name="description" content={content.description} key="desc" />
       <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Seo;
