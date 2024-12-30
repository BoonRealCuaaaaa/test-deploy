import PancakeIcon from '@/src/assets/svgs/pancake.svg';
import TikTokShopIcon from '@/src/assets/svgs/tiktok.svg';
import ZendeskIcon from '@/src/assets/svgs/zendesk.svg';
import ZohoDeskIcon from '@/src/assets/svgs/zohodesk.svg';
import { Integration } from '@/src/libs/constants/integration';

import { IntegrationProp } from '../types/integration-prop';

export const INTEGRATION_PROPS: { [key in Integration]: IntegrationProp } = {
  [Integration.ZENDESK]: {
    icon: ZendeskIcon,
    platformName: 'Zendesk',
  },
  [Integration.ZOHODESK]: {
    icon: ZohoDeskIcon,
    platformName: 'Zohodesk',
  },
  [Integration.PANCAKE]: {
    icon: PancakeIcon,
    platformName: 'Pancake V2',
  },
  [Integration.TIKTOKSHOP]: {
    icon: TikTokShopIcon,
    platformName: 'Tiktok Shop',
  },
};
