import { useEffect, useState } from 'react';

import { useZafClient } from '../contexts/zaf-client/context';
import { AppLocation } from '../lib/constants/zaf';

export const useAppLocation = () => {
  const [location, setLocation] = useState<AppLocation | null>(null);
  const { client } = useZafClient();

  useEffect(() => {
    client.context().then((data) => {
      setLocation(data.location);
    });
  }, [setLocation, client]);

  return location;
};
