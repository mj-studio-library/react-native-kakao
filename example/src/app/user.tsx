import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { formatJson } from '@mj-studio/js-util';
import { useMount } from '@mj-studio/react-util';
import {
  isKakaoTalkLoginAvailable,
  isLogined,
  login,
  logout,
  unlink,
} from '@react-native-kakao/user';

import { Btn } from '../component/Btn';
import { StyledScrollView } from '../component/StyledScrollView';
import { Txt } from '../component/Txt';
import { px } from '../util/px';

export default function Page() {
  const [isKakaoTalkEnable, setKakaoTalkEnable] = useState(false);
  const [result, setResult] = useState<object>();

  useMount(() => {
    isKakaoTalkLoginAvailable().then(setKakaoTalkEnable);
  });

  return (
    <StyledScrollView
      flex={1}
      contentContainerSx={{ pt: 12, pb: 48, alignItems: 'center', px: 4, gap: 4 }}
    >
      <Txt>{`Kakao Talk Available: ${isKakaoTalkEnable}`}</Txt>
      <Btn
        minW={px(240)}
        title={'Login'}
        onPress={() => {
          login()
            .then((ret) => {
              showMessage({
                type: 'success',
                message: 'Login Success',
              });
              setResult(ret);
            })
            .catch((e) =>
              showMessage({
                type: 'warning',
                message: `Login Failed - ${e.message}`,
              }),
            );
        }}
      />
      <Btn
        minW={px(240)}
        title={'Log Out'}
        onPress={() => {
          logout()
            .then(() => {
              showMessage({
                type: 'success',
                message: 'Logout Success',
              });
            })
            .catch((e) =>
              showMessage({
                type: 'warning',
                message: `Logout Failed - ${e.message}`,
              }),
            );
        }}
      />
      <Btn
        minW={px(240)}
        title={'Unlink'}
        onPress={() => {
          unlink()
            .then(() => {
              showMessage({
                type: 'success',
                message: 'Unlink Success',
              });
            })
            .catch((e) =>
              showMessage({
                type: 'warning',
                message: `Unlink Failed - ${e.message}`,
              }),
            );
        }}
      />
      <Btn
        minW={px(240)}
        title={'Check Logined'}
        onPress={() => {
          isLogined()
            .then((ret) => {
              showMessage({
                type: 'success',
                message: `Logined: ${ret}`,
              });
            })
            .catch((e) =>
              showMessage({
                type: 'warning',
                message: `isLogined Failed - ${e.message}`,
              }),
            );
        }}
      />
      <Txt w={'100%'} t={'c2'} p={4} borderWidth={1} borderColor={'text'} color={'primary100'}>
        {!result ? 'No data' : formatJson(result)}
      </Txt>
    </StyledScrollView>
  );
}