import React from 'react'
import { DynamicMarkdownHandler } from '../../components/DynamicMarkdownHandler'

export const WhoAmI: React.FC = () => {
  return (
    <DynamicMarkdownHandler 
      url="https://raw.githubusercontent.com/muhammadtalha-quant/muhammadtalha-quant/master/whoami.md" 
      speed={40} 
    />
  )
}
