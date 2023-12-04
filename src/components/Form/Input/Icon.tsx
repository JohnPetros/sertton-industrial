import { Button, styled } from 'tamagui'

export const Icon = styled(Button, {
  height: 44,
  borderRadius: 4,
  borderBottomWidth: 2,
  disabled: true,
  bg: '$gray100',

  variants: {
    state: {
      default: {
        color: '$gray900',
      },
      focus: {
        focusStyle: {
          color: '$gray400',
          borderBottomColor: '$blue400',
        },
      },
      success: {
        bg: '$green50',
        color: '$green900',
        borderBottomColor: '$green500',
      },
      error: {
        bg: '$red100',
        color: '$red400',
        borderBottomColor: '$red500',
      },
    },
  } as const,

  defaultVariants: {
    state: 'default',
  },
})
