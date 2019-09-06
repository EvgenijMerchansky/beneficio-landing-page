import React, { useRef, useState } from 'react';

import playMarket from '../../images/google-play-logo.png';
import appStore from '../../images/app-store-logo.webp';

//styles
import * as S from './styles';
import * as A from 'styles/shared-components';

//components
import Messages from 'components/Messages';
import DayNightSwitch from 'components/DayNightSwitch';
import MenuBar from 'components/MenuBar';
import Compose from 'components/Compose';
import SalaryButton from 'components/SalaryButton';
import Background from 'components/Background';

//hooks
import {
  useGoogleAnalytics,
  useHovered,
  useToggleBodyClass,
  useFindElementCenter,
  useMousePosition,
  useCanHover,
  useClock
} from 'utils/hooks';

import useIntroAnimation from './use-intro-animation';

import 'focus-visible';
import { routes } from '../../config/routes';
import { useRouter } from 'react-tiniest-router';
import { isDev } from '../../utils/dev-prod';

//env
const {
  REACT_APP_ANALYTICS_ID,
  REACT_APP_PADDLE_VENDOR,
  REACT_APP_PADDLE_PRODUCT_ID,
  REACT_APP_DOWNLOAD_LINK
} = process.env;
const canBuyInDev = true;

const redirectDownload = () => {
  if (window.location.href.includes('get-app')) {
    window.location.replace(REACT_APP_DOWNLOAD_LINK);
  }
};

function Home({ isAnimationDone, night }) {
  redirectDownload();

  const [composeIsOpen] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);

  const [text, setText] = useState(`Woah! With twizzy.app I can use Twitter DMs and tweet directly from the menubar. Sweet!`);

  // refs
  const contentRef = useRef();
  const messagesWindowRef = useRef();

  //custom hooks
  const { fabPose, menuBarPose, messagesPose, homePose } = useIntroAnimation(true, isAnimationDone);
  const canHover = useCanHover();
  const isHoveringMessages = useHovered();
  const isHoveringCompose = useHovered();
  const windowCenter = useFindElementCenter(messagesWindowRef);
  const { y: mouseY } = useMousePosition(isHoveringCompose.value);
  const clock = useClock();
  const { goTo } = useRouter();

  // side effects
  useGoogleAnalytics(REACT_APP_ANALYTICS_ID, isAnimationDone.value);
  useToggleBodyClass(isAnimationDone.value, ['scroll', 'no-scroll']);

  // computed
  const isNotHoveringMenuBar = mouseY === null || mouseY >= 25;
  const showComposeWindow = composeIsOpen || (isHoveringCompose.value && isNotHoveringMenuBar);
  const isBig = window.innerWidth > 450;

  // methods
  const onToggleNight = () => {
    night.toggle();
    setToggleCount(toggleCount + 1);
  };
  
  const copyURLtoClipboard = () =>
  {
    let text = document.createElement('input');
    
    text.value = window.location.href;
    document.body.appendChild(text);
    text.select();
    document.execCommand('copy');
    document.body.removeChild(text);
    
    window.alert("ссылка скопирована!\nНе забудь поделиться с другом :)")
  };
  
  return (
    <S.Home>
      <S.MainSection>
        <Background night={night.value} startLoadingLight={isAnimationDone.value} show={isBig} />

        <MenuBar
          className="menubar"
          pose={menuBarPose}
          selected={showComposeWindow}
          mainIcon={"none"}
          icons={[clock]}
        />

        <Compose
          {...isHoveringCompose.bind}
          text={text}
          setText={setText}
          composeIsOpen={composeIsOpen}
          visible={showComposeWindow}
        />

        <S.Content ref={contentRef}>
          <S.WindowBox ref={messagesWindowRef} initialPose="hidden" pose={homePose} {...windowCenter}>
            <S.Window night={night.value} hovering={isHoveringMessages.value}>
              <Messages
                messagesPose={messagesPose}
                fabPose={fabPose}
                night={night.value}
                onToggleNight={onToggleNight}
              />
            </S.Window>
          </S.WindowBox>

          <A.Space huge />

          <S.TextContent isAnimationDone={isAnimationDone.value} pose={homePose}>
            <S.Title> Добро пожаловать в Beneficio! </S.Title>

            <A.Space huge />
            <S.Subtitle>
              <span>
                Присоеденяйся ко всем нашим <A.Hover {...isHoveringMessages.bind}>ресурсам</A.Hover> и{' '}
                <A.Hover
                  className="tweeting"
                  onClick={() => copyURLtoClipboard()}
                >
                  делись
                </A.Hover>
              </span>
              <br />
              <span>ими с друзьями!</span>
            </S.Subtitle>

            <A.Space />
  
            <S.Subtitle>
              А так же приумножай свой капитал, опробовав:
            </S.Subtitle>
            
            <SalaryButton startLoading={isAnimationDone.value} />

            <A.Space />
            
            <S.Platforms>Станьте частью будущей платформы и развивайте её вместе с нами!</S.Platforms>
  
            <A.Space />
            <A.Space />

            <DayNightSwitch value={night.value} onChange={onToggleNight} />
  
            <A.Space />
  
            <S.Subtitle>
              Скачать приложение:
            </S.Subtitle>
            <S.ShopLinks>
              <S.Link href="#">
                <S.ImageLink src={appStore} alt="app_store"/>
              </S.Link>
              <S.Link href="#">
                <S.ImageLink src={playMarket} alt="play_market"/>
              </S.Link>
            </S.ShopLinks>
  
            <A.Space />
            
            <S.Platforms>Приложение доступно для всех актуальных, мобильных платформ.</S.Platforms>
          </S.TextContent>
        </S.Content>
      </S.MainSection>
      <S.Footer initialPose="hidden" pose={composeIsOpen ? 'invisible' : menuBarPose}>
        <S.Links>
          <S.DisabledLink>© Beneficio 2019. All Rights Reserved</S.DisabledLink>
        </S.Links>
      </S.Footer>
    </S.Home>
  );
}

export default Home;
