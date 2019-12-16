import React, { useContext } from 'react';
import { Container, Header, Button, Grid, Image, Divider } from 'semantic-ui-react';
import { get } from 'lodash'
import AppContext from '../../services/AppContext';
import aliLogo from '../../assets/1280px-Aliexpress_logo1.png';


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


const NoConnectionContent = ({currentLangData, setConnectionStatus}) => {
  return (
    <div className='no-content-container'>
      <div className='no-content-image' />
        <Header as='h3'>{get(currentLangData, `www.no-connection-header`, '')}</Header>
        <p className='no-content-explanation'>{get(currentLangData, `www.no-connection-explanation`, '')}</p>
        <div>
          <Button color='green' onClick={() => setConnectionStatus(true)}>
            {get(currentLangData, `www.reftrsh-site`, '')}
          </Button>
        </div>
    </div>
  );
}

const SiteAddressContent = () => {
  const { currentLangData, connectionStatus, setConnectionStatus } = useContext(AppContext);

  const content = !connectionStatus ? 
    <NoConnectionContent currentLangData={currentLangData} setConnectionStatus={setConnectionStatus} /> :
    <>
      <Grid columns={3} padded className='ext-addresses-table ext-addresses-main-table'>
        {mainSites.map((s, idx) => (
          <Grid.Row key={idx}>
            <Grid.Column width={4}>
              <Image src={s.imageUrl} fluid />
              <a href={s.url}>{s.url}</a>
            </Grid.Column>
            <Grid.Column width={8} className='advertisment-column'>
              <div className='coupon'>
                {/* {s.couponText} */}
                {!!s.sale && <div className='sale' />}
              </div>
              <div className='advertisment-text'>{s.advertiseText}</div>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button color='green'>
                go to site
              </Button>
            </Grid.Column>  
          </Grid.Row>
        ))}
      </Grid>
      <Divider horizontal>Другие магазины</Divider>
      <Container fluid className='ext-addresses-other-container'>
        <Grid columns={3} padded className='ext-addresses-table'>
          {otherSites.map((s, idx) => (
            <Grid.Row key={idx}>
              <Grid.Column width={4}>
                <Image src={s.imageUrl} fluid />
                <a href={s.url}>{s.url}</a>
              </Grid.Column>
              <Grid.Column width={8} className='advertisment-column'>
              <div className='coupon'>
                {/* {s.couponText} */}
                {!!s.sale && <div className='sale' />}
              </div>
              <div className='advertisment-text'>{s.advertiseText}</div>
            </Grid.Column>
              <Grid.Column width={4}>
                <Button color='green'>
                  go to site
                </Button>
              </Grid.Column>  
            </Grid.Row>
          ))}
        </Grid>
      </Container>
    </>
    return (
      <>
        { content }
      </>
    );
};

export default SiteAddressContent;