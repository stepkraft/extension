import React from 'react';
import { Form, Header } from 'semantic-ui-react'

const otherSites = [
    { url: 'www.site1.ru', name: 'site1 shop' },
    { url: 'www.site2.ru', name: 'site2 shop' },
    { url: 'www.site3.ru', name: 'site3 shop' },
    { url: 'www.site4.ru', name: 'site4 shop' },
    { url: 'www.site5.ru', name: 'site5 shop' },
];

const SiteAddressContent = () => {
    return (
      <Form>
        <Form.Field inline>
          <label>Address</label>
          <a href='www.site.ru'>www.site.ru</a>
        </Form.Field>
    
        <Header as='h4'>Other shops</Header>
        <Form.Group>
          {otherSites.map((site) =>
            <Form.Field inline>
              <label>{site.name}</label>
              <a href={site.url}>{site.url}</a>
            </Form.Field>
          )}
        </Form.Group>
      </Form>
    );
};

export default SiteAddressContent;