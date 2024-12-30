import React from 'react';
import { Arrow90degLeft, Arrow90degRight } from 'react-bootstrap-icons';

import { Button } from '@/shared/components/alt-button';

import { ResponseToolboxTranslation } from '../../types/translation';

export interface HeaderProps {
  showCommand: boolean;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  translation: ResponseToolboxTranslation;
}

function Header(props: HeaderProps) {
  return (
    <div className="flex flex-row place-items-center">
      <div className="flex-1">
        <div className="menu-title">{props.translation.responseToolbox}</div>
      </div>
      {props.showCommand && (
        <div className="space-x-1.5">
          <Button variant={'icon-only'} size={'icon'} disabled={!props.canUndo} onClick={props.onUndo}>
            <Arrow90degLeft className="size-3.5" />
          </Button>
          <Button variant={'icon-only'} size={'icon'} disabled={!props.canRedo} onClick={props.onRedo}>
            <Arrow90degRight className="size-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default Header;
