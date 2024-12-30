import React, { useEffect, useState } from 'react';
import { Check2, X } from 'react-bootstrap-icons';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';

import { Button } from '@/shared/components/alt-button';

import { Action } from '../../constants/action';
import { ActionStatus } from '../../constants/action-status';
import { ActionAPIResult } from '../../types/action-api-result';
import { ResponseToolboxTranslation } from '../../types/translation';

interface ActionProcessingProps {
  status: ActionStatus;
  result?: ActionAPIResult;
  activeAction?: Action;
  translation: ResponseToolboxTranslation;
  onAbortClick: () => void;
}

function ActionProcessing(props?: ActionProcessingProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState<React.ReactNode>();

  useEffect(() => {
    if (props?.status == ActionStatus.NONE) return;
    if (props?.status == ActionStatus.WORKING) {
      if (props.activeAction) {
        setTitle(props.translation.actions[props.activeAction].onWorking);
      }

      setDescription(props.translation.onWorkingMsg);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      setIcon(<UseAnimations animation={loading} size={24} fillColor="#64748B" />);
    } else if (props?.status == ActionStatus.SUCCESS) {
      if (props.activeAction) {
        setTitle(props.translation.actions[props.activeAction].onSuccess);
      }

      setDescription('');
      setIcon(<Check2 className="size-6 text-primary-500" />);
    } else if (props?.status == ActionStatus.FAILED) {
      if (props.activeAction) {
        setTitle(props.translation.actions[props.activeAction].onFailed);
      }

      setDescription(props.result?.errorMsg ?? '');
      setIcon(<X className="size-6 text-red-500" />);
    }
  }, [props?.status]);

  return (
    <div className="flex flex-row place-items-center space-x-3">
      {icon}
      <div className="flex flex-col">
        <span>{title}</span>
        <span className="detail">{description}</span>
      </div>
      {props?.status == ActionStatus.WORKING && (
        <Button onClick={props.onAbortClick} variant="secondary" size="xs">
          cancel
        </Button>
      )}
    </div>
  );
}

export default ActionProcessing;
