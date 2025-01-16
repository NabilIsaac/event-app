import React from 'react';
import { StyleSheet } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';

type CustomCardProps = React.ComponentProps<typeof PaperCard>;

const CustomCard: React.FC<CustomCardProps> & {
  Content: typeof PaperCard.Content;
  Cover: typeof PaperCard.Cover;
} = ({ style, children, ...props }) => (
  <PaperCard style={[styles.card, style]} {...props}>
    {children}
  </PaperCard>
);

const CustomCardCover: React.FC<React.ComponentProps<typeof PaperCard.Cover>> = ({ style, ...props }) => (
  <PaperCard.Cover style={[styles.cover, style]} {...props} />
);

// Attach Card.Content and Card.Cover to CustomCard
CustomCard.Content = PaperCard.Content;
CustomCard.Cover = CustomCardCover;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  cover: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 195,
  },
});

export default CustomCard;
