export const ROUTES = {
  BOARDS: "/boards",
  BOARD: {
    PATH: '/board/:id',
    link: (id: string | number) => `/board/${id}`,
  },
  ISSUES: "/issues",
} as const;
