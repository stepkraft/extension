import React, { useContext } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import { get } from 'lodash'
import LangContext from '../../services/LangContext';

const otherSites = [
    { url: 'www.site1.ru', name: 'site1 shop' },
    { url: 'www.site2.ru', name: 'site2 shop' },
    { url: 'www.site3.ru', name: 'site3 shop' },
    { url: 'www.site4.ru', name: 'site4 shop' },
    { url: 'www.site5.ru', name: 'site5 shop' },
];


const NoConnectionContent = () => {
  const { currentLangData } = useContext(LangContext);
  return (
    <div className='no-content-container'>
      <div className='no-content-image' />
      <Header as='h3'>{get(currentLangData, `www.no-connection-header`, '')}</Header>
      <p className='no-content-explanation'>{get(currentLangData, `www.no-connection-explanation`, '')}</p>
      <div>
        <Button color='green'>{get(currentLangData, `www.reftrsh-site`, '')}</Button>
      </div>
    </div>
  );
}

const SiteAddressContent = () => {
    return (

      <NoConnectionContent/>

      // <Form>
      //   <Form.Field inline>
      //     <label>Address</label>
      //     <a href='www.site.ru'>www.site.ru</a>
      //   </Form.Field>
    
      //   <Header as='h4'>Other shops</Header>
      //   <Form.Group>
      //     {otherSites.map((site, idx) =>
      //       <Form.Field inline key={idx}>
      //         <label>{site.name}</label>
      //         <a href={site.url}>{site.url}</a>
      //       </Form.Field>
      //     )}
      //   </Form.Group>
      // </Form>
    );
};

export default SiteAddressContent;