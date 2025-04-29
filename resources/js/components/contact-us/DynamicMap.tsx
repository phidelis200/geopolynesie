import { Globe } from 'lucide-react';
import { Suspense, lazy } from 'react';

const MapComponent = lazy(() => import('./MapComponent'));

const LoadingState = () => (
    <div className="bg-ocean-50 flex h-full w-full items-center justify-center">
        <div className="text-center">
            <Globe size={64} className="text-ocean-500 mx-auto mb-4" />
            <p className="text-gray-700">Chargement de la carte...</p>
        </div>
    </div>
);

const DynamicMap = () => {
    return (
        <Suspense fallback={<LoadingState />}>
            <MapComponent />
        </Suspense>
    );
};

export default DynamicMap;
