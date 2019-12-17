import React, { useContext } from 'react';
import { Container, Image, Grid, Segment, Button, Divider } from 'semantic-ui-react'
import { get } from 'lodash'
import AppContext from '../../services/AppContext';
import aliLogo from '../../assets/1280px-Aliexpress_logo1.png';
import puppySportLogo from '../../assets/puppy-sport-logo.png';
import trustsellersLogo from '../../assets/trustsellers-logo.png';
import bonusCoupon from '../../assets/bonus-coupon.png';

const bonuses = [
  { logo: aliLogo, url: 'aliexpress.com', coupon: bonusCoupon, active: true, main: true, bonusText: 'Скидка на первую покупку после регистрации' },
  { logo: puppySportLogo, url: 'www.puppyspot.com', coupon: bonusCoupon, active: true, main: false, bonusText: 'Скидка на первую покупку после регистрации' },
  { logo: trustsellersLogo, url: 'trustsellers.com', coupon: bonusCoupon, active: false, main: false, bonusText: 'Скидка на первую покупку после регистрации' },
  { logo: puppySportLogo, url: 'www.puppyspot.com', coupon: bonusCoupon, active: true, main: false, bonusText: 'Скидка на первую покупку после регистрации' },
  { logo: aliLogo, url: 'aliexpress.com', coupon: bonusCoupon, active: false, main: false, bonusText: 'Скидка на первую покупку после регистрации' },
  { logo: aliLogo, url: 'www.puppyspot.com', coupon: bonusCoupon, active: false, main: false, bonusText: 'Скидка на первую покупку после регистрации' },
  { logo: trustsellersLogo, url: 'trustsellers.com', coupon: bonusCoupon, active: true, main: false, bonusText: 'Скидка на первую покупку после регистрации' },
];

const BonusesContent = () => {
  const { currentLangData } = useContext(AppContext);

    return (
      <Container className='ext-bonuses-container'>
        <Grid stackable columns={2}>
          {bonuses.map((bonus, idx) => (
            <Grid.Column key={idx}>
              <Segment secondary={!!bonus.main}>
                <Container textAlign='center'>
                  <Image src={bonus.logo} fluid />
                  <a href={bonus.url}>{bonus.url}</a>
                </Container>
                <Divider hidden />
                <Container textAlign='center'>
                  <Image src={bonus.coupon} fluid />
                </Container>
                <Divider hidden />
                <Container textAlign='center'>
                  {bonus.bonusText}
                </Container>
                <Divider hidden />
                <Container textAlign='center'>
                  <Button color='green' disabled={!bonus.active}>
                    {get(currentLangData, `www.go-to-site`, '')}
                  </Button>
                </Container>
              </Segment>
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    );
};

export default BonusesContent;