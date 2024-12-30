import { XCircle } from 'react-bootstrap-icons';

import { ToastClose } from '../primitive-toast';

interface FailToastDescriptionProps {
  content: string;
}

const FailToastDescription = (props: FailToastDescriptionProps) => {
  return (
    <>
      <div className="z-50 flex justify-between">
        <div className="flex items-center space-x-2">
          <XCircle className="size-7 font-medium text-red-600" />
          <div className="text-sm font-medium">{props.content}</div>
        </div>
        <ToastClose />
      </div>
    </>
  );
};

export default FailToastDescription;
