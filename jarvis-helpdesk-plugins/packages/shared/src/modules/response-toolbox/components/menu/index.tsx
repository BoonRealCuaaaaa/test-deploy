import { Separator } from '@/shared/components/separator';

import { Action } from '../../constants/action';
import { ResponseToolboxTranslation } from '../../types/translation';

import { DraftResponse } from './draft-response';
import FormalizationGroup from './formalization-group';

interface Props {
  onClick: (actionProps: Action) => void;
  translation: ResponseToolboxTranslation;
  isReDraft: boolean;
}

const Menu = (props: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <FormalizationGroup {...props} />
      <Separator className="mb-[5px] bg-slate-200" />
      <DraftResponse {...props} />
    </div>
  );
};

export default Menu;
