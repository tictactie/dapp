import { Box, useStyleConfig } from "@chakra-ui/react";

export function Title(props: any) {
  const { variant, ...rest } = props;

  const styles = useStyleConfig("TitleComponent", { variant });

  // Pass the computed styles into the `__css` prop
  return <Box __css={styles} {...rest} />;
}
