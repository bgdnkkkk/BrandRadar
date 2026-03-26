export const userKeys = {
  all: () => ['users'],
  list: () => [...userKeys.all(), 'list'],
  filteredList: (filters: string[]) => [...userKeys.list(), ...filters],
  details: () => [...userKeys.all(), 'detail'],
  detail: (id: string) => [...userKeys.details(), id],
} as const
