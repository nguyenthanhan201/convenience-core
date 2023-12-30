import { useEffect } from 'react';

import { HelmetProps } from './types';

const Helmet = (props: HelmetProps) => {
  const { title, description, keywords } = props;

  useEffect(() => {
    // Update document head when component mounts
    if (title) {
      document.title = title;
    }

    if (description) {
      const metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', description);
      } else {
        const newMetaTag = document.createElement('meta');
        newMetaTag.name = 'description';
        newMetaTag.content = description;
        document.head.appendChild(newMetaTag);
      }
    }

    if (keywords) {
      const metaKeywordsTag = document.querySelector('meta[name="keywords"]');
      if (metaKeywordsTag) {
        metaKeywordsTag.setAttribute('content', keywords);
      } else {
        const newMetaTag = document.createElement('meta');
        newMetaTag.name = 'keywords';
        newMetaTag.content = keywords;
        document.head.appendChild(newMetaTag);
      }
    }

    // Cleanup when component unmounts
    return () => {
      if (title) {
        document.title = '';
      }

      if (description) {
        const metaDescriptionTag = document.querySelector('meta[name="description"]');
        if (metaDescriptionTag) {
          metaDescriptionTag.remove();
        }
      }

      if (keywords) {
        const metaKeywordsTag = document.querySelector('meta[name="keywords"]');
        if (metaKeywordsTag) {
          metaKeywordsTag.remove();
        }
      }
    };
  }, [title, description, keywords]);

  return null;
};

export default Helmet;
