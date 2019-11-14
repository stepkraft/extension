import React from 'react';
import { Container, Header, List, Image } from 'semantic-ui-react'

const otherBonuses = [
    { logo: '886802_logo_512x512.png', text: '5% cashback', url: 'https://taobao.com/' },
];

const BonusesContent = () => {
    return (
      <Container>
        <List divided relaxed>
          <List.Item>
            <Image avatar src='/aliexpress-569572.png' />
            <List.Content>
              <List.Header as='a'>Bonus: 5$</List.Header>
              <a href='https://www.aliexpress.com/'>https://www.aliexpress.com/</a>
            </List.Content>
          </List.Item>  
        </List>
    
        <Header as='h4'>Other bonuses</Header>
        <List divided relaxed>
          {otherBonuses.map(({logo, text, url}, idx) =>
            <List.Item key={idx}>
              <Image avatar src={`/${logo}`} />
              <List.Content>
                <List.Header as='a'>{text}</List.Header>
                <a href={url}>{url}</a>
              </List.Content>
            </List.Item> 
          )}
        </List>
      </Container>
    );
};

export default BonusesContent;