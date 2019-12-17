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

const AddressesGrid = ({ currentLangData, sites, classNames = '' }) => {
  return (
    <Grid columns={3} padded className={[].concat('ext-addresses-table', classNames).filter(Boolean).join(' ')}>
      {sites.map((s, idx) => (
        <Grid.Row key={idx}>
          <Grid.Column width={4}>
            <Image src={s.imageUrl} fluid />
            <a href={s.url}>{s.url}</a>
          </Grid.Column>
          <Grid.Column width={8} className='advertisment-column'>
            <div className='coupon'>
              {!!s.sale && <div className='sale' />}
            </div>
            <div className='advertisment-text'>{s.advertiseText}</div>
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
  const { currentLangData, connectionStatus, setConnectionStatus } = useContext(AppContext);

  const content = !connectionStatus ? 
    <NoConnectionContent currentLangData={currentLangData} setConnectionStatus={setConnectionStatus} /> :
    <>
      <AddressesGrid currentLangData={currentLangData} sites={mainSites} classNames='ext-addresses-main-table' />
      <Divider horizontal>{get(currentLangData, `www.other-shops-devider`, '')}</Divider>
      <Container fluid className='ext-addresses-other-container'>
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