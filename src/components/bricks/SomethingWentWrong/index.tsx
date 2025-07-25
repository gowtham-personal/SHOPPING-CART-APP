import { Text, Icon } from '@/components/bricks';
import { AlertCircle } from 'lucide-react';

const SomethingWentWrong = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center gap-3">
      <Icon icon={AlertCircle} size="lg" />
      <Text text="Something went wrong" weight="semibold" />
      <Text
        text="We're sorry, an error occurred while rendering this page."
        weight="medium"
      />
    </div>
  );
};

export default SomethingWentWrong;
