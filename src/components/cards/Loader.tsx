import React from "react"
import { css } from "@emotion/core"
import { motion, AnimatePresence } from "framer-motion"
import Loader from "react-loader-spinner"

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { colors } from "../../styles/theme"

interface Props {
  isLoading: boolean
}

const LoadingAnimation = ({ isLoading }: Props) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          css={css`
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: ${colors.light.primary};
            z-index: 100;
            border-radius: 8px;

            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <Loader
            type="Rings"
            color={colors.dark.primary}
            height={80}
            width={80}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingAnimation
