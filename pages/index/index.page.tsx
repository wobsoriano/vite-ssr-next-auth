import { useSession } from 'next-auth/react';

export { Page };

function Page() {
  const { data, status } = useSession();

  if (status === 'loading') {
    return <p>loading...</p>
  }

  if (!data) {
    return <>
      <h1>Who are you?</h1>
      <a href="/api/auth/signin"><button>sign in</button></a>
    </>
  }

  return (
    <>
      <h1>{`Hola ${data.user?.name}`}</h1>
      <a href="/api/auth/signout"><button>sign out</button></a>
    </>
  );
}
