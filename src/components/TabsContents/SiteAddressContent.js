import React, { useContext } from 'react';
import { Container, Header, Button, Grid, Image, Divider } from 'semantic-ui-react';
import { get } from 'lodash'
import AppContext from '../../services/AppContext';
import styles from './TabContents.module.css';

// TODO: get rid of it
const defaultLogo = 'https://v2l.ccdnss.com/genfiles/cms/pg/70/images/09ef1ad2e0b8613684c2d1cd91f4d3a6.svg';

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
            <Image src={defaultLogo} fluid  />
            {/* <a href={s.url}>{s.url}</a> */}
          </Grid.Column>
          <Grid.Column width={8} className={styles['addressesContainer__column--advertisment']}>
            <div className={styles.addressesContainer__coupon}>
              {!!s.sale && <div className={styles.addressesContainer__sale} />}
            </div>
            <div>{s.bonus}{!!s.promocode && <span>( {s.promocode} )</span>}</div>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button color='green' onClick={() => { window.location.href=s.mirror }}> {/* disabled={!!s.blocked} */}
              {get(currentLangData, `www.go-to-site`, '')}
            </Button>
          </Grid.Column>  
        </Grid.Row>
      ))}
    </Grid>
  );
}

const SiteAddressContent = () => {
  const { currentLangData, connectionStatus, refetchSiteInfo, sitesInfo } = useContext(AppContext);

  const [mainSites, ...otherSites] = sitesInfo;

  const content = !connectionStatus ? 
    <NoConnectionContent currentLangData={currentLangData} refetchSiteInfo={refetchSiteInfo} /> :
    <>
      { !!mainSites && !!mainSites.found && 
        <AddressesGrid currentLangData={currentLangData} sites={[mainSites]} />
      }
      { !!otherSites && !!otherSites.length && 
        <>
          <Divider horizontal>{get(currentLangData, `www.other-shops-devider`, '')}</Divider>
          <Container fluid className={styles['addressesContainer--other']}>
            <AddressesGrid currentLangData={currentLangData} sites={otherSites} />
          </Container>
        </>
      }
    </>
    return (
      <>
        { content }
      </>
    );
};

export default SiteAddressContent;