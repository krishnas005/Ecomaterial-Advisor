'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ClientReportComponent from '@/components/Report';

const ReportPage = () => {
  const searchParams = useSearchParams();
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    const materialParam = searchParams.get('material');
    if (materialParam) {
      try {
        // Parse the material object from the query string
        const parsedMaterial = JSON.parse(decodeURIComponent(materialParam));
        setMaterial(parsedMaterial);
      } catch (error) {
        console.error("Failed to parse material:", error);
      }
    }
  }, [searchParams]);

  return (
    <div>
      {/* Pass the material to the ClientReportComponent */}
      {material ? (
        <ClientReportComponent material={material} />
      ) : (
        <p>Loading material details...</p>
      )}
    </div>
  );
};

export default ReportPage;