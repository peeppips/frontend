import React from 'react';
import { HelmetProps } from 'react-helmet';
import { Helmet } from 'react-helmet';

interface MetaProps extends HelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const Meta: React.FC<MetaProps> = ({
  title = 'Welcome To Peeppips',
  description = 'We create bots',
  keywords = 'peeppips',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

export default Meta;
