# Android screenshot → `@pwasdk/core`

**Important:** Opening the playground in Chrome / Samsung Internet / “Add to Home Screen” will **never** see Power + Volume Down. That signal exists only for a native `Activity` (Android 14+).

## Flow

1. Web page: `Screenshot.installBridge()` + `Screenshot.watch({ onDetected })`
2. Android Activity: `registerScreenCaptureCallback`
3. On capture: `webView.evaluateJavascript("window.PwaSdkScreenshot.notify()", null)`

## Manifest

```xml
<uses-permission android:name="android.permission.DETECT_SCREEN_CAPTURE" />
```

## Kotlin (Activity hosting a WebView)

```kotlin
private val screenCaptureCallback = Activity.ScreenCaptureCallback {
  webView.evaluateJavascript(
    "window.PwaSdkScreenshot && window.PwaSdkScreenshot.notify()",
    null,
  )
}

override fun onStart() {
  super.onStart()
  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
    registerScreenCaptureCallback(mainExecutor, screenCaptureCallback)
    webView.evaluateJavascript(
      "window.PwaSdkScreenshot && window.PwaSdkScreenshot.advertise()",
      null,
    )
  }
}

override fun onStop() {
  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
    unregisterScreenCaptureCallback(screenCaptureCallback)
  }
  super.onStop()
}
```

## Capacitor / Cordova

Same idea: a native plugin listens for the Activity callback and runs:

```js
window.PwaSdkScreenshot.notify();
```

## Verify in the playground

| Action | Expected |
|--------|----------|
| Power + Volume in Chrome | Nothing (by design) |
| **Simulate screenshot** | Bottom sheet opens |
| Native WebView + `notify()` | Bottom sheet opens, `isNativeDetectionSupported() === true` |
