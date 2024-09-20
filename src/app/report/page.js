'use client';

import ClientReportComponent from '@/components/Report';
import { usePart } from "../../context/PathContext";

const ReportPage = () => {

  const { selectedPart } = usePart();

  return (
    <div>
      <ClientReportComponent material={selectedPart} />
    </div>
  );
};

export default ReportPage;
