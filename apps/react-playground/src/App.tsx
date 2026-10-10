import { Ui } from "./components/ui";

export default function App() {
  return (
    <Ui>
      <Ui.Header />
      <Ui.Main>
        <Ui.Hero />
        <Ui.AiPrompt />
        <Ui.MediaShowcase />
        <Ui.Examples>
          <Ui.Camera />
          <Ui.Haptic />
          <Ui.Microphone />
          <Ui.Device />
          <Ui.Location />
          <Ui.WakeLock />
          <Ui.Fullscreen />
          <Ui.Orientation />
          <Ui.Share />
          <Ui.Clipboard />
          <Ui.Push />
          <Ui.Screenshot />
          <Ui.Install />
          <Ui.Pwa />
          <Ui.Badge />
          <Ui.Storage />
        </Ui.Examples>
        <Ui.HowItWorks />
        <Ui.Contributors />
      </Ui.Main>
      <Ui.Footer />
    </Ui>
  );
}
