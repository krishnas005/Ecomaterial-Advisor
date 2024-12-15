'use client';
import React, { Suspense, lazy } from 'react';
import { useSearchParams } from 'next/navigation';

// Lazy load the ClientReportComponent
const ClientReportComponent = lazy(() => import('@/components/Report'));

// Separate component to handle material parsing
const ReportContent = () => {
  const searchParams = useSearchParams();
  const [material, setMaterial] = React.useState(null);

  React.useEffect(() => {
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
      {material ? (
        <Suspense fallback={<p>Loading report...</p>}>
          <ClientReportComponent material={material} />
        </Suspense>
      ) : (
        <p>Loading material details...</p>
      )}
    </div>
  );
};

// Main page component wrapped in Suspense
const ReportPage = () => {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <ReportContent />
    </Suspense>
  );
};

export default ReportPage;