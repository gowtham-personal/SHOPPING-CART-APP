import { AlertCircle } from "lucide-react";

import { Icon, Text } from "@/components/bricks";

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
