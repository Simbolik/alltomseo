interface HomePageProps {
  children: React.ReactNode;
}

export default function HomePage({ children }: HomePageProps) {
  return (
    <>
      {children}
    </>
  );
}
