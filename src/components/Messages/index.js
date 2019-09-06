import React from 'react';

//data
import users from 'data/users';

//icons
import faMoon from '../../icons/moon-inv.svg';
import faBars from '../../icons/list-small.svg';
import faCog from '../../icons/cog.svg';
import faFeather from '../../icons/feather.svg';
import faSearch from '../../icons/search.svg';

//styles
import * as S from './styles';
import * as A from 'styles/shared-components';

//components
import { PoseGroup } from 'react-pose';

function Messages({ fabPose, onToggleNight, night }) {
  
  return (
    <S.Messages>
      <S.Bar>
        <S.Icon icon={faBars}/>
        <S.Title>
          <S.Paragraph>
            <S.Icon icon={faSearch}/>
            Поиск
          </S.Paragraph>
        </S.Title>
        <A.Horizontal spaceAll={10}>
        </A.Horizontal>
      </S.Bar>
      <S.List>
          <PoseGroup animateOnMount={true}>
            {users.map(({ name, img, username, url, message, time }, index) => {
              const clickable = [
                'beneficioinc',
                'beneficio salary',
                'beneficio chat',
                'instagram',
                'почта',
                'помощь',
                'facebook'].includes(username);
              return (
                <S.Message.Wrap
                  {...(clickable && {
                    clickable: true,
                    href: url,
                    target: '_blank',
                    rel: 'noopener'
                  })}
                  clickable={clickable}
                  index={index}
                  key={name}
                >
                  <S.Message.Avatar src={img} />
                  <S.Message.Mid>
                    <A.Horizontal flex={1} centerV spaceAll={5}>
                      <S.Message.Name>{name}</S.Message.Name>
                    </A.Horizontal>
                    <S.Message.Message>{message}</S.Message.Message>
                  </S.Message.Mid>
                  <S.Message.Time>{time}</S.Message.Time>
                </S.Message.Wrap>
              );
            })}
          </PoseGroup>
      </S.List>
      <S.MessageFab />
    </S.Messages>
  );
}

export default Messages;
