import { Box, useStyleConfig } from "@chakra-ui/react";

export function Punchline(props: any) {
  const { variant, ...rest } = props;

  const styles = useStyleConfig("PunchlineComponent", { variant });

  // Pass the computed styles into the `__css` prop
  return <Box __css={styles} {...rest} />;
}
