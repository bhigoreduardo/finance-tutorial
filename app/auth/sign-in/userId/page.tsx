export default function UserIdPage({ params }: { params: { userId: string } }) {
  return <section>UserId: {params.userId}</section>;
}
