/* THIS FILE IS AUTOGENERATED BY RUN `yarn cic`, YOU DON'T NEED EDIT IT */
import React from 'react'
import Clockwise from 'icons/clockwise.svg'
import Close from 'icons/close.svg'
import CloudUpload from 'icons/cloud-upload.svg'
import Configuration from 'icons/configuration.svg'
import Counterclockwise from 'icons/counterclockwise.svg'
import Duplicate from 'icons/duplicate.svg'
import MoodSad from 'icons/mood-sad.svg'

export type IconName =
  | 'clockwise'
  | 'close'
  | 'cloud-upload'
  | 'configuration'
  | 'counterclockwise'
  | 'duplicate'
  | 'mood-sad'

const iconsDict: { [key in IconName]: React.FC } = {
  clockwise: Clockwise,
  close: Close,
  'cloud-upload': CloudUpload,
  configuration: Configuration,
  counterclockwise: Counterclockwise,
  duplicate: Duplicate,
  'mood-sad': MoodSad
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName
}

export default function Icon({ name, ...props }: IconProps) {
  return React.createElement(iconsDict[name], props)
}
