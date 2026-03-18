import React from 'react'
import { DynamicMarkdownHandler } from '../../components/DynamicMarkdownHandler'

export const Bio: React.FC = () => {
  return (
    <DynamicMarkdownHandler
      url="https://raw.githubusercontent.com/muhammadtalha-quant/muhammadtalha-quant/master/bio.md"
      speed={40}
    />
  )
}
