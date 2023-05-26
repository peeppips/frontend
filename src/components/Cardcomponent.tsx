import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

interface CardComponentProps {
  title: string;
  image: string;
  description: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, image, description }) => (
  <Card
    hoverable
    cover={<img alt="example" src={image} />}
  >
    <Meta title={title} description={description} />
  </Card>
);

export default CardComponent;
