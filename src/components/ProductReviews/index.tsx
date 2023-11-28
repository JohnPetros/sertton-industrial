import { Paragraph, YStack } from 'tamagui'

import { Review as ReviewData } from '@/@types/review'
import { Button } from '@/components/Button'
import { Review } from '@/components/ProductReviews/Review'
import { ReviewDialog } from '@/components/ProductReviews/ReviewDialog'

interface ProductReviewsProps {
  productId: number
  productName: string
  data: ReviewData[] | null
}

export function ProductReviews({
  data: reviews,
  productId,
  productName,
}: ProductReviewsProps) {
  return (
    <YStack mt={24}>
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
        <>
          <ReviewDialog productId={productId} productName={productName}>
            <Button>Avaliar produtor</Button>
          </ReviewDialog>
          <Paragraph textAlign="center" color="$blue10">
            Esse produto ainda não possui nenhuma avaliação. Seja o primeiro a
            avaliar.
          </Paragraph>
        </>
      )}
    </YStack>
  )
}
