import { Badge } from '@/components/ui/badge';

import { Card } from '../ui/card';

interface IPersonalInfoProps {
  address: string;
  email: string;
  name: string;
  phone_number: string;
  recommended_service: string;
}

const PersonalInfo = ({
  address,
  email,
  name,
  phone_number,
  recommended_service,
}: IPersonalInfoProps) => {
  return (
    <Card className="flex flex-col gap-6 bg-gradient-to-r from-primary/95 to-primary/90 px-6 py-8 md:flex-row">
      {/* Left: Profile Image */}
      <div className="flex size-20 items-center justify-center rounded-full bg-gray-300 text-3xl font-semibold text-gray-800 md:size-32">
        {`${name[0]}${name.split(' ')[1][0]}`}
      </div>

      {/* Center: Personal Info */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-primary-foreground">{name}</h1>
        <p className="text-primary-foreground/90">{email}</p>
        <p className="text-primary-foreground/90">{phone_number}</p>
        <p className="text-primary-foreground/90">{address}</p>
      </div>

      {/* Right: Recommended Service */}
      <div className="flex flex-col items-start gap-2 md:ml-auto">
        <h2 className="font-semibold text-secondary">Recommended Service</h2>
        <Badge className="rounded-sm text-sm text-secondary-foreground/90" variant="secondary">
          {recommended_service}
        </Badge>
      </div>
    </Card>
  );
};

export default PersonalInfo;
