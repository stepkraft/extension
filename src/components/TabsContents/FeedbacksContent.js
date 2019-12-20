import React, { useContext, useState } from 'react';
import { Container, Rating, Flag, Segment, Radio } from 'semantic-ui-react'
import { get } from 'lodash'
import AppContext from '../../services/AppContext';
import styles from './TabContents.module.css';

const currentCountry = 'Ukraine';
const comments = [
    { name: 'Name 1', country: 'ru', rating: 5, text: 'Excelente!!! Amei o relógio superou as minhas expectativas!!!!! Lindo demais, não fui taxada e levou 14 dias pra chegar p mim em Curitiba-Pr' },
    { name: 'Name 2', country: 'ua', rating: 2, text: 'Excelente!!! Amei o relógio superou as minhas expectativas!' },
    { name: 'Name 3', country: 'by', rating: 4, text: 'Entrega super rápida, moro no Goiás- Brasil, e demorou apenas 13 dias pra chegar. Produto lindo e sem defeitos. Estou satisfeito e farei novas compras com o vendedor' },
    { name: 'Name 4', country: 'fr', rating: 1, text: 'Excelente!!! Amei o relógio superou as minhas expectativas!!!!! Lindo demais, não fui taxada e levou 14 dias pra chegar p mim em Curitiba-Pr' },
    { name: 'Name 5', country: 'lt', rating: 4, text: 'Excelente!!! Amei o relógio superou as minhas expectativas!!!!! Lindo demais, não fui taxada e levou 14 dias pra chegar p mim em Curitiba-Pr' },
    { name: 'Name 6', country: 'de', rating: 5, text: 'Excelente!!! Amei o relógio superou as minhas expectativas!!!!! Lindo demais, não fui taxada e levou 14 dias pra chegar p mim em Curitiba-Pr' },
    { name: 'Name 7', country: 'uk', rating: 3, text: 'Excelente!!! Amei o relógio superou as minhas expectativas!!!!! Lindo demais, não fui taxada e levou 14 dias pra chegar p mim em Curitiba-Pr' },
];

const FeedbacksContent = () => {
  const { currentLangData } = useContext(AppContext);
  const [ useFilter, setFilter ] = useState(false);

    return (
      <Container>
        <Segment className={styles.feedbacksContainer__filter}>
          <span>{get(currentLangData, `feedbacks.filter-string`, '')}</span>
          <span><b>{currentCountry}</b></span>
          <Radio toggle checked={useFilter} onChange={(e, { checked }) => { setFilter(checked) }} />
        </Segment>
        <div className={styles.feedbacksContainer__list}>
          {comments.filter((c) => (!!useFilter ? c.country === 'ua' : true)).map((comment, idx) => (
            <Segment vertical key={idx}>
              <Container>
                <Flag name={comment.country} />
                {comment.country}
                <Rating defaultRating={comment.rating} maxRating={5} disabled />
              </Container>
              <Container>{comment.text}</Container>
            </Segment>
          ))}
        </div>
      </Container>
    );
};

export default FeedbacksContent;