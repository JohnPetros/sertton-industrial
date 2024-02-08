import { useState } from 'react'
import { Eye, EyeSlash, Lock } from 'phosphor-react-native'
import { View } from 'tamagui'

import { Button } from '@/components/shared/Button'
import { Input, InputProps } from '@/components/Form/Input'

interface PasswordInputProps extends InputProps {}

export function PasswordInput({ ...rest }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function handleEye() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <View>
      <Input
        placeholder="******"
        secureTextEntry={!isPasswordVisible}
        icon={Lock}
        autoCapitalize="none"
        {...rest}
      />
      <Button
        position="absolute"
        top={28}
        right={0}
        background="transparent"
        onPress={handleEye}
        icon={isPasswordVisible ? <EyeSlash size={24} /> : <Eye size={24} />}
      />
    </View>
  )
}
