import { useNavigate } from 'react-router';

import { ChevronLeft } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';

const BackBreadcrumb = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="-ml-1 flex cursor-pointer items-center gap-2 text-base"
            onClick={handleBackClick}
          >
            {/* <ArrowLeft size={18} /> */}
            <ChevronLeft size={20} />
            Back
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BackBreadcrumb;
