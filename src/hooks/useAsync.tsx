import { useEffect } from "react";

export function useAsync(asyncFn: any, onSuccess: any) {
  useEffect(() => {
    let isActive = true;
    asyncFn().then((data: any) => {
      if (isActive) onSuccess(data);
      else console.log("aborted setState on unmounted component");
    });
    return () => {
      isActive = false;
    };
  }, [asyncFn, onSuccess]);
}
