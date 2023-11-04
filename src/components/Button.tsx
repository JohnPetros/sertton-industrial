import { Button as TamaguiButton, styled } from 'tamagui'

export const Button = styled(TamaguiButton, {
  height: 44,
  color: '$white',
  fontSize: 14,
  borderRadius: 4,

  focusStyle: {
    opacity: 0.7,
  },

  variants: {
    background: {
      primary: {
        bg: '$blue400',
      },
      secondary: {
        bg: '$gray400',
      },
      outline: {
        bg: '$gray500',
      },
    },
  } as const,

  defaultVariants: {
    background: 'primary',
  },
})
