import { Ui } from "./components/ui";

export default function App() {
  return (
    <Ui>
      <Ui.Header />
      <Ui.Main>
        <Ui.Hero />
        <Ui.Lab />
        <Ui.Contributors />
      </Ui.Main>
      <Ui.Footer />
    </Ui>
  );
}
