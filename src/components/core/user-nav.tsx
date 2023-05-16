import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const UserNav = () => {
  return (
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/avatars/01.png" alt="@shadcn" />
        <AvatarFallback>JM</AvatarFallback>
      </Avatar>
    </Button>
  );
};
