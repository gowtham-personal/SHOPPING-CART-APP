import { Card } from '@/components/bricks';

const ProductSkeleton = () => {
  return (
    <Card className="h-full flex flex-col animate-pulse">
      <Card.Header className="pb-4">
        <div className="aspect-square overflow-hidden rounded-md bg-gray-200"></div>
      </Card.Header>
      
      <Card.Content className="flex-1 flex flex-col">
        {/* Title skeleton */}
        <div className="space-y-2 mb-2">
          <div className="h-5 bg-gray-200 rounded w-full"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        {/* Rating skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-4 flex-1">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        
        {/* Price and button skeleton */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
          
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProductSkeleton; 