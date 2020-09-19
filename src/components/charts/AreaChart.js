import React, { useRef } from "react"
import { css } from "@emotion/core"
import { usePrevious } from "react-use"
import useResizeAware from "react-resize-aware"
import { area, curveMonotoneX } from "d3-shape"
import { scaleTime, scaleLinear } from "d3-scale"
import { max, extent } from "d3-array"
import isEqual from "lodash/isEqual"
import { axisRight } from "d3-axis"
import { format } from "d3-format"
import { select } from "d3-selection"

import { breakpoints, colors, fontSize, fontWeight } from "../../styles/theme"

const marginTop = 5

export const makeGridStyle = (g) => {
  g.select(".domain").remove()
  g.selectAll(".tick text").remove()
  g.selectAll(".tick line")
    .attr("stroke", colors.dark.primary)
    .attr("stroke-opacity", 0.25)
    .attr("stroke-width", 0.5)
}

function AreaChart({ data }) {
  const [resizeListener, sizes] = useResizeAware()
  const prevSizes = usePrevious(sizes)
  const gridRef = useRef()
  const axisRef = useRef()

  const isInit = React.useRef(true)
  const [path, setPath] = React.useState("")
  React.useEffect(() => {
    const updatePath = () => {
      const xScale = scaleTime()
        .domain(extent(data, (d) => d.date))
        .range([0, sizes.width])
      const yScale = scaleLinear()
        .domain([0, max(data, (d) => d.value)])
        .range([sizes.height, marginTop])
      const areaGenerator = area()
        .x((d) => xScale(d.date))
        .y1((d) => yScale(d.value))
        .y0(yScale(0))
        .curve(curveMonotoneX)
      select(axisRef.current)
        .call(
          axisRight(yScale)
            .ticks(4)
            .tickSizeOuter(0)
            .tickSizeInner(0)
            .tickFormat(format(".0f"))
        )
        .call((g) => {
          g.select(".domain").remove()
          g.selectAll(".tick line").remove()
          g.selectAll("text")
        })
      select(gridRef.current)
        .call(
          axisRight(yScale).ticks(4).tickSizeOuter(0).tickSizeInner(sizes.width)
        )
        .call(makeGridStyle)

      return areaGenerator(data)
    }
    if (data.length && isInit.current && sizes.width) {
      setPath(updatePath())
      isInit.current = false
    }
    if (!isInit.current && !isEqual(sizes, prevSizes)) {
      setPath(updatePath())
    }
  }, [data, sizes.width, sizes.height, sizes, prevSizes])

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
      `}
    >
      {resizeListener}
      <svg
        css={css`
          position: absolute;
          width: 100%;
          height: 100%;

          text {
            font-family: "Raleway", sans-serif;
            font-size: "Raleway", sans-serif;

            font-weight: ${fontWeight.md};
            font-size: ${fontSize.xs.primary};
            color: ${colors.dark.primary};

            @media (max-width: ${breakpoints.sm}) {
              font-size: ${fontSize.xs.secondary};
            }
          }
        `}
      >
        <path d={path} fill={colors.dark.primary} fillOpacity={0.9} />
        <g
          ref={axisRef}
          css={css`
            transform: translateY(-8px);
          `}
        />
        <g ref={gridRef} />
      </svg>
    </div>
  )
}

export default AreaChart
