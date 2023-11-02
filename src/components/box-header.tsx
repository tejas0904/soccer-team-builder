import { Box, Link, Typography, useTheme } from "@mui/material";
import React, { MouseEventHandler } from "react";
import FlexBetween from "./flex-between";

type Props = {
  title: string;
  sideText?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onSideTextClick?: MouseEventHandler<HTMLSpanElement>;
};

const BoxHeader = ({ icon, title, subtitle, sideText, onSideTextClick }: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h3" mb="-0.1rem">
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
      </FlexBetween>
      <Link style={{ cursor: 'pointer' }} component="button" onClick={onSideTextClick}>
        <Typography variant="h4" fontWeight="700" color={palette.secondary[500]}>
          {sideText}
        </Typography>
      </Link>
    </FlexBetween>
  );
};

export default BoxHeader;
