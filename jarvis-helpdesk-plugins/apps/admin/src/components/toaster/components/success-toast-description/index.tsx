import { CheckCircle } from 'react-bootstrap-icons';

import { ToastClose } from '../primitive-toast';

interface SuccessToastDescriptionProps {
  content: string;
}

const SuccessToastDescription = (props: SuccessToastDescriptionProps) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <CheckCircle className="size-7 font-medium text-green-600" />
          <div className="text-sm font-medium">{props.content}</div>
        </div>
        <ToastClose />
      </div>
    </>
  );
};

export default SuccessToastDescription;
