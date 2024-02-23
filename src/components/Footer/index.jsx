import Container from "../../components/Container";

export default function Footer() {
  return (
    <footer className="bg-zinc-200 dark:bg-zinc-900/30 py-3 mt-14">
      <Container>
        <div className="flex justify-center">
          <span className="font-bold text-zinc-500 dark:text-zinc-800 max-[380px]:text-xs">
            Developed by Miquelven
          </span>
        </div>
      </Container>
    </footer>
  );
}
