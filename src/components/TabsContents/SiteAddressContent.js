import React, { useContext } from 'react';
import { Container, Header, Button, Grid, Image, Divider } from 'semantic-ui-react';
import { get } from 'lodash'
import AppContext from '../../services/AppContext';
import aliLogo from '../../assets/1280px-Aliexpress_logo1.png';
import styles from './TabContents.module.css';


const mainSites = [{
  url: 'aliexpress.com',
  imageUrl: aliLogo,
  sale: true,
  couponText: '2$',
  advertiseText: 'Бонус на первую покупку после регистрации'
}];

const otherSites = [
    { url: 'aliexpress.com', imageUrl: aliLogo, couponText: '2$', advertiseText: 'Бонус на первую покупку после регистрации'},
    { url: 'www.site2.ru', imageUrl: aliLogo, couponText: '2$', advertiseText: 'Бонус на первую покупку после регистрации' },
    { url: 'www.site2.ru', imageUrl: aliLogo, couponText: '2$', advertiseText: 'Бонус на первую покупку после регистрации' },
    { url: 'www.site2.ru', imageUrl: aliLogo, couponText: '2$', advertiseText: 'Бонус на первую покупку после регистрации' },
    { url: 'www.site2.ru', imageUrl: aliLogo, couponText: '2$', advertiseText: 'Бонус на первую покупку после регистрации' },
    { url: 'www.site2.ru', imageUrl: aliLogo, couponText: '2$', advertiseText: 'Бонус на первую покупку после регистрации' },
    { url: 'www.site2.ru', imageUrl: aliLogo, couponText: '2$', advertiseText: 'Бонус на первую покупку после регистрации' },
    { url: 'www.site2.ru', imageUrl: aliLogo, couponText: '2$', advertiseText: 'Бонус на первую покупку после регистрации' },
];


const NoConnectionContent = ({currentLangData, refetchSiteInfo}) => {
  return (
    <div className={styles.noConnectionContainer}>
      <div className={styles.noConnectionContainer__image} />
        <Header as='h3'>{get(currentLangData, `www.no-connection-header`, '')}</Header>
        <p className={styles.noConnectionContainer__explanation}>{get(currentLangData, `www.no-connection-explanation`, '')}</p>
        <div>
          <Button color='green' onClick={() => refetchSiteInfo()}>
            {get(currentLangData, `www.reftrsh-site`, '')}
          </Button>
        </div>
    </div>
  );
}

const AddressesGrid = ({ currentLangData, sites }) => {
  return (
    <Grid padded>
      {sites.map((s, idx) => (
        <Grid.Row key={idx}>
          <Grid.Column width={4} className={styles['addressesContainer__column--advertisment']}>
            <Image src={s.imageUrl} fluid />
            {/* <a href={s.url}>{s.url}</a> */}
          </Grid.Column>
          <Grid.Column width={8} className={styles['addressesContainer__column--advertisment']}>
            <div className={styles.addressesContainer__coupon}>
              {!!s.sale && <div className={styles.addressesContainer__sale} />}
            </div>
            <div>{s.advertiseText}</div>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button color='green'>
              {get(currentLangData, `www.go-to-site`, '')}
            </Button>
          </Grid.Column>  
        </Grid.Row>
      ))}
    </Grid>
  );
}

const SiteAddressContent = () => {
  const { currentLangData, connectionStatus, refetchSiteInfo } = useContext(AppContext);

  const content = !connectionStatus ? 
    <NoConnectionContent currentLangData={currentLangData} refetchSiteInfo={refetchSiteInfo} /> :
    <>
      <AddressesGrid currentLangData={currentLangData} sites={mainSites} />
      <Divider horizontal>{get(currentLangData, `www.other-shops-devider`, '')}</Divider>
      <Container fluid className={styles['addressesContainer--other']}>
        <AddressesGrid currentLangData={currentLangData} sites={otherSites} />
      </Container>
    </>
    return (
      <>
        { content }
      </>
    );
};

export default SiteAddressContent;