import { Paragraph, Spinner, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import Review from '@/components/Review'
import { useProductReviews } from '@/hooks/useProductReviews'
import { useDate } from '@/services/date'

interface ProductReviewsProps {
  productId: number
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const { reviews } = useProductReviews(productId)

  return (
    <YStack mt={24}>
      <Button>Avaliar produto</Button>
      {reviews?.length ? (
        <YStack mt={32} gap={24}>
          {reviews.map((review, index) => {
            if (review.approved)
              return (
                <Review
                  key={`${review.name}-${index}`}
                  name={review.name}
                  rating={review.rating}
                  message={review.message}
                  date={review.updated_at.date}
                />
              )
          })}
        </YStack>
      ) : (
        <Paragraph mt={12} textAlign="center" color="$gray400">
          Esse produto ainda não possui nenhuma avaliação. Seja o primeiro a
          avaliar.
        </Paragraph>
      )}
    </YStack>
  )
}
