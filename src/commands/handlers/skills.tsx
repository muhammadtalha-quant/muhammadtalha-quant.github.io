import React from 'react'
import { DynamicMarkdownHandler } from '../../components/DynamicMarkdownHandler'

export const Skills: React.FC = () => {
  return (
    <DynamicMarkdownHandler
      url="https://raw.githubusercontent.com/muhammadtalha-quant/muhammadtalha-quant/master/skills.md"
      speed={60}
    />
  )
}
