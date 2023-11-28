import { Button, styled } from 'tamagui'

export const Icon = styled(Button, {
  height: 44,
  borderRadius: 4,
  borderBottomWidth: 2,
  disabled: true,
  bg: '$gray100',

  pressStyle: {
    opacity: 1,
  },

  variants: {
    state: {
      default: {
        color: '$gray900',
      },
      success: {
        bg: '$green100',
        color: '$green900',
      },
      error: {
        bg: '$red100',
        color: '$red400',
      },
      disabled: {
        bg: '$gray200',
      },
    },

    focus: {
      inactive: {
        borderBottomColor: '$gray100',
      },
      default: {
        borderBottomColor: '$blue600',
      },
      success: {
        borderBottomColor: '$green500',
      },
      error: {
        borderBottomColor: '$red500',
      },
    },
  } as const,

  defaultVariants: {
    state: 'default',
    focus: 'inactive',
  },
})
