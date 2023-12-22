import { usePathname } from 'expo-router'
import { Spinner } from 'tamagui'

import { Button } from '@/components/Button'

interface SubmitButtonProps {
  isSubmitting: boolean
  handleSubmit: () => void
}

export function SubmitButton({
  isSubmitting,
  handleSubmit,
}: SubmitButtonProps) {
  const pathname = usePathname()

  return (
    <Button mt={24} onPress={handleSubmit} disabled={isSubmitting}>
      {isSubmitting ? (
        <Spinner color="$white" />
      ) : pathname === '/profile' ? (
        'Atualizar cadastro'
      ) : (
        'Cadastrar'
      )}
    </Button>
  )
}
