import { buttonVariants } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

import { cn } from '@/lib/utils'


const PaginateQuote = ({ selectedPage, totalPages }: {
  selectedPage: number
  totalPages: number
}) => {

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <Pagination className='flex-none'>
      <PaginationContent className='gap-0 divide-x overflow-hidden rounded-lg border'>
        { selectedPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${selectedPage - 1}`} className='rounded-none' />
          </PaginationItem>
        )}
        {pages.map(page => {
          const isActive = page === selectedPage

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={`?page=${page}`}
                className={cn(
                  {
                    [buttonVariants({
                      variant: 'default',
                      className:
                        'hover:!text-primary-foreground dark:bg-primary dark:text-primary-foreground dark:hover:text-primary-foreground dark:hover:bg-primary/90 dark:border-transparent'
                    })]: isActive
                  },
                  'rounded-none border-none'
                )}
                isActive={isActive}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        {
          selectedPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={`?page=${selectedPage + 1}`} className='rounded-none' />
            </PaginationItem>
          )
        }
      </PaginationContent>
    </Pagination>
  )
}

export default PaginateQuote
